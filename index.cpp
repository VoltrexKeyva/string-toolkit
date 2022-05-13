#include <node.h>

#include <algorithm>

#include <cstdlib>
#include <cctype>
#include <cmath>
#include <ctime>

using namespace v8;

#define ModuleExports(isolate, ctx, exports, name, callback) _ModuleExports(isolate, ctx, exports, name, callback, sizeof(name) - 1)

#define Return(args, value)         args.GetReturnValue().Set(value)

#define TypeError(isolate, text)    isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, text, NewStringType::kNormal, sizeof(text) - 1).ToLocalChecked())); \
                                    return

static void Mock(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();
    
    if (!args[0]->IsString()) {
        TypeError(isolate, "First parameter must be a type of string");
    }
    
    String::Value value(isolate, args[0]);
    uint32_t length = value.length();
    uint16_t * str = *value;
    
    for (uint32_t i = 0; i < length; i++) {
        if ((i % 2) == 0) {
            str[i] = ::toupper(str[i]);
        } else {
            str[i] = ::tolower(str[i]);
        }
    }
    
    Return(args, String::NewFromTwoByte(isolate, str, NewStringType::kNormal, length).ToLocalChecked());
}

#define IS_WHITESPACE(s)            (s == 32 || s == 9 || s == 13 || s == 10 || s == 12)

#define TA_WHITESPACE               0
#define TA_WAITING_FOR_WHITESPACE   1

static void ToAbbreviation(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();
    
    if (!args[0]->IsString()) {
        TypeError(isolate, "First parameter must be a type of string");
    }
    
    uint8_t status = TA_WHITESPACE;
    
    String::Value value(isolate, args[0]);
    uint32_t length = value.length();
    uint16_t * str = *value;
    
    uint32_t result_index = 0;
    
    for (uint32_t i = 0; i < length; i++) {
        if (IS_WHITESPACE(str[i])) {
            if (status == TA_WAITING_FOR_WHITESPACE) {
                status = TA_WHITESPACE;
            }
        } else {
            if (status == TA_WHITESPACE) {
                str[result_index] = str[i];
                status = TA_WAITING_FOR_WHITESPACE;
                result_index++;
            }
        }
    }
        
    Return(args, String::NewFromTwoByte(isolate, str, NewStringType::kNormal, result_index).ToLocalChecked());
}

static void ToProperCase(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();
    
    if (!args[0]->IsString()) {
        TypeError(isolate, "First parameter must be a type of string");
    }
    
    const bool lowercase = !(args[1]->IsBoolean() && !args[1]->ToBoolean(isolate)->Value());
    
    uint8_t status = TA_WHITESPACE;
    String::Value value(isolate, args[0]);
    uint32_t length = value.length();
    uint16_t * str = *value;
    
    for (uint32_t i = 0; i < length; i++) {
        if (IS_WHITESPACE(str[i])) {
            if (status == TA_WAITING_FOR_WHITESPACE) {
                status = TA_WHITESPACE;
            }
        } else {
            if (status == TA_WHITESPACE) {
                str[i] = ::toupper(str[i]);
                status = TA_WAITING_FOR_WHITESPACE;
            } else if (lowercase) {
                str[i] = ::tolower(str[i]);
            }
        }
    }
    
    Return(args, String::NewFromTwoByte(isolate, str, NewStringType::kNormal, length).ToLocalChecked());
}

static void Shorten(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();

    if (!args[0]->IsString()) {
        TypeError(isolate, "First parameter must be a type of string");
    }
    
    if (!args[1]->IsUint32()) {
        TypeError(isolate, "Second parameter must be a type of number");
    }
    
    Local<Context> ctx = isolate->GetCurrentContext();
    const int32_t shorten_to = args[1]->ToNumber(ctx).ToLocalChecked()->Value();
    String::Value value(isolate, args[0]);
    
    if (shorten_to >= value.length()) {
        return Return(args, args[0]);
    }
    
    Return(args, String::Concat(isolate,
        String::NewFromTwoByte(isolate, *value, NewStringType::kNormal, shorten_to).ToLocalChecked(),
        args.Length() > 2 ? args[2]->ToString(ctx).ToLocalChecked() : String::NewFromUtf8(isolate, "...", NewStringType::kNormal, 3).ToLocalChecked()));
}

static void Emojify(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();
    
    if (!args[0]->IsString()) {
        TypeError(isolate, "First parameter must be a type of string");
    }
    
    String::Value value(isolate, args[0]);
    const int32_t length = value.length();
    uint16_t * ptr = *value;
    
    uint32_t result_length = 0;
    uint16_t * res = reinterpret_cast<uint16_t *>(::malloc((length * 3 * sizeof(uint16_t)) + 1));
    uint16_t temp;
  
    for (int32_t i = 0; i < length; i++) {
        temp = ptr[i];
      
        if (temp >= '0' && temp <= '9') {
            res[result_length]   = temp;
            res[++result_length] = 0x20e3;
        } else if (temp == '#' || temp == '*') {
            res[result_length]   = temp;
            res[++result_length] = 0xfe0f;
            res[++result_length] = 0x20e3;
        } else if (temp == '!') {
            res[result_length] = 0x2757;
        } else if (temp == '?') {
            res[result_length] = 0x2753;
        } else if ((temp >= 'a' && temp <= 'z') || (temp >= 'A' && temp <= 'Z')) {
            res[result_length]   = 0xd83c;
            res[++result_length] = temp - (temp <= 'Z' ? 'A' : 'a') + 0xdde6;
        } else {
            res[result_length] = temp;
        }
        
        result_length++;
    }

    Return(args, String::NewFromTwoByte(isolate, res, NewStringType::kNormal, result_length).ToLocalChecked());
    ::free(res);
}

static void Scramble(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();

    if (!args[0]->IsString()) {
        TypeError(isolate, "First parameter must be a type of string");
    }
    
    String::Value value(isolate, args[0]);
    int32_t length = value.length();
    uint16_t * ptr = *value;
    int32_t random;
    uint16_t temp;
    
    srand(time(nullptr));
    
    while (length != 0) {
        random = rand() % length;
        
        temp = ptr[random];
        length--;
        
        ptr[random] = ptr[length];
        ptr[length] = temp;
    }
    
    return Return(args, String::NewFromTwoByte(isolate, ptr, NewStringType::kNormal, value.length()).ToLocalChecked());
}

static void ToChunks(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();

    if (!args[0]->IsString()) {
        TypeError(isolate, "First parameter must be a type of string");
    }
    
    if (!args[1]->IsUint32()) {
        TypeError(isolate, "Second parameter must be a type of number");
    }
    
    Local<Context> ctx = isolate->GetCurrentContext();
    const uint32_t chunk_by = args[1]->ToNumber(ctx).ToLocalChecked()->Value();
    
    if (chunk_by == 0) {
        TypeError(isolate, "Invalid array length");
    }
    
    String::Value value(isolate, args[0]);
    uint32_t length = value.length();
    uint16_t * ptr = *value;
    
    if (chunk_by >= length) {
        Local<Array> array = Array::New(isolate, 1);
        array->Set(ctx, 0, args[0]);
        
        return Return(args, array);
    }
    
    const uint32_t min = length - (chunk_by * ~~(length / chunk_by));
    
    length = (length / chunk_by) + ((length % chunk_by) != 0);
    Local<Array> array = Array::New(isolate, length);
    
    length--;
    for (uint32_t i = 0; i <= length; i++) {
        if (i == length) {
            array->Set(ctx, i,
                   String::NewFromTwoByte(isolate, ptr + (i * chunk_by),
                   NewStringType::kNormal, min == 0 ? chunk_by : min).ToLocalChecked());
        } else {
            array->Set(ctx, i,
                   String::NewFromTwoByte(isolate, ptr + (i * chunk_by),
                   NewStringType::kNormal, chunk_by).ToLocalChecked());
        }
    }
    
    Return(args, array);
}

#define HCE_FIRST_TWO_CHARS  0
#define HCE_NAME             1
#define HCE_ID               2

static void HasCustomEmoji(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();
    
    if (!args[0]->IsString()) {
        TypeError(isolate, "First parameter must be a type of string");
    }
    
    String::Value value(isolate, args[0]);
    const uint32_t length = value.length();
    const uint16_t * ptr = *value;
    
    uint8_t status = HCE_FIRST_TWO_CHARS;
    uint8_t data = 0;
    uint16_t c;
    
    uint32_t i = 0;
    
    while (ptr[i] != '<' && i < length) i++;
    
    if (i == length) {
        goto HCE_Fail;
    }
    
    i++;
    for (; i < length; i++) {
        c = ptr[i];
        
        switch (status) {
            case HCE_FIRST_TWO_CHARS: {
                if (c == 'a') {
                    if (data) {
                        goto HCE_Fail;
                    }
                    
                    data = 1;
                    continue;
                } else if (c == ':') {
                    status = HCE_NAME;
                    continue;
                }
                
                goto HCE_Fail;
            }
            
            case HCE_NAME: {
                if (data > 32)
                    goto HCE_Fail;
                
                else if ((c >= 'a' && c <= 'z') ||
                    (c >= 'A' && c <= 'Z') ||
                    (c >= '0' && c <= '9') || c == '_') {
                    data++;
                    continue;
                } else if (data >= 2 && data <= 32 && c == ':') {
                    status = HCE_ID;
                    data = 0;
                    continue;
                }
                
                goto HCE_Fail;
            }
            
            case HCE_ID: {
                if (data > 19)
                    goto HCE_Fail;
                
                else if (c >= '0' && c <= '9') {
                    data++;
                    continue;
                } else if (data >= 17 && data <= 32 && c == '>') {
                    return Return(args, True(isolate));
                }
                
                goto HCE_Fail;
            }
        }
    }
    
HCE_Fail:
    return Return(args, False(isolate));
}

static constexpr unsigned char base64_chars[64] = { '0', '1', '2', '3', '4', '5', '6', '7', '8',
                                                    '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                                                    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
                                                    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                                                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                                                    'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'P', 'R',
                                                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-',
                                                    '_' };

static char * FakeTokenFirst(char * ptr) {
    uint8_t i = 0;
    uint8_t j = 0;
    uint8_t k = (::rand() % 3) + 17;
  
    unsigned char char_array_3[3];
    unsigned char char_array_4[4];
  
    while (k--) {
        char_array_3[i++] = (::rand() % 10) + '0';
        if (i == 3) {
            char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
            char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
            char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
            char_array_4[3] = char_array_3[2] & 0x3f;
            
            for (i = 0; i < 4; i++) {
                *ptr = base64_chars[char_array_4[i]];
                ptr++;
            }
            
            i = 0;
        }
    }
  
    if (i) {
        for (j = i; j < 3; j++)
            char_array_3[j] = 0;
        
        char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
        char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
        char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
        char_array_4[3] = char_array_3[2] & 0x3f;
        
        for (j = 0; j < i + 1; j++) {
            *ptr = base64_chars[char_array_4[j]];
            ptr++;
        }
        
        while ((i++ < 3)) {
            *ptr = '=';
            ptr++;
        }
    }
    
    return ptr;
}

static void FakeToken(const FunctionCallbackInfo<Value> & args) {
    ::srand(time(nullptr));

    char result[60];
    
    char * ptr = &result[0];
    char * end;

    ptr = ::FakeTokenFirst(ptr);

    *ptr = '.';
    
    end = ptr + 6;
    for (ptr++; ptr != end; ptr++) {
        *ptr = base64_chars[::rand() % 62];
    }
    
    *ptr = '.';
    end = &result[60];

    for (ptr++; ptr != end; ptr++) {
        *ptr = base64_chars[::rand() % 62];
    }
    
    Isolate * isolate = args.GetIsolate();
    Return(args, String::NewFromUtf8(isolate, &result[0], NewStringType::kNormal, 59).ToLocalChecked());
}

#define GetCharOr(isolate, context, object, str, otherwise) _GetCharOr(isolate, context, object, str, sizeof(str) - 1, otherwise)

static char _GetCharOr(Isolate * isolate, Local<Context> ctx, Local<Object> obj,
                       const char * str, const uint8_t size, const char otherwise) {
    
    Local<String> s = String::NewFromUtf8(isolate, str, NewStringType::kNormal, size).ToLocalChecked();
    
    if (obj->Has(ctx, s).ToChecked()) {
        Local<Value> val = obj->Get(ctx, s).ToLocalChecked();
        
        if (val->IsString()) {
            String::Utf8Value value(isolate, val->ToString(ctx).ToLocalChecked());
            
            if (value.length() == 1) {
                return (*value)[0];
            }
        }
    }
    
    return otherwise;
}

#define GetNumberOr(isolate, context, obj, str, otherwise) _GetNumberOr(isolate, context, obj, str, sizeof(str) - 1, otherwise)

static double _GetNumberOr(Isolate * isolate, Local<Context> ctx, Local<Object> obj,
                             const char * str, const uint8_t size, uint32_t otherwise) {
    
    Local<String> s = String::NewFromUtf8(isolate, str, NewStringType::kNormal, size).ToLocalChecked();
    
    if (obj->Has(ctx, s).ToChecked()) {
        Local<Value> val = obj->Get(ctx, s).ToLocalChecked();
        
        if (val->IsUint32()) {
            const double value = val->ToNumber(ctx).ToLocalChecked()->Value();
            
            if (value != 0.0) {
                return value;
            }
        }
    }
    
    return otherwise;
}

static void CreateProgressBar(const FunctionCallbackInfo<Value> & args) {
    Isolate * isolate = args.GetIsolate();
    
    if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
        TypeError(isolate, "the first and the second parameters are required and must be a type of number.");
    }
    
    Local<Context> ctx = isolate->GetCurrentContext();
    Local<Object> extra = args[2]->IsObject() ? args[2]->ToObject(ctx).ToLocalChecked() : Object::New(isolate);
    
    const char elapsed_char   = GetCharOr(isolate, ctx, extra, "elapsedChar", '=');
    const char progress_char  = GetCharOr(isolate, ctx, extra, "progressChar", '>');
    const char empty_char     = GetCharOr(isolate, ctx, extra, "emptyChar", '.');
    
    const double _bar_length  = GetNumberOr(isolate, ctx, extra, "barLength", 50.0);
    const double total        = args[1]->ToNumber(ctx).ToLocalChecked()->Value();
    
    if (total <= 0.0) {
        TypeError(isolate, "Invalid total.");
    }
    
    const uint32_t available  = ::ceil((std::max<double>(args[0]->ToNumber(ctx).ToLocalChecked()->Value(), 0.0) / total) * _bar_length);
    const uint32_t bar_length = static_cast<uint32_t>(_bar_length);
    
    char * ptr = reinterpret_cast<char *>(::malloc(bar_length + 1));

    if (available > bar_length) {
        ::memset(ptr, elapsed_char, bar_length);
        goto progress_bar_created;
    } else if (available < 49) {
        ::memset(ptr + available + 1, empty_char, bar_length - available - 1);
    }
    
    if (available != bar_length) {
        ptr[available] = available ? progress_char : empty_char;
    }
    
    if (available) {
        ::memset(ptr, elapsed_char, available);
    }
    
progress_bar_created:
    Return(args, String::NewFromUtf8(isolate, ptr, NewStringType::kNormal, bar_length).ToLocalChecked());
    ::free(ptr);
}

static inline void _ModuleExports(Isolate * isolate, Local<Context> ctx, Local<Object> exports,
                                  const char * name, FunctionCallback callback, const uint8_t size) {
    
    Local<Function> func = FunctionTemplate::New(isolate, callback)->GetFunction(ctx).ToLocalChecked();
    Local<String> str = String::NewFromUtf8(isolate, name, NewStringType::kInternalized, size).ToLocalChecked();
    
    func->SetName(str);
    exports->Set(ctx, str, func);
}

extern "C" NODE_MODULE_EXPORT void NODE_MODULE_INITIALIZER(Local<Object> exports, Local<Value> module, Local<Context> context) {
    Isolate * isolate = context->GetIsolate();
    
    ModuleExports(isolate, context, exports, "mock", Mock);
    ModuleExports(isolate, context, exports, "toAbbreviation", ToAbbreviation);
    ModuleExports(isolate, context, exports, "toProperCase", ToProperCase);
    ModuleExports(isolate, context, exports, "shorten", Shorten);
    ModuleExports(isolate, context, exports, "emojify", Emojify);
    ModuleExports(isolate, context, exports, "scramble", Scramble);
    ModuleExports(isolate, context, exports, "toChunks", ToChunks);
    ModuleExports(isolate, context, exports, "hasCustomEmoji", HasCustomEmoji);
    ModuleExports(isolate, context, exports, "fakeToken", FakeToken);
    ModuleExports(isolate, context, exports, "createProgressBar", CreateProgressBar);
}
