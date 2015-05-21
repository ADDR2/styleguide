
/**Copy this list and paste it in 
* "string-checker.js" line 46
* "jscs-browser.js" line 6146
*/
this.registerRule(new (require('./rules/disallow-multiple-line-comments'))());
this.registerRule(new (require('./rules/require-newline-before-line-comments'))());
this.registerRule(new (require('./rules/disallow-keywords-on-parameters'))());
this.registerRule(new (require('./rules/disallow-object-creation'))());
this.registerRule(new (require('./rules/disallow-array-creation'))());
this.registerRule(new (require('./rules/disallow-equal-and-notequal-operators'))());
this.registerRule(new (require('./rules/require-dollar-before-jquery-assignment'))());
this.registerRule(new (require('./rules/validate-block-statements'))());
this.registerRule(new (require('./rules/require-multiple-line-in-var-declarations'))());
this.registerRule(new (require('./rules/disallow-Initialization-in-var-declarations'))());
this.registerRule(new (require('./rules/disallow-boolean-creation'))());
this.registerRule(new (require('./rules/disallow-number-creation'))());