/**
 * Convert a glob-style pattern (with * wildcards) to a RegExp.
 *
 * - `*`  matches any characters EXCEPT `/` (single path segment)
 * - `**` matches any characters INCLUDING `/` (full path wildcard)
 * - All other regex-special characters are escaped
 * - Pattern is anchored with ^...$ for full-path matching
 *
 * Examples:
 *   "/admin/*"    → matches "/admin/dashboard" but NOT "/admin/users/1"
 *   "/admin/**"   → matches "/admin/dashboard" AND "/admin/users/1"
 *   "* /login"    → matches "/en/login", "/fr/login"
 *   "/checkout/*" → matches "/checkout/step1"
 *   "/pricing"    → matches only "/pricing"
 */
export function globToRegex(pattern: string): RegExp {
  const regexStr = pattern
    .replace(/([.+?^${}()|[\]\\])/g, "\\$1") // escape regex special chars (not *)
    .replace(/\*\*/g, "{{GLOBSTAR}}")          // temp placeholder for **
    .replace(/\*/g, "[^/]*")                    // * → anything except /
    .replace(/\{\{GLOBSTAR\}\}/g, ".*");        // ** → anything

  return new RegExp(`^${regexStr}$`);
}

/**
 * Determine whether the widget should be visible on the given page.
 *
 * Modes:
 *   "exclude" → show everywhere UNLESS pathname matches a pattern
 *   "include" → show ONLY on pages that match a pattern
 *
 * Empty patterns array → widget shows everywhere (safe default for both modes).
 */
export function shouldShowWidget(
  pathname: string,
  mode: "exclude" | "include",
  patterns: string[],
): boolean {
  if (!patterns || patterns.length === 0) return true;

  const matches = patterns.some((pattern) => {
    try {
      return globToRegex(pattern).test(pathname);
    } catch {
      return false; // skip invalid patterns
    }
  });

  return mode === "exclude" ? !matches : matches;
}
