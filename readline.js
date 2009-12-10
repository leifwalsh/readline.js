(function() {
     Readline = function(elt, obj, target, input) {
         this.elt = elt;
         this.obj = obj;
         this.target = target;
         var closedthis = this;

         /*
          * Javascript has the most fucked up rules for "this" in the world. The
          * below is as simple as I could make it while keeping the event
          * dispatch thing solid.
          */
         this.ctrl = {
             /* backspace */
             8: function(e) { closedthis.backward_kill_word(e); },
             /* enter */
             13: function(e) { closedthis.submit(e); },
             /* c */
             99: function(e) { closedthis.INT(e); }
         };
         this.alt = {
             8: function(e) { closedthis.backward_kill_word(e); },
             13: function(e) { closedthis.submit(e); }
         };
         this.ctrlalt = {
             8: function(e) { closedthis.backward_kill_word(e); },
             13: function(e) { closedthis.submit(e); }
         };
         this.special = {
             8: function(e) { closedthis.backward_kill_char(e); },
             13: function(e) { closedthis.submit(e); }
         };

         var bindelt = input || $(document);

         /* and bind it */
         bindelt.keypress(function(e) {
                              var retval = closedthis.keypress(e);
                              if (!retval) {
                                  e.preventDefault();
                              }
                              return retval;
                          });
         if (/chrome/.test(navigator.userAgent.toLowerCase())) {
             bindelt.keydown(function(e) {
                                 var retval = true;
                                 if (e.which == 8) {  // backspace
                                     retval = closedthis.keypress(e);
                                 }
                                 if (!retval) {
                                     e.preventDefault();
                                 }
                                 return retval;
                             });
         }
     };

     Readline.prototype.backward_kill_char = function(e) {
         var text = this.elt.text();
         this.elt.text(text.replace(/.$/, ''));
         return false;
     };
     Readline.prototype.backward_kill_word = function(e) {
         var text = this.elt.text();
         this.elt.text(text.replace(/[^\s]*\s*$/, ''));
         return false;
     };
     Readline.prototype.submit = function(e) {
         var text = this.elt.text();
         this.elt.text('');
         return this.target.call(this.obj, text, true);
     };
     Readline.prototype.INT = function(e) {
         var text = this.elt.text();
         this.elt.text('');
         return this.target.call(this.obj, text, false);
     };

     Readline.prototype.keypress = function(e) {
         if (e.ctrlKey && e.altKey) {
             if (e.which in this.ctrlalt) {
                 return this.ctrlalt[e.which](e);
             } else {
                 return true;
             }
         }
         if (e.ctrlKey) {
             if (e.which in this.ctrl) {
                 return this.ctrl[e.which](e);
             } else {
                 return true;
             }
         }
         if (e.altKey) {
             if (e.which in this.alt) {
                 return this.alt[e.which](e);
             } else {
                 return true;
             }
         }

         if (e.which in this.special) {
             return this.special[e.which](e);
         }

         var c = String.fromCharCode(e.which);
         if (c.match(/[-\w\s`~!@#$^%&*()\[\]{}\/=?+\\|;:'",<.>]/)) {
             this.elt.append(document.createTextNode(c));
         }
         return false;
     };

 })();
