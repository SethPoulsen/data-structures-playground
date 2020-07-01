
const varNameRe = /[a-zA-Z_][a-zA-Z0-9_]*/i;
const reservedWords = new Set([
    // C++
    "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel",
    "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "bool",
    "break", "case", "catch", "char", "char8_t", "char16_t", "char32_t",
    "class", "compl", "concept", "const", "consteval", "constexpr", "constinit",
    "const_cast", "continue", "co_await", "co_return", "co_yield",
    "decltype", "default", "delete", "do", "double", "dynamic_cast", "else",
    "enum", "explicit", "export", "extern", "false", "float", "for", "friend",
    "goto", "if", "inline", "int", "long", "mutable", "namespace", "new",
    "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq",
    "private", "protected", "public", "reflexpr", "register",
    "reinterpret_cast", "requires", "return", "short", "signed", "sizeof",
    "static", "static_assert", "static_cast", "struct", "switch",
    "synchronized", "template", "this", "thread_local", "throw", "true", "try",
    "typedef", "typeid", "typename", "union", "unsigned", "using", "virtual",
    "void", "volatile", "wchar_t", "while", "xor", "xor_eq",
    // Java
    "abstract", "continue", "for", "new", "switch", "assert",
    "default", "goto", "package", "synchronized", "boolean", "do", "if",
    "private", "this", "break", "double", "implements", "protected", "throw",
    "byte", "else", "import", "public", "throws", "case", "enum", "instanceof",
    "return", "transient", "catch", "extends", "int", "short", "try", "char",
    "final", "interface", "static", "void", "class", "finally", "long",
    "strictfp", "volatile", "const", "float", "native", "super",
    // Python
    "False", "await", "else", "import", "pass", "None",
    "break", "except", "in", "raise", "True", "class", "finally", "is",
    "return", "and", "continue", "for", "lambda", "try", "as", "def", "from",
    "nonlocal", "while", "assert", "del", "global", "not", "with", "async",
    "elif", "if", "or", "yield",
    // Other
    "NULL", "null",
]);

export function validateVariableName(name: string, alreadyUsed: string[]): boolean {

    if (!varNameRe.test(name)) {
        alert("Variable names must start with a letter and contain only letters and numbers.");
        return false;
    }

    if (reservedWords.has(name)) {
        alert(name + " is a reserved word. Please pick another variable name.");
        return false;
    }

    if (alreadyUsed.indexOf(name) !== -1) {
        alert("That variable name is already in use!");
        return false;
    }

    return true;
}
