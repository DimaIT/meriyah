import { Token } from './token';
import { Errors } from './errors';
import { Node, Comment } from './estree';
export declare const enum Context {
    None = 0,
    OptionsNext = 1,
    OptionsRanges = 2,
    OptionsLoc = 4,
    OptionsDirectives = 8,
    OptionsJSX = 16,
    OptionsGlobalReturn = 32,
    OptionsLexical = 64,
    OptionsPreserveParens = 128,
    OptionsWebCompat = 256,
    OptionsRaw = 512,
    Strict = 1024,
    Module = 2048,
    InSwitch = 4096,
    InGlobal = 8192,
    InClass = 16384,
    AllowRegExp = 32768,
    TaggedTemplate = 65536,
    InIteration = 131072,
    SuperProperty = 262144,
    SuperCall = 524288,
    InYieldContext = 2097152,
    InAwaitContext = 4194304,
    InArgumentList = 8388608,
    InConstructor = 16777216,
    InMethod = 33554432,
    AllowNewTarget = 67108864,
    DisallowIn = 134217728,
    OptionsIdentifierPattern = 268435456,
    OptionsSpecDeviation = 536870912
}
export declare const enum PropertyKind {
    None = 0,
    Method = 1,
    Computed = 2,
    Shorthand = 4,
    Generator = 8,
    Async = 16,
    Static = 32,
    Constructor = 64,
    ClassField = 128,
    Getter = 256,
    Setter = 512,
    Extends = 1024,
    Literal = 2048,
    PrivateField = 4096,
    GetSet = 768
}
export declare const enum BindingKind {
    None = 0,
    ArgumentList = 1,
    EmptyBinding = 2,
    Variable = 4,
    Let = 8,
    Const = 16,
    Class = 32,
    FunctionLexical = 64,
    FunctionStatement = 128,
    CatchPattern = 256,
    CatchIdentifier = 512,
    CatchIdentifierOrPattern = 768,
    LexicalOrFunction = 68,
    LexicalBinding = 248
}
export declare const enum BindingOrigin {
    None = 0,
    Declaration = 1,
    Arrow = 2,
    ForStatement = 4,
    Statement = 8,
    Export = 16,
    Other = 32,
    BlockStatement = 128,
    TopLevel = 256
}
export declare const enum AssignmentKind {
    None = 0,
    Assignable = 1,
    NotAssignable = 2
}
export declare const enum DestructuringKind {
    None = 0,
    MustDestruct = 8,
    CannotDestruct = 16,
    AssignableDestruct = 32,
    SeenProto = 64,
    Await = 128,
    Yield = 256
}
export declare const enum Flags {
    None = 0,
    NewLine = 1,
    HasConstructor = 32,
    Octals = 64,
    SimpleParameterList = 128,
    HasStrictReserved = 256,
    StrictEvalArguments = 512
}
export declare const enum HoistedClassFlags {
    None = 0,
    Hoisted = 1,
    Export = 2
}
export declare const enum HoistedFunctionFlags {
    None = 0,
    Hoisted = 1,
    Export = 2
}
export declare const enum ScopeKind {
    None = 0,
    For = 1,
    Block = 2,
    Catch = 4,
    Switch = 8,
    ArgList = 16,
    Try = 32,
    CatchHead = 64,
    CatchBody = 128,
    Finally = 256,
    FuncBody = 512,
    FuncRoot = 1024,
    ArrowParams = 2048,
    FakeBlock = 4096,
    Global = 8192,
    CatchIdentifier = 16384,
    ForHeader = 32768,
    FunctionParams = 65536
}
export declare type OnComment = void | Comment[] | ((type: string, value: string, start?: number, end?: number) => any);
export interface ScopeState {
    parent: ScopeState | undefined;
    type: ScopeKind;
    scopeError?: ScopeError | null;
}
export interface ScopeError {
    type: Errors;
    index: number;
    line: number;
    column: number;
}
export interface ParserState {
    source: string;
    flags: Flags;
    index: number;
    line: number;
    column: number;
    tokenPos: number;
    startPos: number;
    startColumn: number;
    startLine: number;
    colPos: number;
    linePos: number;
    end: number;
    token: Token;
    onComment: any;
    tokenValue: any;
    tokenRaw: string;
    tokenRegExp: void | {
        pattern: string;
        flags: string;
    };
    sourceFile: string | void;
    assignable: AssignmentKind | DestructuringKind;
    destructible: AssignmentKind | DestructuringKind;
    nextCP: number;
    exportedNames: any;
    exportedBindings: any;
}
export declare function matchOrInsertSemicolon(parser: ParserState, context: Context, specDeviation?: number): void;
export declare function isValidStrictMode(parser: ParserState, index: number, tokenPos: number, tokenValue: string): 0 | 1;
export declare function optionalBit(parser: ParserState, context: Context, t: Token): 0 | 1;
export declare function consumeOpt(parser: ParserState, context: Context, t: Token): boolean;
export declare function consume(parser: ParserState, context: Context, t: Token): void;
export declare function reinterpretToPattern(state: ParserState, node: any): void;
export declare function validateBindingIdentifier(parser: ParserState, context: Context, type: BindingKind, t: Token, skipEvalArgCheck: 0 | 1): void;
export declare function isStrictReservedWord(parser: ParserState, context: Context, t: Token): boolean;
export declare function isPropertyWithPrivateFieldKey(expr: any): boolean;
export declare function isValidLabel(parser: ParserState, labels: any, name: string, isIterationStatement: 0 | 1): 0 | 1;
export declare function validateAndDeclareLabel(parser: ParserState, labels: any, name: string): void;
export declare function finishNode<T extends Node>(parser: ParserState, context: Context, start: number, line: number, column: number, node: T): T;
export declare function createArrowScope(parser: ParserState, context: Context, value: string): ScopeState;
export declare function recordScopeError(parser: ParserState, type: Errors): ScopeError;
export declare function createScope(): ScopeState;
export declare function addChildScope(parent: any, type: ScopeKind): ScopeState;
export declare function addVarName(parser: ParserState, context: Context, scope: ScopeState, name: any, type: BindingKind): void;
export declare function addBlockName(parser: ParserState, context: Context, scope: any, name: string, type: BindingKind, origin: BindingOrigin): void;
export declare function updateExportsList(parser: ParserState, name: string): void;
export declare function addBindingToExports(parser: ParserState, name: string): void;
export declare function pushComment(context: Context, array: any[]): any;
//# sourceMappingURL=common.d.ts.map