/*
 tableExport.jquery.plugin
 Version 1.10.21
 Copyright (c) 2015-2020 hhurz, https://github.com/hhurz/tableExport.jquery.plugin
 Based on https://github.com/kayalshri/tableExport.jquery.plugin
 Licensed under the MIT License
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(d, k, y) { d instanceof String && (d = String(d)); for (var C = d.length, v = 0; v < C; v++) { var R = d[v]; if (k.call(y, R, v, d)) return { i: v, v: R } } return { i: -1, v: void 0 } };
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(d, k, y) { d != Array.prototype && d != Object.prototype && (d[k] = y.value) };
$jscomp.getGlobal = function(d) { return "undefined" != typeof window && window === d ? d : "undefined" != typeof global && null != global ? global : d };
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(d, k, y, C) {
    if (k) {
        y = $jscomp.global;
        d = d.split(".");
        for (C = 0; C < d.length - 1; C++) {
            var v = d[C];
            v in y || (y[v] = {});
            y = y[v]
        }
        d = d[d.length - 1];
        C = y[d];
        k = k(C);
        k != C && null != k && $jscomp.defineProperty(y, d, { configurable: !0, writable: !0, value: k })
    }
};
$jscomp.polyfill("Array.prototype.find", function(d) { return d ? d : function(d, y) { return $jscomp.findInternal(this, d, y).v } }, "es6", "es3");
(function(d) {
    d.fn.tableExport = function(k) {
        function y(b) {
            var c = [];
            v(b, "thead").each(function() { c.push.apply(c, v(d(this), a.theadSelector).toArray()) });
            return c
        }

        function C(b) {
            var c = [];
            v(b, "tbody").each(function() { c.push.apply(c, v(d(this), a.tbodySelector).toArray()) });
            a.tfootSelector.length && v(b, "tfoot").each(function() { c.push.apply(c, v(d(this), a.tfootSelector).toArray()) });
            return c
        }

        function v(b, a) {
            var c = b[0].tagName,
                p = b.parents(c).length;
            return b.find(a).filter(function() { return p === d(this).closest(c).parents(c).length })
        }

        function R(b) {
            var a = [],
                e = 0,
                p = 0,
                f = 0;
            d(b).find("thead").first().find("th").each(function(b, c) { b = void 0 !== d(c).attr("data-field"); "undefined" !== typeof c.parentNode.rowIndex && p !== c.parentNode.rowIndex && (p = c.parentNode.rowIndex, e = f = 0); var l = J(c); for (e += l ? l : 1; f < e;) a[f] = b ? d(c).attr("data-field") : f.toString(), f++ });
            return a
        }

        function I(b) {
            var a = "undefined" !== typeof b[0].rowIndex,
                e = !1 === a && "undefined" !== typeof b[0].cellIndex,
                p = e || a ? Ja(b) : b.is(":visible"),
                f = b.attr("data-tableexport-display");
            e && "none" !== f &&
                "always" !== f && (b = d(b[0].parentNode), a = "undefined" !== typeof b[0].rowIndex, f = b.attr("data-tableexport-display"));
            a && "none" !== f && "always" !== f && (f = b.closest("table").attr("data-tableexport-display"));
            return "none" !== f && (!0 === p || "always" === f)
        }

        function Ja(b) {
            var a = [];
            U && (a = K.filter(function() {
                var a = !1;
                this.nodeType === b[0].nodeType && ("undefined" !== typeof this.rowIndex && this.rowIndex === b[0].rowIndex ? a = !0 : "undefined" !== typeof this.cellIndex && this.cellIndex === b[0].cellIndex && "undefined" !== typeof this.parentNode.rowIndex &&
                    "undefined" !== typeof b[0].parentNode.rowIndex && this.parentNode.rowIndex === b[0].parentNode.rowIndex && (a = !0));
                return a
            }));
            return !1 === U || 0 === a.length
        }

        function ta(b, c, e) {
            var p = !1;
            I(b) ? 0 < a.ignoreColumn.length && (-1 !== d.inArray(e, a.ignoreColumn) || -1 !== d.inArray(e - c, a.ignoreColumn) || S.length > e && "undefined" !== typeof S[e] && -1 !== d.inArray(S[e], a.ignoreColumn)) && (p = !0) : p = !0;
            return p
        }

        function E(b, c, e, p, f) {
            if ("function" === typeof f) {
                var l = !1;
                "function" === typeof a.onIgnoreRow && (l = a.onIgnoreRow(d(b), e));
                if (!1 === l &&
                    (0 === a.ignoreRow.length || -1 === d.inArray(e, a.ignoreRow) && -1 === d.inArray(e - p, a.ignoreRow)) && I(d(b))) {
                    b = v(d(b), c);
                    var q = b.length,
                        h = 0,
                        u = 0;
                    b.each(function() {
                        var b = d(this),
                            a = J(this),
                            c = T(this),
                            l;
                        d.each(G, function() {
                            if (e > this.s.r && e <= this.e.r && h >= this.s.c && h <= this.e.c)
                                for (l = 0; l <= this.e.c - this.s.c; ++l) q++, u++, f(null, e, h++)
                        });
                        if (c || a) a = a || 1, G.push({ s: { r: e, c: h }, e: { r: e + (c || 1) - 1, c: h + a - 1 } });
                        !1 === ta(b, q, u++) && f(this, e, h++);
                        if (1 < a)
                            for (l = 0; l < a - 1; ++l) u++, f(null, e, h++)
                    });
                    d.each(G, function() {
                        if (e >= this.s.r && e <= this.e.r &&
                            h >= this.s.c && h <= this.e.c)
                            for (da = 0; da <= this.e.c - this.s.c; ++da) f(null, e, h++)
                    })
                }
            }
        }

        function ua(b, a, e, d) {
            if ("undefined" !== typeof d.images && (e = d.images[e], "undefined" !== typeof e)) {
                a = a.getBoundingClientRect();
                var c = b.width / b.height,
                    l = a.width / a.height,
                    p = b.width,
                    h = b.height,
                    u = 19.049976 / 25.4,
                    g = 0;
                l <= c ? (h = Math.min(b.height, a.height), p = a.width * h / a.height) : l > c && (p = Math.min(b.width, a.width), h = a.height * p / a.width);
                p *= u;
                h *= u;
                h < b.height && (g = (b.height - h) / 2);
                try { d.doc.addImage(e.src, b.textPos.x, b.y + g, p, h) } catch (Pa) {}
                b.textPos.x +=
                    p
            }
        }

        function va(b, c) {
            if ("string" === a.outputMode) return b.output();
            if ("base64" === a.outputMode) return L(b.output());
            if ("window" === a.outputMode) window.URL = window.URL || window.webkitURL, window.open(window.URL.createObjectURL(b.output("blob")));
            else try {
                var e = b.output("blob");
                saveAs(e, a.fileName + ".pdf")
            } catch (p) { ka(a.fileName + ".pdf", "data:application/pdf" + (c ? "" : ";base64") + ",", c ? b.output("blob") : b.output()) }
        }

        function wa(b, a, e) {
            var c = 0;
            "undefined" !== typeof e && (c = e.colspan);
            if (0 <= c) {
                for (var d = b.width, l = b.textPos.x,
                        q = a.table.columns.indexOf(a.column), h = 1; h < c; h++) d += a.table.columns[q + h].width;
                1 < c && ("right" === b.styles.halign ? l = b.textPos.x + d - b.width : "center" === b.styles.halign && (l = b.textPos.x + (d - b.width) / 2));
                b.width = d;
                b.textPos.x = l;
                "undefined" !== typeof e && 1 < e.rowspan && (b.height *= e.rowspan);
                if ("middle" === b.styles.valign || "bottom" === b.styles.valign) e = ("string" === typeof b.text ? b.text.split(/\r\n|\r|\n/g) : b.text).length || 1, 2 < e && (b.textPos.y -= (2 - 1.15) / 2 * a.row.styles.fontSize * (e - 2) / 3);
                return !0
            }
            return !1
        }

        function xa(b,
            a, e) {
            "undefined" !== typeof b && null !== b && (b.hasAttribute("data-tableexport-canvas") ? (a = (new Date).getTime(), d(b).attr("data-tableexport-canvas", a), e.images[a] = { url: '[data-tableexport-canvas="' + a + '"]', src: null }) : "undefined" !== a && null != a && a.each(function() {
                if (d(this).is("img")) {
                    var a = ya(this.src);
                    e.images[a] = { url: this.src, src: this.src }
                }
                xa(b, d(this).children(), e)
            }))
        }

        function Ka(b, a) {
            function c(b) {
                if (b.url)
                    if (b.src) {
                        var c = new Image;
                        p = ++f;
                        c.crossOrigin = "Anonymous";
                        c.onerror = c.onload = function() {
                            if (c.complete &&
                                (0 === c.src.indexOf("data:image/") && (c.width = b.width || c.width || 0, c.height = b.height || c.height || 0), c.width + c.height)) {
                                var e = document.createElement("canvas"),
                                    d = e.getContext("2d");
                                e.width = c.width;
                                e.height = c.height;
                                d.drawImage(c, 0, 0);
                                b.src = e.toDataURL("image/png")
                            }--f || a(p)
                        };
                        c.src = b.url
                    } else {
                        var e = d(b.url);
                        e.length && (p = ++f, html2canvas(e[0]).then(function(c) { b.src = c.toDataURL("image/png");--f || a(p) }))
                    }
            }
            var p = 0,
                f = 0;
            if ("undefined" !== typeof b.images)
                for (var l in b.images) b.images.hasOwnProperty(l) && c(b.images[l]);
            (b = f) || (a(p), b = void 0);
            return b
        }

        function za(b, c, e) {
            c.each(function() {
                if (d(this).is("div")) {
                    var c = ea(M(this, "background-color"), [255, 255, 255]),
                        f = ea(M(this, "border-top-color"), [0, 0, 0]),
                        l = fa(this, "border-top-width", a.jspdf.unit),
                        q = this.getBoundingClientRect(),
                        h = this.offsetLeft * e.wScaleFactor,
                        u = this.offsetTop * e.hScaleFactor,
                        g = q.width * e.wScaleFactor;
                    q = q.height * e.hScaleFactor;
                    e.doc.setDrawColor.apply(void 0, f);
                    e.doc.setFillColor.apply(void 0, c);
                    e.doc.setLineWidth(l);
                    e.doc.rect(b.x + h, b.y + u, g, q, l ? "FD" : "F")
                } else d(this).is("img") &&
                    (c = ya(this.src), ua(b, this, c, e));
                za(b, d(this).children(), e)
            })
        }

        function Aa(b, c, e) {
            if ("function" === typeof e.onAutotableText) e.onAutotableText(e.doc, b, c);
            else {
                var p = b.textPos.x,
                    f = b.textPos.y,
                    l = { halign: b.styles.halign, valign: b.styles.valign };
                if (c.length) {
                    for (c = c[0]; c.previousSibling;) c = c.previousSibling;
                    for (var q = !1, h = !1; c;) {
                        var u = c.innerText || c.textContent || "",
                            g = u.length && " " === u[0] ? " " : "",
                            k = 1 < u.length && " " === u[u.length - 1] ? " " : "";
                        !0 !== a.preserve.leadingWS && (u = g + la(u));
                        !0 !== a.preserve.trailingWS && (u = ma(u) +
                            k);
                        d(c).is("br") && (p = b.textPos.x, f += e.doc.internal.getFontSize());
                        d(c).is("b") ? q = !0 : d(c).is("i") && (h = !0);
                        (q || h) && e.doc.setFontType(q && h ? "bolditalic" : q ? "bold" : "italic");
                        if (g = e.doc.getStringUnitWidth(u) * e.doc.internal.getFontSize()) {
                            "linebreak" === b.styles.overflow && p > b.textPos.x && p + g > b.textPos.x + b.width && (0 <= ".,!%*;:=-".indexOf(u.charAt(0)) && (k = u.charAt(0), g = e.doc.getStringUnitWidth(k) * e.doc.internal.getFontSize(), p + g <= b.textPos.x + b.width && (e.doc.autoTableText(k, p, f, l), u = u.substring(1, u.length)), g =
                                e.doc.getStringUnitWidth(u) * e.doc.internal.getFontSize()), p = b.textPos.x, f += e.doc.internal.getFontSize());
                            if ("visible" !== b.styles.overflow)
                                for (; u.length && p + g > b.textPos.x + b.width;) u = u.substring(0, u.length - 1), g = e.doc.getStringUnitWidth(u) * e.doc.internal.getFontSize();
                            e.doc.autoTableText(u, p, f, l);
                            p += g
                        }
                        if (q || h) d(c).is("b") ? q = !1 : d(c).is("i") && (h = !1), e.doc.setFontType(q || h ? q ? "bold" : "italic" : "normal");
                        c = c.nextSibling
                    }
                    b.textPos.x = p;
                    b.textPos.y = f
                } else e.doc.autoTableText(b.text, b.textPos.x, b.textPos.y, l)
            }
        }

        function V(b, a, e) { return null == b ? "" : b.toString().replace(new RegExp(null == a ? "" : a.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), e) }

        function la(b) { return null == b ? "" : b.toString().replace(/^\s+/, "") }

        function ma(b) { return null == b ? "" : b.toString().replace(/\s+$/, "") }

        function La(b) {
            if (0 === a.date.html.length) return !1;
            a.date.pattern.lastIndex = 0;
            var c = a.date.pattern.exec(b);
            if (null == c) return !1;
            b = +c[a.date.match_y];
            if (0 > b || 8099 < b) return !1;
            var e = 1 * c[a.date.match_m];
            c = 1 * c[a.date.match_d];
            if (!isFinite(c)) return !1;
            var d = new Date(b, e - 1, c, 0, 0, 0);
            return d.getFullYear() === b && d.getMonth() === e - 1 && d.getDate() === c ? new Date(Date.UTC(b, e - 1, c, 0, 0, 0)) : !1
        }

        function na(b) { b = b || "0"; "" !== a.numbers.html.thousandsSeparator && (b = V(b, a.numbers.html.thousandsSeparator, "")); "." !== a.numbers.html.decimalMark && (b = V(b, a.numbers.html.decimalMark, ".")); return "number" === typeof b || !1 !== jQuery.isNumeric(b) ? b : !1 }

        function Ma(b) {-1 < b.indexOf("%") ? (b = na(b.replace(/%/g, "")), !1 !== b && (b /= 100)) : b = !1; return b }

        function D(b, c, e, p) {
            var f = "",
                l = "text";
            if (null !== b) {
                var q = d(b);
                q.removeData("teUserDefText");
                if (q[0].hasAttribute("data-tableexport-canvas")) var h = "";
                else if (q[0].hasAttribute("data-tableexport-value")) h = (h = q.attr("data-tableexport-value")) ? h + "" : "", q.data("teUserDefText", 1);
                else if (h = q.html(), "function" === typeof a.onCellHtmlData) h = a.onCellHtmlData(q, c, e, h), q.data("teUserDefText", 1);
                else if ("" !== h) {
                    b = d.parseHTML(h);
                    var g = 0,
                        k = 0;
                    h = "";
                    d.each(b, function() {
                        if (d(this).is("input")) h += q.find("input").eq(g++).val();
                        else if (d(this).is("select")) h +=
                            q.find("select option:selected").eq(k++).text();
                        else if (d(this).is("br")) h += "<br>";
                        else {
                            if ("undefined" === typeof d(this).html()) h += d(this).text();
                            else if (void 0 === jQuery().bootstrapTable || !1 === d(this).hasClass("fht-cell") && !1 === d(this).hasClass("filterControl") && 0 === q.parents(".detail-view").length) h += d(this).html();
                            if (d(this).is("a")) {
                                var b = q.find("a").attr("href") || "";
                                f = "function" === typeof a.onCellHtmlHyperlink ? f + a.onCellHtmlHyperlink(q, c, e, b, h) : "href" === a.htmlHyperlink ? f + b : f + h;
                                h = ""
                            }
                        }
                    })
                }
                if (h && "" !==
                    h && !0 === a.htmlContent) f = d.trim(h);
                else if (h && "" !== h)
                    if ("" !== q.attr("data-tableexport-cellformat")) {
                        var m = h.replace(/\n/g, "\u2028").replace(/(<\s*br([^>]*)>)/gi, "\u2060"),
                            n = d("<div/>").html(m).contents();
                        b = !1;
                        m = "";
                        d.each(n.text().split("\u2028"), function(b, c) {
                            0 < b && (m += " ");
                            !0 !== a.preserve.leadingWS && (c = la(c));
                            m += !0 !== a.preserve.trailingWS ? ma(c) : c
                        });
                        d.each(m.split("\u2060"), function(b, c) {
                            0 < b && (f += "\n");
                            !0 !== a.preserve.leadingWS && (c = la(c));
                            !0 !== a.preserve.trailingWS && (c = ma(c));
                            f += c.replace(/\u00AD/g,
                                "")
                        });
                        f = f.replace(/\u00A0/g, " ");
                        if ("json" === a.type || "excel" === a.type && "xmlss" === a.mso.fileFormat || !1 === a.numbers.output) b = na(f), !1 !== b && (l = "number", f = Number(b));
                        else if (a.numbers.html.decimalMark !== a.numbers.output.decimalMark || a.numbers.html.thousandsSeparator !== a.numbers.output.thousandsSeparator)
                            if (b = na(f), !1 !== b) {
                                n = ("" + b.substr(0 > b ? 1 : 0)).split(".");
                                1 === n.length && (n[1] = "");
                                var t = 3 < n[0].length ? n[0].length % 3 : 0;
                                l = "number";
                                f = (0 > b ? "-" : "") + (a.numbers.output.thousandsSeparator ? (t ? n[0].substr(0, t) + a.numbers.output.thousandsSeparator :
                                    "") + n[0].substr(t).replace(/(\d{3})(?=\d)/g, "$1" + a.numbers.output.thousandsSeparator) : n[0]) + (n[1].length ? a.numbers.output.decimalMark + n[1] : "")
                            }
                    } else f = h;
                    !0 === a.escape && (f = escape(f));
                "function" === typeof a.onCellData && (f = a.onCellData(q, c, e, f, l), q.data("teUserDefText", 1))
            }
            void 0 !== p && (p.type = l);
            return f
        }

        function Ba(b) { return 0 < b.length && !0 === a.preventInjection && 0 <= "=+-@".indexOf(b.charAt(0)) ? "'" + b : b }

        function Na(b, a, e) { return a + "-" + e.toLowerCase() }

        function ea(b, a) {
            (b = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(b)) &&
            (a = [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])]);
            return a
        }

        function Ca(b) {
            var a = M(b, "text-align"),
                e = M(b, "font-weight"),
                d = M(b, "font-style"),
                f = "";
            "start" === a && (a = "rtl" === M(b, "direction") ? "right" : "left");
            700 <= e && (f = "bold");
            "italic" === d && (f += d);
            "" === f && (f = "normal");
            a = { style: { align: a, bcolor: ea(M(b, "background-color"), [255, 255, 255]), color: ea(M(b, "color"), [0, 0, 0]), fstyle: f }, colspan: J(b), rowspan: T(b) };
            null !== b && (b = b.getBoundingClientRect(), a.rect = { width: b.width, height: b.height });
            return a
        }

        function J(b) {
            var a =
                d(b).attr("data-tableexport-colspan");
            "undefined" === typeof a && d(b).is("[colspan]") && (a = d(b).attr("colspan"));
            return parseInt(a) || 0
        }

        function T(b) { var a = d(b).attr("data-tableexport-rowspan"); "undefined" === typeof a && d(b).is("[rowspan]") && (a = d(b).attr("rowspan")); return parseInt(a) || 0 }

        function M(a, c) { try { return window.getComputedStyle ? (c = c.replace(/([a-z])([A-Z])/, Na), window.getComputedStyle(a, null).getPropertyValue(c)) : a.currentStyle ? a.currentStyle[c] : a.style[c] } catch (e) {} return "" }

        function fa(a, c, e) {
            c =
                M(a, c).match(/\d+/);
            if (null !== c) {
                c = c[0];
                a = a.parentElement;
                var b = document.createElement("div");
                b.style.overflow = "hidden";
                b.style.visibility = "hidden";
                a.appendChild(b);
                b.style.width = 100 + e;
                e = 100 / b.offsetWidth;
                a.removeChild(b);
                return c * e
            }
            return 0
        }

        function Oa(a) { for (var b = new ArrayBuffer(a.length), e = new Uint8Array(b), d = 0; d !== a.length; ++d) e[d] = a.charCodeAt(d) & 255; return b }

        function oa(a) {
            var b = a.c,
                e = "";
            for (++b; b; b = Math.floor((b - 1) / 26)) e = String.fromCharCode((b - 1) % 26 + 65) + e;
            return e + ("" + (a.r + 1))
        }

        function pa(a,
            c) { if ("undefined" === typeof c || "number" === typeof c) return pa(a.s, a.e); "string" !== typeof a && (a = oa(a)); "string" !== typeof c && (c = oa(c)); return a === c ? a : a + ":" + c }

        function Da(a, c) {
            var b = Number(a);
            if (isFinite(b)) return b;
            var d = 1;
            "" !== c.thousandsSeparator && (a = a.replace(new RegExp("([\\d])" + c.thousandsSeparator + "([\\d])", "g"), "$1$2"));
            "." !== c.decimalMark && (a = a.replace(new RegExp("([\\d])" + c.decimalMark + "([\\d])", "g"), "$1.$2"));
            a = a.replace(/[$]/g, "").replace(/[%]/g, function() { d *= 100; return "" });
            if (isFinite(b = Number(a))) return b /
                d;
            a = a.replace(/[(](.*)[)]/, function(a, b) { d = -d; return b });
            return isFinite(b = Number(a)) ? b / d : b
        }

        function ya(a) {
            var b = 0,
                d;
            if (0 === a.length) return b;
            var p = 0;
            for (d = a.length; p < d; p++) {
                var f = a.charCodeAt(p);
                b = (b << 5) - b + f;
                b |= 0
            }
            return b
        }

        function N(b, c, d, p, f, l) {
            var e = !0;
            "function" === typeof a.onBeforeSaveToFile && (e = a.onBeforeSaveToFile(b, c, d, p, f), "boolean" !== typeof e && (e = !0));
            if (e) try { if (Ea = new Blob([b], { type: d + ";charset=" + p }), saveAs(Ea, c, !1 === l), "function" === typeof a.onAfterSaveToFile) a.onAfterSaveToFile(b, c) } catch (h) {
                ka(c,
                    "data:" + d + (p.length ? ";charset=" + p : "") + (f.length ? ";" + f : "") + ",", l ? "\ufeff" + b : b)
            }
        }

        function ka(b, c, d) {
            var e = window.navigator.userAgent;
            if (!1 !== b && window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(new Blob([d]), b);
            else if (!1 !== b && (0 < e.indexOf("MSIE ") || e.match(/Trident.*rv\:11\./))) {
                if (c = document.createElement("iframe")) {
                    document.body.appendChild(c);
                    c.setAttribute("style", "display:none");
                    c.contentDocument.open("txt/plain", "replace");
                    c.contentDocument.write(d);
                    c.contentDocument.close();
                    c.contentWindow.focus();
                    switch (b.substr(b.lastIndexOf(".") + 1)) {
                        case "doc":
                        case "json":
                        case "png":
                        case "pdf":
                        case "xls":
                        case "xlsx":
                            b += ".txt"
                    }
                    c.contentDocument.execCommand("SaveAs", !0, b);
                    document.body.removeChild(c)
                }
            } else {
                var f = document.createElement("a");
                if (f) {
                    var l = null;
                    f.style.display = "none";
                    !1 !== b ? f.download = b : f.target = "_blank";
                    "object" === typeof d ? (window.URL = window.URL || window.webkitURL, e = [], e.push(d), l = window.URL.createObjectURL(new Blob(e, { type: c })), f.href = l) : 0 <= c.toLowerCase().indexOf("base64,") ?
                        f.href = c + L(d) : f.href = c + encodeURIComponent(d);
                    document.body.appendChild(f);
                    if (document.createEvent) null === ha && (ha = document.createEvent("MouseEvents")), ha.initEvent("click", !0, !1), f.dispatchEvent(ha);
                    else if (document.createEventObject) f.fireEvent("onclick");
                    else if ("function" === typeof f.onclick) f.onclick();
                    setTimeout(function() {
                        l && window.URL.revokeObjectURL(l);
                        document.body.removeChild(f);
                        if ("function" === typeof a.onAfterSaveToFile) a.onAfterSaveToFile(d, b)
                    }, 100)
                }
            }
        }

        function L(a) {
            var b, d = "",
                p = 0;
            if ("string" ===
                typeof a) {
                a = a.replace(/\x0d\x0a/g, "\n");
                var f = "";
                for (b = 0; b < a.length; b++) {
                    var l = a.charCodeAt(b);
                    128 > l ? f += String.fromCharCode(l) : (127 < l && 2048 > l ? f += String.fromCharCode(l >> 6 | 192) : (f += String.fromCharCode(l >> 12 | 224), f += String.fromCharCode(l >> 6 & 63 | 128)), f += String.fromCharCode(l & 63 | 128))
                }
                a = f
            }
            for (; p < a.length;) {
                var q = a.charCodeAt(p++);
                f = a.charCodeAt(p++);
                b = a.charCodeAt(p++);
                l = q >> 2;
                q = (q & 3) << 4 | f >> 4;
                var h = (f & 15) << 2 | b >> 6;
                var g = b & 63;
                isNaN(f) ? h = g = 64 : isNaN(b) && (g = 64);
                d = d + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l) +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(q) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g)
            }
            return d
        }
        var a = {
                csvEnclosure: '"',
                csvSeparator: ",",
                csvUseBOM: !0,
                date: { html: "dd/mm/yyyy" },
                displayTableName: !1,
                escape: !1,
                exportHiddenCells: !1,
                fileName: "tableExport",
                htmlContent: !1,
                htmlHyperlink: "content",
                ignoreColumn: [],
                ignoreRow: [],
                jsonScope: "all",
                jspdf: {
                    orientation: "p",
                    unit: "pt",
                    format: "a4",
                    margins: { left: 20, right: 10, top: 10, bottom: 10 },
                    onDocCreated: null,
                    autotable: { styles: { cellPadding: 2, rowHeight: 12, fontSize: 8, fillColor: 255, textColor: 50, fontStyle: "normal", overflow: "ellipsize", halign: "inherit", valign: "middle" }, headerStyles: { fillColor: [52, 73, 94], textColor: 255, fontStyle: "bold", halign: "inherit", valign: "middle" }, alternateRowStyles: { fillColor: 245 }, tableExport: { doc: null, onAfterAutotable: null, onBeforeAutotable: null, onAutotableText: null, onTable: null, outputImages: !0 } }
                },
                mso: {
                    fileFormat: "xlshtml",
                    onMsoNumberFormat: null,
                    pageFormat: "a4",
                    pageOrientation: "portrait",
                    rtl: !1,
                    styles: [],
                    worksheetName: "",
                    xslx: { formatId: { date: 14, numbers: 2 } }
                },
                numbers: { html: { decimalMark: ".", thousandsSeparator: "," }, output: { decimalMark: ".", thousandsSeparator: "," } },
                onAfterSaveToFile: null,
                onBeforeSaveToFile: null,
                onCellData: null,
                onCellHtmlData: null,
                onCellHtmlHyperlink: null,
                onIgnoreRow: null,
                onTableExportBegin: null,
                onTableExportEnd: null,
                outputMode: "file",
                pdfmake: {
                    enabled: !1,
                    docDefinition: { pageOrientation: "portrait", defaultStyle: { font: "Roboto" } },
                    fonts: {}
                },
                preserve: { leadingWS: !1, trailingWS: !1 },
                preventInjection: !0,
                sql: { tableEnclosure: "`", columnEnclosure: "`" },
                tbodySelector: "tr",
                tfootSelector: "tr",
                theadSelector: "tr",
                tableName: "Table",
                type: "csv"
            },
            O = {
                a0: [2383.94, 3370.39],
                a1: [1683.78, 2383.94],
                a2: [1190.55, 1683.78],
                a3: [841.89, 1190.55],
                a4: [595.28, 841.89],
                a5: [419.53, 595.28],
                a6: [297.64, 419.53],
                a7: [209.76, 297.64],
                a8: [147.4, 209.76],
                a9: [104.88, 147.4],
                a10: [73.7, 104.88],
                b0: [2834.65, 4008.19],
                b1: [2004.09, 2834.65],
                b2: [1417.32, 2004.09],
                b3: [1000.63, 1417.32],
                b4: [708.66,
                    1000.63
                ],
                b5: [498.9, 708.66],
                b6: [354.33, 498.9],
                b7: [249.45, 354.33],
                b8: [175.75, 249.45],
                b9: [124.72, 175.75],
                b10: [87.87, 124.72],
                c0: [2599.37, 3676.54],
                c1: [1836.85, 2599.37],
                c2: [1298.27, 1836.85],
                c3: [918.43, 1298.27],
                c4: [649.13, 918.43],
                c5: [459.21, 649.13],
                c6: [323.15, 459.21],
                c7: [229.61, 323.15],
                c8: [161.57, 229.61],
                c9: [113.39, 161.57],
                c10: [79.37, 113.39],
                dl: [311.81, 623.62],
                letter: [612, 792],
                "government-letter": [576, 756],
                legal: [612, 1008],
                "junior-legal": [576, 360],
                ledger: [1224, 792],
                tabloid: [792, 1224],
                "credit-card": [153,
                    243
                ]
            },
            B = this,
            ha = null,
            r = [],
            w = [],
            n = 0,
            t = "",
            S = [],
            G = [],
            Ea, K = [],
            U = !1;
        d.extend(!0, a, k);
        "xlsx" === a.type && (a.mso.fileFormat = a.type, a.type = "excel");
        "undefined" !== typeof a.excelFileFormat && "undefined" === a.mso.fileFormat && (a.mso.fileFormat = a.excelFileFormat);
        "undefined" !== typeof a.excelPageFormat && "undefined" === a.mso.pageFormat && (a.mso.pageFormat = a.excelPageFormat);
        "undefined" !== typeof a.excelPageOrientation && "undefined" === a.mso.pageOrientation && (a.mso.pageOrientation = a.excelPageOrientation);
        "undefined" !== typeof a.excelRTL &&
            "undefined" === a.mso.rtl && (a.mso.rtl = a.excelRTL);
        "undefined" !== typeof a.excelstyles && "undefined" === a.mso.styles && (a.mso.styles = a.excelstyles);
        "undefined" !== typeof a.onMsoNumberFormat && "undefined" === a.mso.onMsoNumberFormat && (a.mso.onMsoNumberFormat = a.onMsoNumberFormat);
        "undefined" !== typeof a.worksheetName && "undefined" === a.mso.worksheetName && (a.mso.worksheetName = a.worksheetName);
        a.mso.pageOrientation = "l" === a.mso.pageOrientation.substr(0, 1) ? "landscape" : "portrait";
        a.date.html = a.date.html || "";
        if (a.date.html.length) {
            k = [];
            k.dd = "(3[01]|[12][0-9]|0?[1-9])";
            k.mm = "(1[012]|0?[1-9])";
            k.yyyy = "((?:1[6-9]|2[0-2])\\d{2})";
            k.yy = "(\\d{2})";
            var z = a.date.html.match(/[^a-zA-Z0-9]/)[0];
            z = a.date.html.toLowerCase().split(z);
            a.date.regex = "^\\s*";
            a.date.regex += k[z[0]];
            a.date.regex += "(.)";
            a.date.regex += k[z[1]];
            a.date.regex += "\\2";
            a.date.regex += k[z[2]];
            a.date.regex += "\\s*$";
            a.date.pattern = new RegExp(a.date.regex, "g");
            k = z.indexOf("dd") + 1;
            a.date.match_d = k + (1 < k ? 1 : 0);
            k = z.indexOf("mm") + 1;
            a.date.match_m = k + (1 < k ? 1 : 0);
            k = (0 <= z.indexOf("yyyy") ?
                z.indexOf("yyyy") : z.indexOf("yy")) + 1;
            a.date.match_y = k + (1 < k ? 1 : 0)
        }
        S = R(B);
        if ("function" === typeof a.onTableExportBegin) a.onTableExportBegin();
        if ("csv" === a.type || "tsv" === a.type || "txt" === a.type) {
            var P = "",
                Y = 0;
            G = [];
            n = 0;
            var qa = function(b, c, e) {
                b.each(function() {
                    t = "";
                    E(this, c, n, e + b.length, function(b, c, d) {
                        var e = t,
                            f = "";
                        if (null !== b)
                            if (b = D(b, c, d), c = null === b || "" === b ? "" : b.toString(), "tsv" === a.type) b instanceof Date && b.toLocaleString(), f = V(c, "\t", " ");
                            else if (b instanceof Date) f = a.csvEnclosure + b.toLocaleString() + a.csvEnclosure;
                        else if (f = Ba(c), f = V(f, a.csvEnclosure, a.csvEnclosure + a.csvEnclosure), 0 <= f.indexOf(a.csvSeparator) || /[\r\n ]/g.test(f)) f = a.csvEnclosure + f + a.csvEnclosure;
                        t = e + (f + ("tsv" === a.type ? "\t" : a.csvSeparator))
                    });
                    t = d.trim(t).substring(0, t.length - 1);
                    0 < t.length && (0 < P.length && (P += "\n"), P += t);
                    n++
                });
                return b.length
            };
            Y += qa(d(B).find("thead").first().find(a.theadSelector), "th,td", Y);
            v(d(B), "tbody").each(function() { Y += qa(v(d(this), a.tbodySelector), "td,th", Y) });
            a.tfootSelector.length && qa(d(B).find("tfoot").first().find(a.tfootSelector),
                "td,th", Y);
            P += "\n";
            if ("string" === a.outputMode) return P;
            if ("base64" === a.outputMode) return L(P);
            if ("window" === a.outputMode) { ka(!1, "data:text/" + ("csv" === a.type ? "csv" : "plain") + ";charset=utf-8,", P); return }
            N(P, a.fileName + "." + a.type, "text/" + ("csv" === a.type ? "csv" : "plain"), "utf-8", "", "csv" === a.type && a.csvUseBOM)
        } else if ("sql" === a.type) {
            n = 0;
            G = [];
            var A = "INSERT INTO " + a.sql.tableEnclosure + a.tableName + a.sql.tableEnclosure + " (";
            r = y(d(B));
            d(r).each(function() {
                E(this, "th,td", n, r.length, function(b, c, d) {
                    b = D(b, c, d) ||
                        ""; - 1 < b.indexOf(a.sql.columnEnclosure) && (b = V(b.toString(), a.sql.columnEnclosure, a.sql.columnEnclosure + a.sql.columnEnclosure));
                    A += a.sql.columnEnclosure + b + a.sql.columnEnclosure + ","
                });
                n++;
                A = d.trim(A).substring(0, A.length - 1)
            });
            A += ") VALUES ";
            w = C(d(B));
            d(w).each(function() {
                t = "";
                E(this, "td,th", n, r.length + w.length, function(a, c, d) {
                    a = D(a, c, d) || ""; - 1 < a.indexOf("'") && (a = V(a.toString(), "'", "''"));
                    t += "'" + a + "',"
                });
                3 < t.length && (A += "(" + t, A = d.trim(A).substring(0, A.length - 1), A += "),");
                n++
            });
            A = d.trim(A).substring(0,
                A.length - 1);
            A += ";";
            if ("string" === a.outputMode) return A;
            if ("base64" === a.outputMode) return L(A);
            N(A, a.fileName + ".sql", "application/sql", "utf-8", "", !1)
        } else if ("json" === a.type) {
            var W = [];
            G = [];
            r = y(d(B));
            d(r).each(function() {
                var a = [];
                E(this, "th,td", n, r.length, function(b, d, g) { a.push(D(b, d, g)) });
                W.push(a)
            });
            var ra = [];
            w = C(d(B));
            d(w).each(function() {
                var a = {},
                    c = 0;
                E(this, "td,th", n, r.length + w.length, function(b, d, f) {
                    W.length ? a[W[W.length - 1][c]] = D(b, d, f) : a[c] = D(b, d, f);
                    c++
                });
                !1 === d.isEmptyObject(a) && ra.push(a);
                n++
            });
            k = "head" === a.jsonScope ? JSON.stringify(W) : "data" === a.jsonScope ? JSON.stringify(ra) : JSON.stringify({ header: W, data: ra });
            if ("string" === a.outputMode) return k;
            if ("base64" === a.outputMode) return L(k);
            N(k, a.fileName + ".json", "application/json", "utf-8", "base64", !1)
        } else if ("xml" === a.type) {
            n = 0;
            G = [];
            var Q = '<?xml version="1.0" encoding="utf-8"?>';
            Q += "<tabledata><fields>";
            r = y(d(B));
            d(r).each(function() {
                E(this, "th,td", n, r.length, function(a, d, e) { Q += "<field>" + D(a, d, e) + "</field>" });
                n++
            });
            Q += "</fields><data>";
            var Fa =
                1;
            w = C(d(B));
            d(w).each(function() {
                var a = 1;
                t = "";
                E(this, "td,th", n, r.length + w.length, function(b, d, g) {
                    t += "<column-" + a + ">" + D(b, d, g) + "</column-" + a + ">";
                    a++
                });
                0 < t.length && "<column-1></column-1>" !== t && (Q += '<row id="' + Fa + '">' + t + "</row>", Fa++);
                n++
            });
            Q += "</data></tabledata>";
            if ("string" === a.outputMode) return Q;
            if ("base64" === a.outputMode) return L(Q);
            N(Q, a.fileName + ".xml", "application/xml", "utf-8", "base64", !1)
        } else if ("excel" === a.type && "xmlss" === a.mso.fileFormat) {
            var sa = [],
                F = [];
            d(B).filter(function() { return I(d(this)) }).each(function() {
                function b(a,
                    b, c) {
                    var e = [];
                    d(a).each(function() {
                        var b = 0,
                            f = 0;
                        t = "";
                        E(this, "td,th", n, c + a.length, function(a, c, l) {
                            if (null !== a) {
                                var h = "";
                                c = D(a, c, l);
                                l = "String";
                                if (!1 !== jQuery.isNumeric(c)) l = "Number";
                                else { var g = Ma(c);!1 !== g && (c = g, l = "Number", h += ' ss:StyleID="pct1"') }
                                "Number" !== l && (c = c.replace(/\n/g, "<br>"));
                                g = J(a);
                                a = T(a);
                                d.each(e, function() {
                                    if (n >= this.s.r && n <= this.e.r && f >= this.s.c && f <= this.e.c)
                                        for (var a = 0; a <= this.e.c - this.s.c; ++a) f++, b++
                                });
                                if (a || g) a = a || 1, g = g || 1, e.push({ s: { r: n, c: f }, e: { r: n + a - 1, c: f + g - 1 } });
                                1 < g && (h += ' ss:MergeAcross="' +
                                    (g - 1) + '"', f += g - 1);
                                1 < a && (h += ' ss:MergeDown="' + (a - 1) + '" ss:StyleID="rsp1"');
                                0 < b && (h += ' ss:Index="' + (f + 1) + '"', b = 0);
                                t += "<Cell" + h + '><Data ss:Type="' + l + '">' + d("<div />").text(c).html() + "</Data></Cell>\r";
                                f++
                            }
                        });
                        0 < t.length && (H += '<Row ss:AutoFitHeight="0">\r' + t + "</Row>\r");
                        n++
                    });
                    return a.length
                }
                var c = d(this),
                    e = "";
                "string" === typeof a.mso.worksheetName && a.mso.worksheetName.length ? e = a.mso.worksheetName + " " + (F.length + 1) : "undefined" !== typeof a.mso.worksheetName[F.length] && (e = a.mso.worksheetName[F.length]);
                e.length ||
                    (e = c.find("caption").text() || "");
                e.length || (e = "Table " + (F.length + 1));
                e = d.trim(e.replace(/[\\\/[\]*:?'"]/g, "").substring(0, 31));
                F.push(d("<div />").text(e).html());
                !1 === a.exportHiddenCells && (K = c.find("tr, th, td").filter(":hidden"), U = 0 < K.length);
                n = 0;
                S = R(this);
                H = "<Table>\r";
                e = b(y(c), "th,td", 0);
                b(C(c), "td,th", e);
                H += "</Table>\r";
                sa.push(H)
            });
            k = {};
            z = {};
            for (var m, Z, X = 0, da = F.length; X < da; X++) m = F[X], Z = k[m], Z = k[m] = null == Z ? 1 : Z + 1, 2 === Z && (F[z[m]] = F[z[m]].substring(0, 29) + "-1"), 1 < k[m] ? F[X] = F[X].substring(0, 29) +
                "-" + k[m] : z[m] = X;
            k = '<?xml version="1.0" encoding="UTF-8"?>\r<?mso-application progid="Excel.Sheet"?>\r<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:o="urn:schemas-microsoft-com:office:office"\r xmlns:x="urn:schemas-microsoft-com:office:excel"\r xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:html="http://www.w3.org/TR/REC-html40">\r<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\r  <Created>' + (new Date).toISOString() + '</Created>\r</DocumentProperties>\r<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">\r  <AllowPNG/>\r</OfficeDocumentSettings>\r<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\r  <WindowHeight>9000</WindowHeight>\r  <WindowWidth>13860</WindowWidth>\r  <WindowTopX>0</WindowTopX>\r  <WindowTopY>0</WindowTopY>\r  <ProtectStructure>False</ProtectStructure>\r  <ProtectWindows>False</ProtectWindows>\r</ExcelWorkbook>\r<Styles>\r  <Style ss:ID="Default" ss:Name="Normal">\r    <Alignment ss:Vertical="Bottom"/>\r    <Borders/>\r    <Font/>\r    <Interior/>\r    <NumberFormat/>\r    <Protection/>\r  </Style>\r  <Style ss:ID="rsp1">\r    <Alignment ss:Vertical="Center"/>\r  </Style>\r  <Style ss:ID="pct1">\r    <NumberFormat ss:Format="Percent"/>\r  </Style>\r</Styles>\r';
            for (z = 0; z < sa.length; z++) k += '<Worksheet ss:Name="' + F[z] + '" ss:RightToLeft="' + (a.mso.rtl ? "1" : "0") + '">\r' + sa[z], k = a.mso.rtl ? k + '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\r<DisplayRightToLeft/>\r</WorksheetOptions>\r' : k + '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"/>\r', k += "</Worksheet>\r";
            k += "</Workbook>\r";
            if ("string" === a.outputMode) return k;
            if ("base64" === a.outputMode) return L(k);
            N(k, a.fileName + ".xml", "application/xml", "utf-8", "base64", !1)
        } else if ("excel" ===
            a.type && "xlsx" === a.mso.fileFormat) {
            var aa = [],
                Ga = XLSX.utils.book_new();
            d(B).filter(function() { return I(d(this)) }).each(function() {
                for (var b = d(this), c = {}, e = this.getElementsByTagName("tr"), g = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, f = [], l, q = [], h = 0, u = 0, k, m, n, t, r, w = XLSX.SSF.get_table(); h < e.length && 1E7 > u; ++h)
                    if (k = e[h], m = !1, "function" === typeof a.onIgnoreRow && (m = a.onIgnoreRow(d(k), h)), !0 !== m && (0 === a.ignoreRow.length || -1 === d.inArray(h, a.ignoreRow) && -1 === d.inArray(h - e.length, a.ignoreRow)) && !1 !== I(d(k))) {
                        var y = k.children,
                            B = 0;
                        for (k = 0; k < y.length; ++k) r = y[k], t = +J(r) || 1, B += t;
                        var z = 0;
                        for (k = m = 0; k < y.length; ++k)
                            if (r = y[k], t = +J(r) || 1, l = k + z, !ta(d(r), B, l + (l < m ? m - l : 0))) {
                                z += t - 1;
                                for (l = 0; l < f.length; ++l) {
                                    var v = f[l];
                                    v.s.c == m && v.s.r <= u && u <= v.e.r && (m = v.e.c + 1, l = -1)
                                }(0 < (n = +T(r)) || 1 < t) && f.push({ s: { r: u, c: m }, e: { r: u + (n || 1) - 1, c: m + t - 1 } });
                                var C = { type: "" };
                                l = D(r, h, k + z, C);
                                v = { t: "s", v: l };
                                var A = "";
                                if ("" !== d(r).attr("data-tableexport-cellformat")) {
                                    var x = parseInt(d(r).attr("data-tableexport-xlsxformatid") || 0);
                                    0 === x && "function" === typeof a.mso.xslx.formatId.numbers &&
                                        (x = a.mso.xslx.formatId.numbers(d(r), h, k + z));
                                    0 === x && "function" === typeof a.mso.xslx.formatId.date && (x = a.mso.xslx.formatId.date(d(r), h, k + z));
                                    if (49 === x || "@" === x) A = "s";
                                    else if ("number" === C.type || 0 < x && 14 > x || 36 < x && 41 > x || 48 === x) A = "n";
                                    else if ("date" === C.type || 13 < x && 37 > x || 44 < x && 48 > x || 56 === x) A = "d"
                                } else A = "s";
                                if (null != l)
                                    if (0 === l.length) v.t = "z";
                                    else if (0 !== l.trim().length && "s" !== A)
                                    if ("function" === C.type) v = { f: l };
                                    else if ("TRUE" === l) v = { t: "b", v: !0 };
                                else if ("FALSE" === l) v = { t: "b", v: !1 };
                                else if ("" === A && d(r).find("a").length) l =
                                    "href" !== a.htmlHyperlink ? l : "", v = { f: '=HYPERLINK("' + d(r).find("a").attr("href") + (l.length ? '","' + l : "") + '")' };
                                else if ("n" === A || isFinite(Da(l, a.numbers.output))) { if (r = Da(l, a.numbers.output), 0 === x && "function" !== typeof a.mso.xslx.formatId.numbers && (x = a.mso.xslx.formatId.numbers), isFinite(r) || isFinite(l)) v = { t: "n", v: isFinite(r) ? r : l, z: "string" === typeof x ? x : x in w ? w[x] : "0.00" } } else if (!1 !== (r = La(l)) || "d" === A) 0 === x && "function" !== typeof a.mso.xslx.formatId.date && (x = a.mso.xslx.formatId.date), v = {
                                    t: "d",
                                    v: !1 !== r ?
                                        r : l,
                                    z: "string" === typeof x ? x : x in w ? w[x] : "m/d/yy"
                                };
                                c[oa({ c: m, r: u })] = v;
                                g.e.c < m && (g.e.c = m);
                                m += t
                            }++u
                    }
                f.length && (c["!merges"] = f);
                q.length && (c["!rows"] = q);
                g.e.r = u - 1;
                c["!ref"] = pa(g);
                1E7 <= u && (c["!fullref"] = pa((g.e.r = e.length - h + u - 1, g)));
                e = "";
                "string" === typeof a.mso.worksheetName && a.mso.worksheetName.length ? e = a.mso.worksheetName + " " + (aa.length + 1) : "undefined" !== typeof a.mso.worksheetName[aa.length] && (e = a.mso.worksheetName[aa.length]);
                e.length || (e = b.find("caption").text() || "");
                e.length || (e = "Table " + (aa.length +
                    1));
                e = d.trim(e.replace(/[\\\/[\]*:?'"]/g, "").substring(0, 31));
                aa.push(e);
                XLSX.utils.book_append_sheet(Ga, c, e)
            });
            k = XLSX.write(Ga, { type: "binary", bookType: a.mso.fileFormat, bookSST: !1 });
            N(Oa(k), a.fileName + "." + a.mso.fileFormat, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "UTF-8", "", !1)
        } else if ("excel" === a.type || "xls" === a.type || "word" === a.type || "doc" === a.type) {
            k = "excel" === a.type || "xls" === a.type ? "excel" : "word";
            z = "excel" === k ? "xls" : "doc";
            m = 'xmlns:x="urn:schemas-microsoft-com:office:' +
                k + '"';
            var H = "",
                ba = "";
            d(B).filter(function() { return I(d(this)) }).each(function() {
                var b = d(this);
                "" === ba && (ba = a.mso.worksheetName || b.find("caption").text() || "Table", ba = d.trim(ba.replace(/[\\\/[\]*:?'"]/g, "").substring(0, 31)));
                !1 === a.exportHiddenCells && (K = b.find("tr, th, td").filter(":hidden"), U = 0 < K.length);
                n = 0;
                G = [];
                S = R(this);
                H += "<table><thead>";
                r = y(b);
                d(r).each(function() {
                    var b = d(this);
                    t = "";
                    E(this, "th,td", n, r.length, function(d, c, f) {
                        if (null !== d) {
                            var e = "";
                            t += "<th";
                            if (a.mso.styles.length) {
                                var g = document.defaultView.getComputedStyle(d,
                                        null),
                                    h = document.defaultView.getComputedStyle(b[0], null),
                                    k;
                                for (k in a.mso.styles) { var m = g[a.mso.styles[k]]; "" === m && (m = h[a.mso.styles[k]]); "" !== m && "0px none rgb(0, 0, 0)" !== m && "rgba(0, 0, 0, 0)" !== m && (e += "" === e ? 'style="' : ";", e += a.mso.styles[k] + ":" + m) }
                            }
                            "" !== e && (t += " " + e + '"');
                            e = J(d);
                            0 < e && (t += ' colspan="' + e + '"');
                            e = T(d);
                            0 < e && (t += ' rowspan="' + e + '"');
                            t += ">" + D(d, c, f) + "</th>"
                        }
                    });
                    0 < t.length && (H += "<tr>" + t + "</tr>");
                    n++
                });
                H += "</thead><tbody>";
                w = C(b);
                d(w).each(function() {
                    var b = d(this);
                    t = "";
                    E(this, "td,th", n, r.length +
                        w.length,
                        function(c, g, f) {
                            if (null !== c) {
                                var e = D(c, g, f),
                                    q = "",
                                    h = d(c).attr("data-tableexport-msonumberformat");
                                "undefined" === typeof h && "function" === typeof a.mso.onMsoNumberFormat && (h = a.mso.onMsoNumberFormat(c, g, f));
                                "undefined" !== typeof h && "" !== h && (q = "style=\"mso-number-format:'" + h + "'");
                                if (a.mso.styles.length) {
                                    g = document.defaultView.getComputedStyle(c, null);
                                    f = document.defaultView.getComputedStyle(b[0], null);
                                    for (var k in a.mso.styles) h = g[a.mso.styles[k]], "" === h && (h = f[a.mso.styles[k]]), "" !== h && "0px none rgb(0, 0, 0)" !==
                                        h && "rgba(0, 0, 0, 0)" !== h && (q += "" === q ? 'style="' : ";", q += a.mso.styles[k] + ":" + h)
                                }
                                t += "<td";
                                "" !== q && (t += " " + q + '"');
                                q = J(c);
                                0 < q && (t += ' colspan="' + q + '"');
                                c = T(c);
                                0 < c && (t += ' rowspan="' + c + '"');
                                "string" === typeof e && "" !== e && (e = Ba(e), e = e.replace(/\n/g, "<br>"));
                                t += ">" + e + "</td>"
                            }
                        });
                    0 < t.length && (H += "<tr>" + t + "</tr>");
                    n++
                });
                a.displayTableName && (H += "<tr><td></td></tr><tr><td></td></tr><tr><td>" + D(d("<p>" + a.tableName + "</p>")) + "</td></tr>");
                H += "</tbody></table>"
            });
            m = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
                m + ' xmlns="http://www.w3.org/TR/REC-html40">' + ('<meta http-equiv="content-type" content="application/vnd.ms-' + k + '; charset=UTF-8">') + "<head>";
            "excel" === k && (m += "\x3c!--[if gte mso 9]>", m += "<xml>", m += "<x:ExcelWorkbook>", m += "<x:ExcelWorksheets>", m += "<x:ExcelWorksheet>", m += "<x:Name>", m += ba, m += "</x:Name>", m += "<x:WorksheetOptions>", m += "<x:DisplayGridlines/>", a.mso.rtl && (m += "<x:DisplayRightToLeft/>"), m += "</x:WorksheetOptions>", m += "</x:ExcelWorksheet>", m += "</x:ExcelWorksheets>", m += "</x:ExcelWorkbook>", m +=
                "</xml>", m += "<![endif]--\x3e");
            m += "<style>";
            m += "@page { size:" + a.mso.pageOrientation + "; mso-page-orientation:" + a.mso.pageOrientation + "; }";
            m += "@page Section1 {size:" + O[a.mso.pageFormat][0] + "pt " + O[a.mso.pageFormat][1] + "pt";
            m += "; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
            m += "div.Section1 {page:Section1;}";
            m += "@page Section2 {size:" + O[a.mso.pageFormat][1] + "pt " + O[a.mso.pageFormat][0] + "pt";
            m += ";mso-page-orientation:" + a.mso.pageOrientation + ";margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
            m += "div.Section2 {page:Section2;}";
            m += "br {mso-data-placement:same-cell;}";
            m += "</style>";
            m += "</head>";
            m += "<body>";
            m += '<div class="Section' + ("landscape" === a.mso.pageOrientation ? "2" : "1") + '">';
            m += H;
            m += "</div>";
            m += "</body>";
            m += "</html>";
            if ("string" === a.outputMode) return m;
            if ("base64" === a.outputMode) return L(m);
            N(m, a.fileName + "." + z, "application/vnd.ms-" + k, "", "base64", !1)
        } else if ("png" === a.type) html2canvas(d(B)[0]).then(function(b) {
            b = b.toDataURL();
            for (var c = atob(b.substring(22)), d = new ArrayBuffer(c.length),
                    g = new Uint8Array(d), f = 0; f < c.length; f++) g[f] = c.charCodeAt(f);
            if ("string" === a.outputMode) return c;
            if ("base64" === a.outputMode) return L(b);
            "window" === a.outputMode ? window.open(b) : N(d, a.fileName + ".png", "image/png", "", "", !1)
        });
        else if ("pdf" === a.type)
            if (!0 === a.pdfmake.enabled) {
                var ia = { content: [] };
                d.extend(!0, ia, a.pdfmake.docDefinition);
                G = [];
                d(B).filter(function() { return I(d(this)) }).each(function() {
                    var a = d(this),
                        c = [],
                        e = [];
                    n = 0;
                    var g = function(a, b, c) {
                        var f = 0;
                        d(a).each(function() {
                            var a = [];
                            E(this, b, n, c, function(b,
                                d, c) {
                                if ("undefined" !== typeof b && null !== b) {
                                    var f = J(b),
                                        e = T(b);
                                    b = D(b, d, c) || " ";
                                    1 < f || 1 < e ? a.push({ colSpan: f || 1, rowSpan: e || 1, text: b }) : a.push(b)
                                } else a.push(" ")
                            });
                            a.length && e.push(a);
                            f < a.length && (f = a.length);
                            n++
                        });
                        return f
                    };
                    r = y(a);
                    for (var f = g(r, "th,td", r.length), l = c.length; l < f; l++) c.push("*");
                    w = C(a);
                    g(w, "th,td", r.length + w.length);
                    ia.content.push({ table: { headerRows: r.length, widths: c, body: e }, pageBreak: ia.content.length ? "before" : void 0 })
                });
                "undefined" !== typeof pdfMake && "undefined" !== typeof pdfMake.createPdf &&
                    (pdfMake.fonts = { Roboto: { normal: "Roboto-Regular.ttf", bold: "Roboto-Medium.ttf", italics: "Roboto-Italic.ttf", bolditalics: "Roboto-MediumItalic.ttf" } }, pdfMake.vfs.hasOwnProperty("Mirza-Regular.ttf") ? (a.pdfmake.docDefinition.defaultStyle.font = "Mirza", d.extend(!0, pdfMake.fonts, { Mirza: { normal: "Mirza-Regular.ttf", bold: "Mirza-Bold.ttf", italics: "Mirza-Medium.ttf", bolditalics: "Mirza-SemiBold.ttf" } })) : pdfMake.vfs.hasOwnProperty("gbsn00lp.ttf") ? (a.pdfmake.docDefinition.defaultStyle.font = "gbsn00lp", d.extend(!0, pdfMake.fonts, { gbsn00lp: { normal: "gbsn00lp.ttf", bold: "gbsn00lp.ttf", italics: "gbsn00lp.ttf", bolditalics: "gbsn00lp.ttf" } })) : pdfMake.vfs.hasOwnProperty("ZCOOLXiaoWei-Regular.ttf") && (a.pdfmake.docDefinition.defaultStyle.font = "ZCOOLXiaoWei", d.extend(!0, pdfMake.fonts, { ZCOOLXiaoWei: { normal: "ZCOOLXiaoWei-Regular.ttf", bold: "ZCOOLXiaoWei-Regular.ttf", italics: "ZCOOLXiaoWei-Regular.ttf", bolditalics: "ZCOOLXiaoWei-Regular.ttf" } })), d.extend(!0, pdfMake.fonts, a.pdfmake.fonts), pdfMake.createPdf(ia).getBuffer(function(b) {
                        N(b, a.fileName +
                            ".pdf", "application/pdf", "", "", !1)
                    }))
            } else if (!1 === a.jspdf.autotable) {
            k = { dim: { w: fa(d(B).first().get(0), "width", "mm"), h: fa(d(B).first().get(0), "height", "mm") }, pagesplit: !1 };
            var Ha = new jsPDF(a.jspdf.orientation, a.jspdf.unit, a.jspdf.format);
            Ha.addHTML(d(B).first(), a.jspdf.margins.left, a.jspdf.margins.top, k, function() { va(Ha, !1) })
        } else {
            var g = a.jspdf.autotable.tableExport;
            if ("string" === typeof a.jspdf.format && "bestfit" === a.jspdf.format.toLowerCase()) {
                var ja = "",
                    ca = "",
                    Ia = 0;
                d(B).each(function() {
                    if (I(d(this))) {
                        var a =
                            fa(d(this).get(0), "width", "pt");
                        if (a > Ia) {
                            a > O.a0[0] && (ja = "a0", ca = "l");
                            for (var c in O) O.hasOwnProperty(c) && O[c][1] > a && (ja = c, ca = "l", O[c][0] > a && (ca = "p"));
                            Ia = a
                        }
                    }
                });
                a.jspdf.format = "" === ja ? "a4" : ja;
                a.jspdf.orientation = "" === ca ? "w" : ca
            }
            if (null == g.doc && (g.doc = new jsPDF(a.jspdf.orientation, a.jspdf.unit, a.jspdf.format), g.wScaleFactor = 1, g.hScaleFactor = 1, "function" === typeof a.jspdf.onDocCreated)) a.jspdf.onDocCreated(g.doc);
            !0 === g.outputImages && (g.images = {});
            "undefined" !== typeof g.images && (d(B).filter(function() { return I(d(this)) }).each(function() {
                var b =
                    0;
                G = [];
                !1 === a.exportHiddenCells && (K = d(this).find("tr, th, td").filter(":hidden"), U = 0 < K.length);
                r = y(d(this));
                w = C(d(this));
                d(w).each(function() {
                    E(this, "td,th", r.length + b, r.length + w.length, function(a) { xa(a, d(a).children(), g) });
                    b++
                })
            }), r = [], w = []);
            Ka(g, function() {
                d(B).filter(function() { return I(d(this)) }).each(function() {
                    var b;
                    n = 0;
                    G = [];
                    !1 === a.exportHiddenCells && (K = d(this).find("tr, th, td").filter(":hidden"), U = 0 < K.length);
                    S = R(this);
                    g.columns = [];
                    g.rows = [];
                    g.teCells = {};
                    if ("function" === typeof g.onTable &&
                        !1 === g.onTable(d(this), a)) return !0;
                    a.jspdf.autotable.tableExport = null;
                    var c = d.extend(!0, {}, a.jspdf.autotable);
                    a.jspdf.autotable.tableExport = g;
                    c.margin = {};
                    d.extend(!0, c.margin, a.jspdf.margins);
                    c.tableExport = g;
                    "function" !== typeof c.beforePageContent && (c.beforePageContent = function(a) {
                        if (1 === a.pageCount) {
                            var b = a.table.rows.concat(a.table.headerRow);
                            d.each(b, function() { 0 < this.height && (this.height += (2 - 1.15) / 2 * this.styles.fontSize, a.table.height += (2 - 1.15) / 2 * this.styles.fontSize) })
                        }
                    });
                    "function" !== typeof c.createdHeaderCell &&
                        (c.createdHeaderCell = function(a, b) {
                            a.styles = d.extend({}, b.row.styles);
                            if ("undefined" !== typeof g.columns[b.column.dataKey]) {
                                var e = g.columns[b.column.dataKey];
                                if ("undefined" !== typeof e.rect) {
                                    a.contentWidth = e.rect.width;
                                    if ("undefined" === typeof g.heightRatio || 0 === g.heightRatio) {
                                        var f = b.row.raw[b.column.dataKey].rowspan ? b.row.raw[b.column.dataKey].rect.height / b.row.raw[b.column.dataKey].rowspan : b.row.raw[b.column.dataKey].rect.height;
                                        g.heightRatio = a.styles.rowHeight / f
                                    }
                                    f = b.row.raw[b.column.dataKey].rect.height *
                                        g.heightRatio;
                                    f > a.styles.rowHeight && (a.styles.rowHeight = f)
                                }
                                a.styles.halign = "inherit" === c.headerStyles.halign ? "center" : c.headerStyles.halign;
                                a.styles.valign = c.headerStyles.valign;
                                "undefined" !== typeof e.style && !0 !== e.style.hidden && ("inherit" === c.headerStyles.halign && (a.styles.halign = e.style.align), "inherit" === c.styles.fillColor && (a.styles.fillColor = e.style.bcolor), "inherit" === c.styles.textColor && (a.styles.textColor = e.style.color), "inherit" === c.styles.fontStyle && (a.styles.fontStyle = e.style.fstyle))
                            }
                        });
                    "function" !== typeof c.createdCell && (c.createdCell = function(a, b) {
                        b = g.teCells[b.row.index + ":" + b.column.dataKey];
                        a.styles.halign = "inherit" === c.styles.halign ? "center" : c.styles.halign;
                        a.styles.valign = c.styles.valign;
                        "undefined" !== typeof b && "undefined" !== typeof b.style && !0 !== b.style.hidden && ("inherit" === c.styles.halign && (a.styles.halign = b.style.align), "inherit" === c.styles.fillColor && (a.styles.fillColor = b.style.bcolor), "inherit" === c.styles.textColor && (a.styles.textColor = b.style.color), "inherit" === c.styles.fontStyle &&
                            (a.styles.fontStyle = b.style.fstyle))
                    });
                    "function" !== typeof c.drawHeaderCell && (c.drawHeaderCell = function(a, b) { var d = g.columns[b.column.dataKey]; return (!0 !== d.style.hasOwnProperty("hidden") || !0 !== d.style.hidden) && 0 <= d.rowIndex ? wa(a, b, d) : !1 });
                    "function" !== typeof c.drawCell && (c.drawCell = function(a, b) {
                        var c = g.teCells[b.row.index + ":" + b.column.dataKey];
                        if (!0 !== ("undefined" !== typeof c && c.isCanvas)) wa(a, b, c) && (g.doc.rect(a.x, a.y, a.width, a.height, a.styles.fillStyle), "undefined" === typeof c || "undefined" !== typeof c.hasUserDefText &&
                            !0 === c.hasUserDefText || "undefined" === typeof c.elements || !c.elements.length ? Aa(a, {}, g) : (b = a.height / c.rect.height, b > g.hScaleFactor && (g.hScaleFactor = b), g.wScaleFactor = a.width / c.rect.width, b = a.textPos.y, za(a, c.elements, g), a.textPos.y = b, Aa(a, c.elements, g)));
                        else {
                            c = c.elements[0];
                            var e = d(c).attr("data-tableexport-canvas"),
                                f = c.getBoundingClientRect();
                            a.width = f.width * g.wScaleFactor;
                            a.height = f.height * g.hScaleFactor;
                            b.row.height = a.height;
                            ua(a, c, e, g)
                        }
                        return !1
                    });
                    g.headerrows = [];
                    r = y(d(this));
                    d(r).each(function() {
                        b =
                            0;
                        g.headerrows[n] = [];
                        E(this, "th,td", n, r.length, function(a, c, d) {
                            var e = Ca(a);
                            e.title = D(a, c, d);
                            e.key = b++;
                            e.rowIndex = n;
                            g.headerrows[n].push(e)
                        });
                        n++
                    });
                    if (0 < n)
                        for (var e = n - 1; 0 <= e;) d.each(g.headerrows[e], function() {
                            var a = this;
                            0 < e && null === this.rect && (a = g.headerrows[e - 1][this.key]);
                            null !== a && 0 <= a.rowIndex && (!0 !== a.style.hasOwnProperty("hidden") || !0 !== a.style.hidden) && g.columns.push(a)
                        }), e = 0 < g.columns.length ? -1 : e - 1;
                    var k = 0;
                    w = [];
                    w = C(d(this));
                    d(w).each(function() {
                        var a = [];
                        b = 0;
                        E(this, "td,th", n, r.length + w.length,
                            function(c, e, f) {
                                if ("undefined" === typeof g.columns[b]) {
                                    var h = { title: "", key: b, style: { hidden: !0 } };
                                    g.columns.push(h)
                                }
                                a.push(D(c, e, f));
                                "undefined" !== typeof c && null !== c ? (h = Ca(c), h.isCanvas = c.hasAttribute("data-tableexport-canvas"), h.elements = h.isCanvas ? d(c) : d(c).children(), "undefined" !== typeof d(c).data("teUserDefText") && (h.hasUserDefText = !0)) : (h = d.extend(!0, {}, g.teCells[k + ":" + (b - 1)]), h.colspan = -1);
                                g.teCells[k + ":" + b++] = h
                            });
                        a.length && (g.rows.push(a), k++);
                        n++
                    });
                    if ("function" === typeof g.onBeforeAutotable) g.onBeforeAutotable(d(this),
                        g.columns, g.rows, c);
                    g.doc.autoTable(g.columns, g.rows, c);
                    if ("function" === typeof g.onAfterAutotable) g.onAfterAutotable(d(this), c);
                    a.jspdf.autotable.startY = g.doc.autoTableEndPosY() + c.margin.top
                });
                va(g.doc, "undefined" !== typeof g.images && !1 === jQuery.isEmptyObject(g.images));
                "undefined" !== typeof g.headerrows && (g.headerrows.length = 0);
                "undefined" !== typeof g.columns && (g.columns.length = 0);
                "undefined" !== typeof g.rows && (g.rows.length = 0);
                delete g.doc;
                g.doc = null
            })
        }
        if ("function" === typeof a.onTableExportEnd) a.onTableExportEnd();
        return this
    }
})(jQuery);