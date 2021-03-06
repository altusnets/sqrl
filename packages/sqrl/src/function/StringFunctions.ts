/**
 * Copyright 2018 Twitter, Inc.
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/* eslint-disable no-useless-escape */

import { StdlibRegistry } from "./Instance";
import { AstTypes as AT } from "../ast/AstTypes";
import { SqrlObject } from "../object/SqrlObject";

export function registerStringFunctions(instance: StdlibRegistry) {
  instance.save(
    function repr(value) {
      if (value === null) {
        return "null";
      } else if (Array.isArray(value)) {
        return "[" + value.map(repr).join(",") + "]";
      } else if (typeof value === "object") {
        return "[object]";
      } else if (typeof value === "undefined") {
        // @todo: We should ensure this doesn't happen, but log the string to reduce confusion
        return "[undefined]";
      } else if (typeof value === "boolean" || typeof value === "number") {
        return value.toString();
      } else {
        return JSON.stringify(value.toString());
      }
    },
    {
      args: [AT.any],
      pure: true,
      allowNull: true,
      argstring: "value",
      docstring: "Represent the given value (including nulls) as a string"
    }
  );

  instance.save(
    function stringify(value) {
      return JSON.stringify(value);
    },
    {
      args: [AT.any],
      argstring: "value",
      docstring: "Returns the value encoded as a json string"
    }
  );
  instance.save(
    function hexEncode(string) {
      return Buffer.from(string, "utf-8").toString("hex");
    },
    {
      args: [AT.any],
      argstring: "value",
      docstring: "Returns the value encoded as a hex string"
    }
  );

  instance.save(
    function strip(string) {
      return typeof string === "string" ? string.trim() : null;
    },
    {
      args: [AT.any.string],
      argstring: "value",
      docstring: "Strips whitespace from either end of the given string",
      pure: true
    }
  );

  instance.save(
    function escapeURI(string) {
      return encodeURIComponent(string);
    },
    {
      args: [AT.any.string],
      argstring: "value",
      docstring:
        "Encodes special characters in the given string for a component in a URI"
    }
  );

  instance.save(
    function escapeRegex(state, str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },
    {
      args: [AT.state, AT.any.string],
      argstring: "value",
      docstring:
        "Encodes special characters in the given string for use in a regular expression"
    }
  );

  instance.save(
    function split(string, by) {
      if (typeof string !== "string" || typeof by !== "string") {
        return null;
      }
      return string.split(by);
    },
    {
      args: [AT.any, AT.any],
      argstring: "value, by",
      docstring: "Splits a string into a list of strings"
    }
  );

  instance.save(
    function iso8601(value) {
      if (value instanceof SqrlObject) {
        const timeMs = value.getTimeMs();
        return new Date(timeMs).toISOString();
      }
      throw new Error("Unsupported date type");
    },
    {
      args: [AT.any],
      allowSqrlObjects: true,
      argstring: "date",
      docstring: "Returns the date as a valid ISO8601 date string"
    }
  );

  instance.save(
    function lower(string) {
      return typeof string === "string" ? string.toLowerCase() : null;
    },
    {
      args: [AT.any],
      argstring: "string",
      docstring: "Returns the lowercase version of the given string"
    }
  );
  instance.save(
    function upper(string) {
      return typeof string === "string" ? string.toUpperCase() : null;
    },
    {
      args: [AT.any],
      argstring: "string",
      docstring: "Returns the uppercase version of the given string"
    }
  );
  instance.save(
    function hasDigit(string) {
      return typeof string === "string" ? /[0-9]/.test(string) : null;
    },
    {
      args: [AT.any],
      argstring: "string",
      docstring: "Returns true if the given string contains a digit"
    }
  );

  instance.save(
    function startsWith(string, prefix) {
      if (typeof string !== "string" || typeof prefix !== "string") {
        return null;
      }
      return string.startsWith(prefix);
    },
    {
      args: [AT.any, AT.any],
      argstring: "string, prefix",
      docstring: "Returns true if the given string starts with the prefix"
    }
  );

  instance.save(
    function endsWith(string, suffix) {
      if (typeof string !== "string" || typeof suffix !== "string") {
        return null;
      }
      return string.endsWith(suffix);
    },
    {
      args: [AT.any, AT.any],
      argstring: "string, suffix",
      docstring: "Returns true if the given string ends with the suffix"
    }
  );

  instance.save(
    function substr(state, string, start, end = null) {
      return string.substr(...[start, end].filter(v => v !== null));
    },
    {
      args: [AT.state, AT.any.string, AT.any.number, AT.any.optional.number],
      argstring: "string, start, [end]",
      docstring:
        "Returns the substring from the given start index of the string"
    }
  );
}
