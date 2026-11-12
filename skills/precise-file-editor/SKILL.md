---
name: precise-file-editor
description: Use when modifying existing code files to ensure surgical patch edits instead of full rewrites. Prevents context drift and token waste.
---

# Precise File Editor

## Rules
1. Never rewrite an entire file when modifying code unless requested.
2. Use exact hunk matching (old_string -> new_string).
3. Verify file syntax after every patch.
4. Keep explanations brief and focused on the diff.
