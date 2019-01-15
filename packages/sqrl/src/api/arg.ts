/**
 * Copyright 2019 Twitter, Inc.
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * Shorthand for Argument Type
 */
import { AstTypes } from "../ast/AstTypes";
import { ArgumentCheck } from "../ast/ArgumentCheck";
export {
  ArgumentCheck,
  StateArgument,
  WhenContextArgument
} from "../ast/ArgumentCheck";

interface OptArgumentCheck extends ArgumentCheck {
  optional: ArgumentCheck;
}

interface ArgumentCheckWithRuntime extends ArgumentCheck {
  sqrlNodeOrNodes: ArgumentCheck;
  sqrlNode: ArgumentCheck;
}

interface OptArgumentCheckWithRuntime extends ArgumentCheckWithRuntime {
  optional: ArgumentCheckWithRuntime;
}

export const AT: {
  state: ArgumentCheck;
  whenContext: ArgumentCheck;
  any: OptArgumentCheckWithRuntime;
  feature: OptArgumentCheckWithRuntime;
  constant: {
    string: OptArgumentCheck;
    null: OptArgumentCheck;
    number: OptArgumentCheck;
  };
} = AstTypes;
