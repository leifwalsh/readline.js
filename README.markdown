Readline.js
===========

A simple javascript library that tries to act like [readline][].

Given a DOM element for showing the current command and a callback function, you
can introduce a commandline prompt into your webpage, if that is something you
would like.

[readline]: http://tiswww.case.edu/php/chet/readline/rltop.html

USAGE
-----

    new Readline($('#input'), this, this.execline)

or

    new Readline($('#input'), this, this.execline, $('#term'))

### This means: ###

"Make a new `Readline` object, using the `#input` DOM element as the command
buffer, sending completed commands to `this.execline`, with `this` as the object
to be referenced by "`this`" inside that function (see [`Function.call`][call]).
Optionally, only accept input when the `#term` DOM element has focus."

See [adlaiff6@github:jsh][jsh] for an example of its usage.  There is also an
example, if you just want to see the end result, [here][example].

[jsh]: http://github.com/adlaiff6/jsh/
[example]: http://adlaiff6.github.com/
[call]: https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Function/call

DEPENDENCIES
------------

* [jQuery][]

[jquery]: http://jquery.com/

BUGS
----

Yes.  Email me (<leif.walsh@gmail.com>).

I have only tested this on Firefox and Chromium (latest-ish Gentoo build).  I
also tried it on [Uzbl][], and couldn't get Backspace to work right.  I think
it's the same problem I found with Chromium (they're both WebKit-based), but I
have yet to confirm that.  If you find problems in other browsers, please let me
know, but also know that I probably won't be able to reproduce or fix them, so
you might have to provide me with a solution on your own.

[uzbl]: http://uzbl.org/

Contributing
------------

Fork and send pull requests.
