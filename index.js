'use strict';

var jxt = require('jxt');
var JID = require('xmpp-jid').JID;


exports.jidAttribute = function (attr, prepped) {
    return {
        get: function () {
            var jid = new JID(jxt.getAttribute(this.xml, attr));
            if (prepped) {
                jid.prepped = true;
            }
            return jid;
        },
        set: function (value) {
            jxt.setAttribute(this.xml, attr, (value || '').toString());
        }
    };
};


exports.jidSub = function (NS, sub, prepped) {
    return {
        get: function () {
            var jid = new JID(jxt.getSubText(this.xml, NS, sub));
            if (prepped) {
                jid.prepped = true;
            }
            return jid;
        },
        set: function (value) {
            jxt.setSubText(this.xml, NS, sub, (value || '').toString());
        }
    };
};


exports.tzoSub = jxt.field(
    function (xml, NS, sub, defaultVal) {
        var split, hrs, min;
        var sign = -1;
        var formatted = jxt.getSubText(xml, NS, sub);

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
        jxt.setSubText(xml, NS, sub, formatted);
    }
);
