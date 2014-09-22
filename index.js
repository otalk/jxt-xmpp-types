'use strict';

var JID = require('xmpp-jid').JID;


module.exports = function (JXT) {
    var types = JXT.utils;

    // ----------------------------------------------------------------
    // Shortcuts for common withDefinition calls
    // ----------------------------------------------------------------
    
    JXT.withIq = function (cb) {
        this.withDefinition('iq', 'jabber:client', cb);
        this.withDefinition('iq', 'jabber:component:accept', cb);
    };

    JXT.withMessage = function (cb) {
        this.withDefinition('message', 'jabber:client', cb);
        this.withDefinition('message', 'jabber:component:accept', cb);
    };

    JXT.withPresence = function (cb) {
        this.withDefinition('presence', 'jabber:client', cb);
        this.withDefinition('presence', 'jabber:component:accept', cb);
    };

    JXT.withStreamFeatures = function (cb) {
        this.withDefinition('features', 'http://etherx.jabber.org/streams', cb);
    };

    JXT.withStanzaError = function (cb) {
        this.withDefinition('error', 'jabber:client', cb);
        this.withDefinition('error', 'jabber:component:accept', cb);
    };

    JXT.withDataForm = function (cb) {
        this.withDefinition('x', 'jabber:x:data', cb);
    };

    JXT.withPubsubItem = function (cb) {
        this.withDefinition('item', 'http://jabber.org/protocol/pubsub', cb);
        this.withDefinition('item', 'http://jabber.org/protocol/pubsub#event', cb);
    };


    // ----------------------------------------------------------------
    // Shortcuts for common getDefinition calls
    // ----------------------------------------------------------------
   
    JXT.getMessage = function () {
        return this.getDefinition('message', 'jabber:client');
    };

    JXT.getPresence = function () {
        return this.getDefinition('presence', 'jabber:client');
    };

    JXT.getIq = function () {
        return this.getDefinition('iq', 'jabber:client');
    };

    JXT.getStreamError = function () {
        return this.getDefinition('error', 'http://etherx.jabber.org/streams');
    };
   
    JXT.getComponentMessage = function () {
        return this.getDefinition('message', 'jabber:component:accept');
    };

    JXT.getComponentPresence = function () {
        return this.getDefinition('presence', 'jabber:component:accept');
    };

    JXT.getComponentIq = function () {
        return this.getDefinition('iq', 'jabber:component:accept');
    };


    // ----------------------------------------------------------------
    // Field types
    // ----------------------------------------------------------------


    JXT.utils.jidAttribute = function (attr, prepped) {
        return {
            get: function () {
                var jid = new JID(types.getAttribute(this.xml, attr));
                if (prepped) {
                    jid.prepped = true;
                }
                return jid;
            },
            set: function (value) {
                types.setAttribute(this.xml, attr, (value || '').toString());
            }
        };
    };
    
    JXT.utils.jidSub = function (NS, sub, prepped) {
        return {
            get: function () {
                var jid = new JID(types.getSubText(this.xml, NS, sub));
                if (prepped) {
                    jid.prepped = true;
                }
                return jid;
            },
            set: function (value) {
                types.setSubText(this.xml, NS, sub, (value || '').toString());
            }
        };
    };
    
    
    JXT.utils.tzoSub = types.field(
        function (xml, NS, sub, defaultVal) {
            var split, hrs, min;
            var sign = -1;
            var formatted = types.getSubText(xml, NS, sub);
    
            if (!formatted) {
                return defaultVal;
            }
    
            if (formatted.charAt(0) === '-') {
                sign = 1;
                formatted = formatted.slice(1);
            }
    
            split = formatted.split(':');
            hrs = parseInt(split[0], 10);
            min = parseInt(split[1], 10);
            return (hrs * 60 + min) * sign;
        },
        function (xml, NS, sub, value) {
            var hrs, min;
            var formatted = '-';
            if (typeof value === 'number') {
                if (value < 0) {
                    value = -value;
                    formatted = '+';
                }
                hrs = value / 60;
                min = value % 60;
                formatted += (hrs < 10 ? '0' : '') + hrs + ':' + (min < 10 ? '0' : '') + min;
            } else {
                formatted = value;
            }
            types.setSubText(xml, NS, sub, formatted);
        }
    );
};
