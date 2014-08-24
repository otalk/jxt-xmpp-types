# jxt-xmpp-types

## What is this?

A set of additional data types for [JXT](https://github.com/otalk/jxt) useful for working with XMPP data.

## API

- `jidAttribute(attrName, prepped)`

Work with attributes with XMPP JID values. If the `prepped` flag is set to `true`, then the JID will be treated as having been processed with StringPrep.

- `jidSub(ns, subName, prepped)`

Work with sub-elements with XMPP JIDs as text content. If the `prepped` flag is set to `true`, then the JID will be treated as having been processed with StringPrep.

- `tzoSub(ns, subName)`

Return an integer value compatible with JavaScripts datetime API, for child elements whose text content looks like: `'[+|-]hh:mm'`

## License

MIT

## Created By

If you like this, follow [@lancestout](http://twitter.com/lancestout) on twitter.
