/*! cn.tee3.avd-2.4.0.0 2017-04-26 10:23:37 */

function base64encode(a) {
	var b, c, d, e, f, g;
	for (d = a.length, c = 0, b = ""; c < d;) {
		if (e = 255 & a.charCodeAt(c++), c == d) {
			b += base64EncodeChars.charAt(e >> 2), b += base64EncodeChars.charAt((3 & e) << 4), b += "==";
			break
		}
		if (f = a.charCodeAt(c++), c == d) {
			b += base64EncodeChars.charAt(e >> 2), b += base64EncodeChars.charAt((3 & e) << 4 | (240 & f) >> 4), b += base64EncodeChars.charAt((15 & f) << 2), b += "=";
			break
		}
		g = a.charCodeAt(c++), b += base64EncodeChars.charAt(e >> 2), b += base64EncodeChars.charAt((3 & e) << 4 | (240 & f) >> 4), b += base64EncodeChars.charAt((15 & f) << 2 | (192 & g) >> 6), b += base64EncodeChars.charAt(63 & g)
	}
	return b
}
function base64decode(a) {
	var b, c, d, e, f, g, h;
	for (g = a.length, f = 0, h = ""; f < g;) {
		do b = base64DecodeChars[255 & a.charCodeAt(f++)];
		while (f < g && b == -1);
		if (b == -1) break;
		do c = base64DecodeChars[255 & a.charCodeAt(f++)];
		while (f < g && c == -1);
		if (c == -1) break;
		h += String.fromCharCode(b << 2 | (48 & c) >> 4);
		do {
			if (d = 255 & a.charCodeAt(f++), 61 == d) return h;
			d = base64DecodeChars[d]
		} while (f < g && d == -1);
		if (d == -1) break;
		h += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
		do {
			if (e = 255 & a.charCodeAt(f++), 61 == e) return h;
			e = base64DecodeChars[e]
		} while (f < g && e == -1);
		if (e == -1) break;
		h += String.fromCharCode((3 & d) << 6 | e)
	}
	return h
}
function utf16to8(a) {
	var b, c, d, e;
	for (b = "", d = a.length, c = 0; c < d; c++) e = a.charCodeAt(c), e >= 1 && e <= 127 ? b += a.charAt(c) : e > 2047 ? (b += String.fromCharCode(224 | e >> 12 & 15), b += String.fromCharCode(128 | e >> 6 & 63), b += String.fromCharCode(128 | e >> 0 & 63)) : (b += String.fromCharCode(192 | e >> 6 & 31), b += String.fromCharCode(128 | e >> 0 & 63));
	return b
}
function utf8to16(a) {
	var b, c, d, e, f, g;
	for (b = "", d = a.length, c = 0; c < d;) switch (e = a.charCodeAt(c++), e >> 4) {
	case 0:
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
	case 6:
	case 7:
		b += a.charAt(c - 1);
		break;
	case 12:
	case 13:
		f = a.charCodeAt(c++), b += String.fromCharCode((31 & e) << 6 | 63 & f);
		break;
	case 14:
		f = a.charCodeAt(c++), g = a.charCodeAt(c++), b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | (63 & g) << 0)
	}
	return b
}
function doit() {
	var a = document.f;
	a.output.value = base64encode(utf16to8(a.source.value)), a.decode.value = utf8to16(base64decode(a.output.value))
}
function trace(a) {
	"\n" == a[a.length - 1] && (a = a.substring(0, a.length - 1)), console.log((performance.now() / 1e3).toFixed(3) + ": " + a)
}
function maybeFixConfiguration(a) {
	if (a) for (var b = 0; b < a.iceServers.length; b++) a.iceServers[b].hasOwnProperty("urls") && (a.iceServers[b].url = a.iceServers[b].urls, delete a.iceServers[b].urls)
}
function getPlugin() {
	var a = document.getElementById(WebRTCPlugin.pluginInfo.pluginId);
	return a.logSeverity = "info", a
}
function mergeConstraints(a, b) {
	var c = a;
	for (var d in b) {
		var e = d.substring(0, 1).toUpperCase() + d.substring(1);
		"offerToReceiveAudio" == d || "offerToReceiveVideo" == d ? c.mandatory[e] = b[d] : c.optional[e] = b[d]
	}
	return c
}
function SdpSerializer(a) {
	function b(a) {
		if (i[a]) if (q == "a=mid:" + a) {
			var b = o[p - 1];
			b && (i[a].direction = b.split("a=")[1], i[a].attributes.pop(1)), n = !0, i[a]["a=mid:" + a] = {
				line: q,
				attributes: []
			}
		} else if (n) if (0 == q.indexOf("a=crypto:")) i[a].crypto[q.split("AES_CM_128_HMAC_SHA1_")[1].split(" ")[0]] = q;
		else if (0 == q.indexOf("a=rtpmap:")) {
			var c = q.split("a=rtpmap:")[1].split(" ");
			i[a].payload[c[0]] = c[1], function b() {
				q = o[p + 1], q && q.indexOf("a=rtpmap:") == -1 && q.indexOf("m=") == -1 && (q.indexOf("a=ssrc") == -1 && (i[a].payload[c[0]] += "\r\n" + q), q.indexOf("a=ssrc") != -1 && i[a].ssrc.push(q), p++, b())
			}()
		} else i[a]["a=mid:" + a].attributes.push(q);
		else i[a].attributes.push(q);
		else if (i[a] = {
			line: q,
			attributes: [],
			payload: {},
			ssrc: [],
			crypto: {}
		}, q.indexOf("RTP/SAVPF") != -1) for (var d = q.split("RTP/SAVPF ")[1].split(" "), e = 0; e < d.length; e++) i[a].payload[d[e]] = ""
	}
	function c(a) {
		if (i[a]) {
			for (var b = [], c = "", d = 0; d < i[a].ssrc.length; d++) {
				var e = i[a].ssrc[d];
				"" == c ? c = e : c += "\r\n" + e, e.indexOf("cname:") != -1 && b.push([]), b.length > 0 && b[b.length - 1].push(e)
			}
			i[a].ssrc = b, i[a].ssrcStr = c
		}
	}
	function d(a) {
		i[a] && delete i[a];
		for (var b = 0; b < j.length; b++) if (j[b].indexOf("a=group") != -1) {
			var c = j[b].split("a=group:BUNDLE ")[1].split(" ");
			j[b] = "a=group:BUNDLE";
			for (var d = 0; d < c.length; d++) c[d] != a && (j[b] += " " + c[d])
		}
	}
	function e(a, b) {
		if (i[b] && i[b].line.indexOf(a) != -1 && (i[b].payload[a] && delete i[b].payload[a], i[b].line.indexOf("RTP/SAVPF") != -1)) {
			for (var c = i[b].line.split("RTP/SAVPF ")[1].split(" "), d = 0; d < c.length; d++) c[d] == a && delete c[d];
			c = swap(c), i[b].line = i[b].line.split("RTP/SAVPF ")[0] + "RTP/SAVPF " + c.join(" ")
		}
	}
	function f(a, b, c) {
		if (i[c] && i[c].line.indexOf(a) != -1 && i[c].line.indexOf("RTP/SAVPF") != -1) {
			for (var d = i[c].line.split("RTP/SAVPF ")[1].split(" "), e = [], f = 0; f < d.length; f++) d[f] == a && (e[b] = d[f], delete d[f]);
			for (var f = 0; f < d.length; f++) f < b && (e[f] = d[f]), f >= b && (e[f + 1] = d[f]);
			e = swap(e), i[c].line = i[c].line.split("RTP/SAVPF ")[0] + "RTP/SAVPF " + e.join(" ")
		}
	}
	function g(a, b) {
		if (!i[b]) return a;
		a += i[b].line + "\r\n";
		for (var c = 0; c < i[b].attributes.length; c++) a += i[b].attributes[c] + "\r\n";
		i[b].direction && (a += "a=" + i[b].direction + "\r\n"), a += "a=mid:" + b + "\r\n";
		for (var c = 0; c < i[b]["a=mid:" + b].attributes.length; c++) i[b]["a=mid:" + b].attributes[c] && (a += i[b]["a=mid:" + b].attributes[c] + "\r\n");
		for (var d in i[b].crypto) a += i[b].crypto[d] + "\r\n";
		if (i[b].line.indexOf("RTP/SAVPF") != -1) for (var e = i[b].line.split("RTP/SAVPF ")[1].split(" "), f = 0; f < e.length; f++) {
			var g = e[f];
			g && (a += "a=rtpmap:" + g + " " + i[b].payload[g] + "\r\n")
		}
		for (var h = 0; h < i[b].ssrc.length; h++) for (var j = i[b].ssrc[h], k = 0; k < j.length; k++) a += j[k] + "\r\n";
		return a
	}
	function h(a) {
		return {
			mLine: a,
			payload: function(a) {
				return i[this.mLine] && i[this.mLine].payload[a] || log.error(a, "doesn'nt exits."), {
					payload: a,
					mLine: this.mLine,
					newLine: function(a) {
						i[this.mLine].payload[this.payload] += "\r\n" + a
					},
					remove: function() {
						e(this.payload, this.mLine)
					},
					order: function(a) {
						f(this.payload, a, this.mLine)
					}
				}
			},
			remove: function() {
				d(this.mLine)
			},
			isRejected: function() {
				var a = i[this.mLine].line.split("m=" + this.mLine)[1];
				return 0 == parseInt(a)
			},
			crypto: function(a) {
				var b = i[this.mLine].crypto[a];
				return {
					mLine: this.mLine,
					remove: function() {
						b && delete i[this.mLine].crypto[a]
					},
					newLine: function(a) {
						i[this.mLine].crypto[a.split("AES_CM_128_HMAC_SHA1_")[1].split(" ")[0]] = a
					}
				}
			},
			track: function(b) {
				var c = i[a].ssrc[b];
				return {
					ssrc: c,
					set: function(a) {
						i[this.mLine].ssrc[b] = a
					},
					mLine: this.mLine,
					remove: function() {
						c && (delete i[a].ssrc[b], i[a].ssrc = swap(i[a].ssrc))
					}
				}
			}
		}
	}
	for (var i = {}, j = [], k = !1, l = !1, m = !1, n = !1, o = a.split("\r\n"), p = 0; p < o.length; p++) {
		var q = o[p];
		k || 0 == q.indexOf("m=audio") ? (k = !0, b("audio"), q = o[p + 1], q && 0 == q.indexOf("m=video") && (n = k = !1)) : l || 0 == q.indexOf("m=video") ? (l = !0, b("video"), q = o[p + 1], q && 0 == q.indexOf("m=application") && (n = l = !1)) : m || 0 == q.indexOf("m=application") ? (m = !0, b("data")) : j.push(q)
	}!
	function() {
		c("audio"), c("video"), c("data")
	}(), this.deserialize = function() {
		for (var a = "", b = 0; b < j.length; b++) a += j[b] + "\r\n";
		return a = g(a, "audio"), a = g(a, "video"), a = g(a, "data")
	}, this.audio = h("audio"), this.video = h("video"), this.data = h("data"), this._inner = i, log.debug("Serialized SDP", JSON.stringify(this._inner, null, "\t"))
}
function swap(a) {
	for (var b = [], c = 0; c < a.length; c++) a[c] && b.push(a[c]);
	return b
}
function EventEmitter() {
	this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
}
function isFunction(a) {
	return "function" == typeof a
}
function isNumber(a) {
	return "number" == typeof a
}
function isObject(a) {
	return "object" == typeof a && null !== a
}
function isUndefined(a) {
	return void 0 === a
}
function getRandomNum(a, b) {
	var c = b - a,
		d = Math.random();
	return a + Math.round(d * c)
}
function resizeVideo(a, b, c) {
	doResizeVideo(a, b, c, !1)
}
function resizeRealVideo(a, b, c) {
	doResizeVideo(a, b, c, !0)
}
function doResizeVideo(a, b, c, d) {
	b || (b = window.innerWidth), c || (c = window.innerHeight), a.addEventListener("loadedmetadata", function(e) {
		var f = this.videoWidth,
			g = this.videoHeight;
		positionLarge(a, f, g, b, c, d)
	})
}
function positionLarge(a, b, c, d, e, f) {
	var g;
	g = f ? getCameraRealVideoSize(b, c, d, e) : getCameraVideoSize(b, c, d, e);
	var h = g[0],
		i = g[1],
		j = getCameraVideoPosition(h, i, d, e),
		k = j[0],
		l = j[1];
	f ? positionRealVideo(a, h, i, k, l) : positionVideo(a, h, i, k, l)
}
function getCameraVideoSize(a, b, c, d) {
	var e = a / b,
		c = Math.max(a, c),
		d = Math.max(b, d);
	return c / e < d && (d = d, c = d * e), d * e < c && (c = c, d = c / e), [c, d]
}
function getCameraRealVideoSize(a, b, c, d) {
	var e = a / b,
		f = Math.max(a, c),
		g = Math.max(b, d);
	if (f >= a && g >= b) {
		var h = c / d;
		e > h ? (c = c, d = c / e) : (d = d, c = d * e)
	} else {
		var c = f,
			d = g;
		c / e > d && (d = d, c = d * e), d * e > c && (c = c, d = c / e)
	}
	return [c, d]
}
function getCameraVideoPosition(a, b, c, d) {
	var e = (c - a) / 2,
		f = (d - b) / 2;
	return [e, f]
}
function positionVideo(a, b, c, d, e) {
	a.setAttribute("width", b), a.setAttribute("height", c)
}
function positionRealVideo(a, b, c, d, e) {
	a.setAttribute("width", b), a.setAttribute("height", c);
	var f = a.parentNode;
	f.style.top = e + "px", f.style.bottom = e + "px", f.style.left = d + "px", f.style.right = d + "px"
}
function fullScreenInit() {
	document.cancelFullScreen = document.webkitCancelFullScreen || document.mozCancelFullScreen || document.cancelFullScreen, document.body.requestFullScreen = document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen || document.body.requestFullScreen, document.onfullscreenchange = document.onwebkitfullscreenchange = document.onmozfullscreenchange = displayFullScreenStatus, displayFullScreenStatus()
}
function doFullScreen(a, b) {
	a.requestFullScreen = a.webkitRequestFullScreen || a.mozRequestFullScreen || a.requestFullScreen, isFullScreen() && b.target !== a || fullScreenElement() === a ? document.cancelFullScreen() : b.target === a ? a.requestFullScreen() : a.requestFullScreen()
}
function displayFullScreenStatus() {
	isFullScreen()
}
function isFullScreen() {
	return !!(document.webkitIsFullScreen || document.mozFullScreen || document.isFullScreen)
}
function fullScreenElement() {
	return document.webkitFullScreenElement || document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.fullScreenElement
}
function doFullScreenInIE(a) {
	window.innerWidth ? winWidth = window.innerWidth : document.body && document.body.clientWidth && (winWidth = document.body.clientWidth), window.innerHeight ? winHeight = window.innerHeight : document.body && document.body.clientHeight && (winHeight = document.body.clientHeight), document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth && (winHeight = document.documentElement.clientHeight, winWidth = document.documentElement.clientWidth);
	var b = window.createPopup(),
		c = b.document.body;
	c.style.backgroundColor = "lime", c.style.border = "solid black 1px", c.innerHTML = "在鼠标点击窗口以外区域时自动关闭";
	var d = b.document.createElement("object"),
		e = Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window;
	if (e) {
		var f = b.document.createElement("param");
		f.setAttribute("name", "windowless"), f.setAttribute("value", !0), d.appendChild(f), d.setAttribute("classid", "CLSID:7FD49E23-C8D7-4C4F-93A1-F7EACFA1EC53")
	} else d.setAttribute("type", "application/avd-plugin");
	d.setAttribute("id", "fullScreen"), d.setAttribute("width", winWidth), d.setAttribute("height", winHeight), d.src = a, c.appendChild(d), b.show(0, 0, winWidth, winHeight, document.body)
}
function getBrowserType() {
	return RTCBrowserType.RTC_BROWSER_CHROME
}
function PeerStats() {
	this.ssrc2Loss = {}, this.ssrc2resolution = {}, this.ssrc2bitrate = {}, this.ssrc2AudioLevel = {}
}
function formatAudioLevel(a) {
	return Math.min(Math.max(a, 0), 1)
}
function calculatePacketLoss(a, b) {
	return !b || b <= 0 || !a || a <= 0 ? 0 : Math.round(a / b * 100)
}
function getStatValue(a, b) {
	if (!keyMap[getBrowserType()][b]) throw "The property isn't supported!";
	var c = keyMap[getBrowserType()][b];
	return getBrowserType() == RTCBrowserType.RTC_BROWSER_CHROME ? a.stat(c) : a[c]
}
function getIP(a) {
	return a.substring(0, a.lastIndexOf(":"))
}
function getPort(a) {
	return a.substring(a.lastIndexOf(":") + 1, a.length)
}
function getStringFromArray(a) {
	for (var b = "", c = 0; c < a.length; c++) b += (0 === c ? "" : ", ") + a[c];
	return b
}
function ConnectionInfoCollector(a, b) {
	this.peerconnection = a, this.statsInterval = b, this.currentStatsReport = null, this.baselineStatsReport = null, this.statsIntervalId = null, this.jid = 1, this.jid2stats = {}, this.resolution
}
function AudioLevel(a, b) {
	this.peerconnection = a, this.audioLevelsIntervalMilis = b, this.audioLevelsIntervalId = null, this.baselineAudioLevelsReport = null, this.currentAudioLevelsReport = null
}
function timeDomainDataToAudioLevel(a) {
	for (var b = 0, c = a.length, d = 0; d < c; d++) b < a[d] && (b = a[d]);
	return parseFloat(((b - 127) / 128).toFixed(3))
}
function animateLevel(a, b) {
	var c = 0,
		d = b - a;
	return c = d > .2 ? b - .2 : d < -.4 ? b + .4 : a, parseFloat(c.toFixed(3))
}
function LocalStatsCollector(a, b, c) {
	this.stream = a, this.intervalId = null, this.intervalMilis = b, this.audioLevel = 0, this.callback = c
}
function isAndroid() {
	var a = navigator.userAgent.indexOf("Android") != -1;
	return a
}
function getPreviousResolution(a) {
	if (!Resolutions[a]) return null;
	var b = Resolutions[a].order,
		c = null,
		d = null;
	for (var e in Resolutions) {
		var f = Resolutions[e];
		(null == c || c.order < f.order && f.order < b) && (d = e, c = f)
	}
	return d
}
function getConstraints(a, b) {
	var c = {
		audio: !1,
		video: !1
	};
	return a && (c.audio = {
		mandatory: {},
		optional: []
	}), b && (c.video = {
		mandatory: {},
		optional: []
	}), c.audio && (c.audio.optional.push({
		googEchoCancellation: !0
	}, {
		googAutoGainControl: !0
	}, {
		googNoiseSuppression: !0
	}, {
		googHighpassFilter: !0
	}, {
		googNoisesuppression2: !0
	}, {
		googEchoCancellation2: !0
	}, {
		googAutoGainControl2: !0
	}), a.id && (c.audio.mandatory.sourceId = a.id)), c.video && (c.video.optional.push({
		googNoiseReduction: !1
	}), b.id && (c.video.mandatory.sourceId = b.id)), b && (b.resolution && setResolutionConstraints(c, b.resolution), b.frameRate && setFrameRateConstraints(c, b.frameRate)), c
}
function setResolutionConstraints(a, b) {
	b && !a.video && (a.video = {
		mandatory: {},
		optional: []
	}), b && (a.video.mandatory.minWidth = b.width, a.video.mandatory.minHeight = b.height, currentVideoParameter.videoWidth = b.width, currentVideoParameter.videoHeight = b.height), a.video.mandatory.minWidth && (a.video.mandatory.maxWidth = a.video.mandatory.minWidth), a.video.mandatory.minHeight && (a.video.mandatory.maxHeight = a.video.mandatory.minHeight)
}
function setFrameRateConstraints(a, b) {
	b && !a.video && (a.video = {
		mandatory: {},
		optional: []
	}), b && (a.video.mandatory.minFrameRate = b, a.video.mandatory.maxFrameRate = b, currentVideoParameter.frameRate = b)
}
function obtainUserMedia(a, b, c, d) {
	"firefox" == webrtcDetectedBrowser ? null != a && null != b ? getUserMediaWithConstraints(a, !1, function(a) {
		getUserMediaWithConstraints(!1, b, function(b) {
			var d = handleLocalStream({
				audioStream: a,
				videoStream: b
			});
			c(d)
		}, function(a) {
			d(a)
		})
	}, function(a) {
		d(a)
	}) : null != a && null == b ? getUserMediaWithConstraints(a, !1, function(a) {
		var b = handleLocalStream({
			audioStream: a,
			videoStream: null
		});
		c(b)
	}, function(a) {
		d(a)
	}) : null == a && null != b && getUserMediaWithConstraints(!1, b, function(a) {
		var b = handleLocalStream({
			audioStream: null,
			videoStream: a
		});
		c(b)
	}, function(a) {
		d(a)
	}) : getUserMediaWithConstraints(a, b, function(a) {
		c(handleLocalStream(a))
	}, function(a) {
		d(a)
	})
}
function getUserMediaWithConstraints(a, b, c, d) {
	var e = getConstraints(a, b);
	try {
		getUserMedia(e, function(a) {
			c(a)
		}, function(a) {
			var b, c = ModuleBase.use(ModulesEnum.error);
			b = new c("PermissionDeniedError" == a.name ? ErrorConstant.navigatorUserMediaError_permissionDenied : "ConstraintNotSatisfiedError" == a.name ? ErrorConstant.navigatorUserMediaError_constraintNotSatisfied : "TrackStartError" == a.name ? ErrorConstant.navigatorUserMediaError_trackStartError : ErrorConstant.navigatorUserMediaError_unknown), d && d(b)
		})
	} catch (a) {
		var f = ModuleBase.use(ModulesEnum.error),
			g = new f(ErrorConstant.navigatorUserMediaError_unknown);
		d && d(g)
	}
}
function handleLocalStream(a) {
	var b, c;
	if ("chrome" == webrtcDetectedBrowser) {
		if (b = new webkitMediaStream, c = new webkitMediaStream, a) {
			for (var d = a.getAudioTracks(), e = 0; e < d.length; e++) b.addTrack(d[e]);
			var f = a.getVideoTracks();
			for (e = 0; e < f.length; e++) c.addTrack(f[e])
		}
	} else if ("Internet Explorer" == webrtcDetectedBrowser) {
		if (b = null, c = null, a) {
			var d = a.getAudioTracks();
			if (d.length > 0) {
				var g = a.clone();
				g.removeTrack(d[0]), c = g
			} else c = a;
			var f = a.getVideoTracks();
			if (f.length > 0) {
				var g = a.clone();
				g.removeTrack(f[0]), b = g
			} else b = a
		}
	} else "firefox" == webrtcDetectedBrowser && (b = a.audioStream, c = a.videoStream);
	return {
		audioStream: b,
		videoStream: c
	}
}
function getAllAudioVideoDevices(a, b) {
	if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources && (navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)), !navigator.enumerateDevices && navigator.mediaDevices.enumerateDevices && (navigator.enumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator)), !navigator.enumerateDevices) return void b(null, "Neither navigator.mediaDevices.enumerateDevices NOR MediaStreamTrack.getSources are available.");
	var c = [],
		d = [],
		e = [],
		f = [],
		g = [],
		h = [];
	navigator.enumerateDevices(function(b) {
		b.forEach(function(a) {
			var b = {};
			for (var i in a) b[i] = a[i];
			var j;
			c.forEach(function(a) {
				a.id === b.id && (j = !0)
			}), j || ("audio" === b.kind && (b.kind = "audioinput"), "video" === b.kind && (b.kind = "videoinput"), b.deviceId || (b.deviceId = b.id), b.id || (b.id = b.deviceId), b.label || (b.label = "Please invoke getUserMedia once."), "audioinput" !== b.kind && "audio" !== b.kind || f.push(b), "audiooutput" === b.kind && g.push(b), "videoinput" !== b.kind && "video" !== b.kind || h.push(b), b.kind.indexOf("audio") !== -1 && d.push(b), b.kind.indexOf("video") !== -1 && e.push(b), c.push(b))
		}), a && a({
			allMdiaDevices: c,
			allVideoDevices: e,
			allAudioDevices: d,
			videoInputDevices: h,
			audioInputDevices: f,
			audioOutputDevices: g
		})
	})
}
function captureUserMedia(a, b, c) {
	navigator.mediaDevices.getUserMedia(a).then(b)
}
function saveLog(a, b, c) {
	var d = document.location.protocol,
		e = d + "//" + logAjax.server + "/write?db=" + logAjax.db + "&u=" + logAjax.userName + "&p=" + logAjax.password,
		f = "";
	"undefined" != typeof returnCitySN && (f = returnCitySN.cip);
	var g = (1e3 * (new Date).getTime() * 1e3, ""),
		h = "",
		i = "",
		j = "",
		k = 0;
	room && (room.id && (g = room.id), room.selfUser && (room.selfUser.name && (h = room.selfUser.name), room.selfUser.id && (i = room.selfUser.id))), browserDetect && browserDetect.detect && browserDetect.detect.browser && (browserDetect.detect.browser.name && (j = browserDetect.detect.browser.name), browserDetect.detect.browser.fullVersion && (k = browserDetect.detect.browser.fullVersion));
	var l = 'js_log host_ip="' + f + '",roomId="' + g + '",userName="' + h + '",userId="' + i + '",browserName="' + j + '",browserVersion="' + k + '",level="' + a + '",msg="' + b + '" ';
	$.ajax({
		type: "post",
		url: e,
		timeout: 5e3,
		data: l,
		success: function(a) {},
		error: function(a, b, c) {}
	})
}
function updateSDPFingerPrint(a, b) {
	var c = preferLineSdp(a, "a=", "fingerprint");
	if (null != c && c.length > 0) for (var d = 0; d < c.length; d++) {
		var e = c[d];
		a = a.replace(e, "a=fingerprint:sha-1 " + b)
	}
	return a
}
function updateSDPIceUfrag(a, b) {
	var c = preferLineSdp(a, "a=", "ice-ufrag");
	if (null != c && c.length > 0) for (var d = 0; d < c.length; d++) {
		var e = c[d];
		a = a.replace(e, "a=ice-ufrag:" + b)
	}
	return a
}
function updateSDPIcePwd(a, b) {
	var c = preferLineSdp(a, "a=", "ice-pwd");
	if (null != c && c.length > 0) for (var d = 0; d < c.length; d++) {
		var e = c[d];
		a = a.replace(e, "a=ice-pwd:" + b)
	}
	return a
}
function updateSDPSetup(a, b) {
	var c = preferLineSdp(a, "a=", "setup");
	if (null != c && c.length > 0) for (var d = 0; d < c.length; d++) {
		var e = c[d];
		a = a.replace(e, "a=setup:" + b)
	}
	return a
}
function preferLineSdp(a, b, c) {
	var d = [],
		e = a.split("\r\n"),
		f = findLine(e, b, c);
	if (null != f && f.length > 0) for (var g = 0; g < f.length; g++) d.push(e[f[g]]);
	return d
}
function findLine(a, b, c) {
	return findLineInRange(a, 0, -1, b, c)
}
function findLineInRange(a, b, c, d, e) {
	for (var f = [], g = c !== -1 ? c : a.length, h = b; h < g; ++h) 0 === a[h].indexOf(d) && (e && a[h].toLowerCase().indexOf(e.toLowerCase()) === -1 || f.push(h));
	return f
}
function findLine1(a, b, c) {
	return findLineInRange1(a, 0, -1, b, c)
}
function findLineInRange1(a, b, c, d, e) {
	for (var f = c !== -1 ? c : a.length, g = b; g < f; ++g) if (0 === a[g].indexOf(d) && (!e || a[g].toLowerCase().indexOf(e.toLowerCase()) !== -1)) return g;
	return null
}
function preferBitRate(a, b, c) {
	var d = a.split("\r\n"),
		e = findLine1(d, "m=", c);
	if (null === e) return trace("Failed to add bandwidth line to sdp, as no m-line found"), a;
	var f = findLineInRange1(d, e + 1, -1, "m=");
	null === f && (f = d.length);
	var g = findLineInRange1(d, e + 1, f, "c=");
	if (null === g) return trace("Failed to add bandwidth line to sdp, as no c-line found"), a;
	var h = findLineInRange1(d, g + 1, f, "b=AS");
	h && d.splice(h, 1);
	var i = "b=AS:" + b;
	return d.splice(g + 1, 0, i), a = d.join("\r\n")
}
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
!
function(a, b) {
	function c(a) {
		var b = oa[a] = {};
		return $.each(a.split(ba), function(a, c) {
			b[c] = !0
		}), b
	}
	function d(a, c, d) {
		if (d === b && 1 === a.nodeType) {
			var e = "data-" + c.replace(qa, "-$1").toLowerCase();
			if (d = a.getAttribute(e), "string" == typeof d) {
				try {
					d = "true" === d || "false" !== d && ("null" === d ? null : +d + "" === d ? +d : pa.test(d) ? $.parseJSON(d) : d)
				} catch (a) {}
				$.data(a, c, d)
			} else d = b
		}
		return d
	}
	function e(a) {
		var b;
		for (b in a) if (("data" !== b || !$.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
		return !0
	}
	function f() {
		return !1
	}
	function g() {
		return !0
	}
	function h(a) {
		return !a || !a.parentNode || 11 === a.parentNode.nodeType
	}
	function i(a, b) {
		do a = a[b];
		while (a && 1 !== a.nodeType);
		return a
	}
	function j(a, b, c) {
		if (b = b || 0, $.isFunction(b)) return $.grep(a, function(a, d) {
			var e = !! b.call(a, d, a);
			return e === c
		});
		if (b.nodeType) return $.grep(a, function(a, d) {
			return a === b === c
		});
		if ("string" == typeof b) {
			var d = $.grep(a, function(a) {
				return 1 === a.nodeType
			});
			if (Ka.test(b)) return $.filter(b, d, !c);
			b = $.filter(b, d)
		}
		return $.grep(a, function(a, d) {
			return $.inArray(a, b) >= 0 === c
		})
	}
	function k(a) {
		var b = Na.split("|"),
			c = a.createDocumentFragment();
		if (c.createElement) for (; b.length;) c.createElement(b.pop());
		return c
	}
	function l(a, b) {
		return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
	}
	function m(a, b) {
		if (1 === b.nodeType && $.hasData(a)) {
			var c, d, e, f = $._data(a),
				g = $._data(b, f),
				h = f.events;
			if (h) {
				delete g.handle, g.events = {};
				for (c in h) for (d = 0, e = h[c].length; d < e; d++) $.event.add(b, c, h[c][d])
			}
			g.data && (g.data = $.extend({}, g.data))
		}
	}
	function n(a, b) {
		var c;
		1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), $.support.html5Clone && a.innerHTML && !$.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Xa.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.selected = a.defaultSelected : "input" === c || "textarea" === c ? b.defaultValue = a.defaultValue : "script" === c && b.text !== a.text && (b.text = a.text), b.removeAttribute($.expando))
	}
	function o(a) {
		return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : []
	}
	function p(a) {
		Xa.test(a.type) && (a.defaultChecked = a.checked)
	}
	function q(a, b) {
		if (b in a) return b;
		for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = rb.length; e--;) if (b = rb[e] + c, b in a) return b;
		return d
	}
	function r(a, b) {
		return a = b || a, "none" === $.css(a, "display") || !$.contains(a.ownerDocument, a)
	}
	function s(a, b) {
		for (var c, d, e = [], f = 0, g = a.length; f < g; f++) c = a[f], c.style && (e[f] = $._data(c, "olddisplay"), b ? (!e[f] && "none" === c.style.display && (c.style.display = ""), "" === c.style.display && r(c) && (e[f] = $._data(c, "olddisplay", w(c.nodeName)))) : (d = cb(c, "display"), !e[f] && "none" !== d && $._data(c, "olddisplay", d)));
		for (f = 0; f < g; f++) c = a[f], c.style && (b && "none" !== c.style.display && "" !== c.style.display || (c.style.display = b ? e[f] || "" : "none"));
		return a
	}
	function t(a, b, c) {
		var d = kb.exec(b);
		return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
	}
	function u(a, b, c, d) {
		for (var e = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, f = 0; e < 4; e += 2)"margin" === c && (f += $.css(a, c + qb[e], !0)), d ? ("content" === c && (f -= parseFloat(cb(a, "padding" + qb[e])) || 0), "margin" !== c && (f -= parseFloat(cb(a, "border" + qb[e] + "Width")) || 0)) : (f += parseFloat(cb(a, "padding" + qb[e])) || 0, "padding" !== c && (f += parseFloat(cb(a, "border" + qb[e] + "Width")) || 0));
		return f
	}
	function v(a, b, c) {
		var d = "width" === b ? a.offsetWidth : a.offsetHeight,
			e = !0,
			f = $.support.boxSizing && "border-box" === $.css(a, "boxSizing");
		if (d <= 0 || null == d) {
			if (d = cb(a, b), (d < 0 || null == d) && (d = a.style[b]), lb.test(d)) return d;
			e = f && ($.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0
		}
		return d + u(a, b, c || (f ? "border" : "content"), e) + "px"
	}
	function w(a) {
		if (nb[a]) return nb[a];
		var b = $("<" + a + ">").appendTo(P.body),
			c = b.css("display");
		return b.remove(), "none" !== c && "" !== c || (db = P.body.appendChild(db || $.extend(P.createElement("iframe"), {
			frameBorder: 0,
			width: 0,
			height: 0
		})), eb && db.createElement || (eb = (db.contentWindow || db.contentDocument).document, eb.write("<!doctype html><html><body>"), eb.close()), b = eb.body.appendChild(eb.createElement(a)), c = cb(b, "display"), P.body.removeChild(db)), nb[a] = c, c
	}
	function x(a, b, c, d) {
		var e;
		if ($.isArray(b)) $.each(b, function(b, e) {
			c || ub.test(a) ? d(a, e) : x(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
		});
		else if (c || "object" !== $.type(b)) d(a, b);
		else for (e in b) x(a + "[" + e + "]", b[e], c, d)
	}
	function y(a) {
		return function(b, c) {
			"string" != typeof b && (c = b, b = "*");
			var d, e, f, g = b.toLowerCase().split(ba),
				h = 0,
				i = g.length;
			if ($.isFunction(c)) for (; h < i; h++) d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c)
		}
	}
	function z(a, c, d, e, f, g) {
		f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
		for (var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === Kb; j < k && (l || !h); j++) h = i[j](c, d, e), "string" == typeof h && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = z(a, c, d, e, h, g)));
		return (l || !h) && !g["*"] && (h = z(a, c, d, e, "*", g)), h
	}
	function A(a, c) {
		var d, e, f = $.ajaxSettings.flatOptions || {};
		for (d in c) c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
		e && $.extend(!0, a, e)
	}
	function B(a, c, d) {
		var e, f, g, h, i = a.contents,
			j = a.dataTypes,
			k = a.responseFields;
		for (f in k) f in d && (c[k[f]] = d[f]);
		for (;
		"*" === j[0];) j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
		if (e) for (f in i) if (i[f] && i[f].test(e)) {
			j.unshift(f);
			break
		}
		if (j[0] in d) g = j[0];
		else {
			for (f in d) {
				if (!j[0] || a.converters[f + " " + j[0]]) {
					g = f;
					break
				}
				h || (h = f)
			}
			g = g || h
		}
		if (g) return g !== j[0] && j.unshift(g), d[g]
	}
	function C(a, b) {
		var c, d, e, f, g = a.dataTypes.slice(),
			h = g[0],
			i = {},
			j = 0;
		if (a.dataFilter && (b = a.dataFilter(b, a.dataType)), g[1]) for (c in a.converters) i[c.toLowerCase()] = a.converters[c];
		for (; e = g[++j];) if ("*" !== e) {
			if ("*" !== h && h !== e) {
				if (c = i[h + " " + e] || i["* " + e], !c) for (d in i) if (f = d.split(" "), f[1] === e && (c = i[h + " " + f[0]] || i["* " + f[0]])) {
					c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
					break
				}
				if (c !== !0) if (c && a.throws) b = c(b);
				else try {
					b = c(b)
				} catch (a) {
					return {
						state: "parsererror",
						error: c ? a : "No conversion from " + h + " to " + e
					}
				}
			}
			h = e
		}
		return {
			state: "success",
			data: b
		}
	}
	function D() {
		try {
			return new a.XMLHttpRequest
		} catch (a) {}
	}
	function E() {
		try {
			return new a.ActiveXObject("Microsoft.XMLHTTP")
		} catch (a) {}
	}
	function F() {
		return setTimeout(function() {
			Ub = b
		}, 0), Ub = $.now()
	}
	function G(a, b) {
		$.each(b, function(b, c) {
			for (var d = ($b[b] || []).concat($b["*"]), e = 0, f = d.length; e < f; e++) if (d[e].call(a, b, c)) return
		})
	}
	function H(a, b, c) {
		var d, e = 0,
			f = Zb.length,
			g = $.Deferred().always(function() {
				delete h.elem
			}),
			h = function() {
				for (var b = Ub || F(), c = Math.max(0, i.startTime + i.duration - b), d = 1 - (c / i.duration || 0), e = 0, f = i.tweens.length; e < f; e++) i.tweens[e].run(d);
				return g.notifyWith(a, [i, d, c]), d < 1 && f ? c : (g.resolveWith(a, [i]), !1)
			},
			i = g.promise({
				elem: a,
				props: $.extend({}, b),
				opts: $.extend(!0, {
					specialEasing: {}
				}, c),
				originalProperties: b,
				originalOptions: c,
				startTime: Ub || F(),
				duration: c.duration,
				tweens: [],
				createTween: function(b, c, d) {
					var e = $.Tween(a, i.opts, b, c, i.opts.specialEasing[b] || i.opts.easing);
					return i.tweens.push(e), e
				},
				stop: function(b) {
					for (var c = 0, d = b ? i.tweens.length : 0; c < d; c++) i.tweens[c].run(1);
					return b ? g.resolveWith(a, [i, b]) : g.rejectWith(a, [i, b]), this
				}
			}),
			j = i.props;
		for (I(j, i.opts.specialEasing); e < f; e++) if (d = Zb[e].call(i, a, j, i.opts)) return d;
		return G(i, j), $.isFunction(i.opts.start) && i.opts.start.call(a, i), $.fx.timer($.extend(h, {
			anim: i,
			queue: i.opts.queue,
			elem: a
		})), i.progress(i.opts.progress).done(i.opts.done, i.opts.complete).fail(i.opts.fail).always(i.opts.always)
	}
	function I(a, b) {
		var c, d, e, f, g;
		for (c in a) if (d = $.camelCase(c), e = b[d], f = a[c], $.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = $.cssHooks[d], g && "expand" in g) {
			f = g.expand(f), delete a[d];
			for (c in f) c in a || (a[c] = f[c], b[c] = e)
		} else b[d] = e
	}
	function J(a, b, c) {
		var d, e, f, g, h, i, j, k, l = this,
			m = a.style,
			n = {},
			o = [],
			p = a.nodeType && r(a);
		c.queue || (j = $._queueHooks(a, "fx"), null == j.unqueued && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function() {
			j.unqueued || k()
		}), j.unqueued++, l.always(function() {
			l.always(function() {
				j.unqueued--, $.queue(a, "fx").length || j.empty.fire()
			})
		})), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], "inline" === $.css(a, "display") && "none" === $.css(a, "float") && ($.support.inlineBlockNeedsLayout && "inline" !== w(a.nodeName) ? m.zoom = 1 : m.display = "inline-block")), c.overflow && (m.overflow = "hidden", $.support.shrinkWrapBlocks || l.done(function() {
			m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2]
		}));
		for (d in b) if (f = b[d], Wb.exec(f)) {
			if (delete b[d], f === (p ? "hide" : "show")) continue;
			o.push(d)
		}
		if (g = o.length) for (h = $._data(a, "fxshow") || $._data(a, "fxshow", {}), p ? $(a).show() : l.done(function() {
			$(a).hide()
		}), l.done(function() {
			var b;
			$.removeData(a, "fxshow", !0);
			for (b in n) $.style(a, b, n[b])
		}), d = 0; d < g; d++) e = o[d], i = l.createTween(e, p ? h[e] : 0), n[e] = h[e] || $.style(a, e), e in h || (h[e] = i.start, p && (i.end = i.start, i.start = "width" === e || "height" === e ? 1 : 0))
	}
	function K(a, b, c, d, e) {
		return new K.prototype.init(a, b, c, d, e)
	}
	function L(a, b) {
		var c, d = {
			height: a
		},
			e = 0;
		for (b = b ? 1 : 0; e < 4; e += 2 - b) c = qb[e], d["margin" + c] = d["padding" + c] = a;
		return b && (d.opacity = d.width = a), d
	}
	function M(a) {
		return $.isWindow(a) ? a : 9 === a.nodeType && (a.defaultView || a.parentWindow)
	}
	var N, O, P = a.document,
		Q = a.location,
		R = a.navigator,
		S = a.jQuery,
		T = a.$,
		U = Array.prototype.push,
		V = Array.prototype.slice,
		W = Array.prototype.indexOf,
		X = Object.prototype.toString,
		Y = Object.prototype.hasOwnProperty,
		Z = String.prototype.trim,
		$ = function(a, b) {
			return new $.fn.init(a, b, N)
		},
		_ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
		aa = /\S/,
		ba = /\s+/,
		ca = /^[\s﻿ ]+|[\s﻿ ]+$/g,
		da = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
		ea = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		fa = /^[\],:{}\s]*$/,
		ga = /(?:^|:|,)(?:\s*\[)+/g,
		ha = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		ia = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
		ja = /^-ms-/,
		ka = /-([\da-z])/gi,
		la = function(a, b) {
			return (b + "").toUpperCase()
		},
		ma = function() {
			P.addEventListener ? (P.removeEventListener("DOMContentLoaded", ma, !1), $.ready()) : "complete" === P.readyState && (P.detachEvent("onreadystatechange", ma), $.ready())
		},
		na = {};
	$.fn = $.prototype = {
		constructor: $,
		init: function(a, c, d) {
			var e, f, g;
			if (!a) return this;
			if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
			if ("string" == typeof a) {
				if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : da.exec(a), e && (e[1] || !c)) {
					if (e[1]) return c = c instanceof $ ? c[0] : c, g = c && c.nodeType ? c.ownerDocument || c : P, a = $.parseHTML(e[1], g, !0), ea.test(e[1]) && $.isPlainObject(c) && this.attr.call(a, c, !0), $.merge(this, a);
					if (f = P.getElementById(e[2]), f && f.parentNode) {
						if (f.id !== e[2]) return d.find(a);
						this.length = 1, this[0] = f
					}
					return this.context = P, this.selector = a, this
				}
				return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
			}
			return $.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), $.makeArray(a, this))
		},
		selector: "",
		jquery: "1.8.2",
		length: 0,
		size: function() {
			return this.length
		},
		toArray: function() {
			return V.call(this)
		},
		get: function(a) {
			return null == a ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
		},
		pushStack: function(a, b, c) {
			var d = $.merge(this.constructor(), a);
			return d.prevObject = this, d.context = this.context, "find" === b ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
		},
		each: function(a, b) {
			return $.each(this, a, b)
		},
		ready: function(a) {
			return $.ready.promise().done(a), this
		},
		eq: function(a) {
			return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1)
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		slice: function() {
			return this.pushStack(V.apply(this, arguments), "slice", V.call(arguments).join(","))
		},
		map: function(a) {
			return this.pushStack($.map(this, function(b, c) {
				return a.call(b, c, b)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: U,
		sort: [].sort,
		splice: [].splice
	}, $.fn.init.prototype = $.fn, $.extend = $.fn.extend = function() {
		var a, c, d, e, f, g, h = arguments[0] || {},
			i = 1,
			j = arguments.length,
			k = !1;
		for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" != typeof h && !$.isFunction(h) && (h = {}), j === i && (h = this, --i); i < j; i++) if (null != (a = arguments[i])) for (c in a) d = h[c], e = a[c], h !== e && (k && e && ($.isPlainObject(e) || (f = $.isArray(e))) ? (f ? (f = !1, g = d && $.isArray(d) ? d : []) : g = d && $.isPlainObject(d) ? d : {}, h[c] = $.extend(k, g, e)) : e !== b && (h[c] = e));
		return h
	}, $.extend({
		noConflict: function(b) {
			return a.$ === $ && (a.$ = T), b && a.jQuery === $ && (a.jQuery = S), $
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(a) {
			a ? $.readyWait++ : $.ready(!0);
		},
		ready: function(a) {
			if (a === !0 ? !--$.readyWait : !$.isReady) {
				if (!P.body) return setTimeout($.ready, 1);
				$.isReady = !0, a !== !0 && --$.readyWait > 0 || (O.resolveWith(P, [$]), $.fn.trigger && $(P).trigger("ready").off("ready"))
			}
		},
		isFunction: function(a) {
			return "function" === $.type(a)
		},
		isArray: Array.isArray ||
		function(a) {
			return "array" === $.type(a)
		},
		isWindow: function(a) {
			return null != a && a == a.window
		},
		isNumeric: function(a) {
			return !isNaN(parseFloat(a)) && isFinite(a)
		},
		type: function(a) {
			return null == a ? String(a) : na[X.call(a)] || "object"
		},
		isPlainObject: function(a) {
			if (!a || "object" !== $.type(a) || a.nodeType || $.isWindow(a)) return !1;
			try {
				if (a.constructor && !Y.call(a, "constructor") && !Y.call(a.constructor.prototype, "isPrototypeOf")) return !1
			} catch (a) {
				return !1
			}
			var c;
			for (c in a);
			return c === b || Y.call(a, c)
		},
		isEmptyObject: function(a) {
			var b;
			for (b in a) return !1;
			return !0
		},
		error: function(a) {
			throw new Error(a)
		},
		parseHTML: function(a, b, c) {
			var d;
			return a && "string" == typeof a ? ("boolean" == typeof b && (c = b, b = 0), b = b || P, (d = ea.exec(a)) ? [b.createElement(d[1])] : (d = $.buildFragment([a], b, c ? null : []), $.merge([], (d.cacheable ? $.clone(d.fragment) : d.fragment).childNodes))) : null
		},
		parseJSON: function(b) {
			return b && "string" == typeof b ? (b = $.trim(b), a.JSON && a.JSON.parse ? a.JSON.parse(b) : fa.test(b.replace(ha, "@").replace(ia, "]").replace(ga, "")) ? new Function("return " + b)() : void $.error("Invalid JSON: " + b)) : null
		},
		parseXML: function(c) {
			var d, e;
			if (!c || "string" != typeof c) return null;
			try {
				a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
			} catch (a) {
				d = b
			}
			return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && $.error("Invalid XML: " + c), d
		},
		noop: function() {},
		globalEval: function(b) {
			b && aa.test(b) && (a.execScript ||
			function(b) {
				a.eval.call(a, b)
			})(b)
		},
		camelCase: function(a) {
			return a.replace(ja, "ms-").replace(ka, la)
		},
		nodeName: function(a, b) {
			return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
		},
		each: function(a, c, d) {
			var e, f = 0,
				g = a.length,
				h = g === b || $.isFunction(a);
			if (d) if (h) {
				for (e in a) if (c.apply(a[e], d) === !1) break
			} else for (; f < g && c.apply(a[f++], d) !== !1;);
			else if (h) {
				for (e in a) if (c.call(a[e], e, a[e]) === !1) break
			} else for (; f < g && c.call(a[f], f, a[f++]) !== !1;);
			return a
		},
		trim: Z && !Z.call("﻿ ") ?
		function(a) {
			return null == a ? "" : Z.call(a)
		} : function(a) {
			return null == a ? "" : (a + "").replace(ca, "")
		},
		makeArray: function(a, b) {
			var c, d = b || [];
			return null != a && (c = $.type(a), null == a.length || "string" === c || "function" === c || "regexp" === c || $.isWindow(a) ? U.call(d, a) : $.merge(d, a)), d
		},
		inArray: function(a, b, c) {
			var d;
			if (b) {
				if (W) return W.call(b, a, c);
				for (d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0; c < d; c++) if (c in b && b[c] === a) return c
			}
			return -1
		},
		merge: function(a, c) {
			var d = c.length,
				e = a.length,
				f = 0;
			if ("number" == typeof d) for (; f < d; f++) a[e++] = c[f];
			else for (; c[f] !== b;) a[e++] = c[f++];
			return a.length = e, a
		},
		grep: function(a, b, c) {
			var d, e = [],
				f = 0,
				g = a.length;
			for (c = !! c; f < g; f++) d = !! b(a[f], f), c !== d && e.push(a[f]);
			return e
		},
		map: function(a, c, d) {
			var e, f, g = [],
				h = 0,
				i = a.length,
				j = a instanceof $ || i !== b && "number" == typeof i && (i > 0 && a[0] && a[i - 1] || 0 === i || $.isArray(a));
			if (j) for (; h < i; h++) e = c(a[h], h, d), null != e && (g[g.length] = e);
			else for (f in a) e = c(a[f], f, d), null != e && (g[g.length] = e);
			return g.concat.apply([], g)
		},
		guid: 1,
		proxy: function(a, c) {
			var d, e, f;
			return "string" == typeof c && (d = a[c], c = a, a = d), $.isFunction(a) ? (e = V.call(arguments, 2), f = function() {
				return a.apply(c, e.concat(V.call(arguments)))
			}, f.guid = a.guid = a.guid || $.guid++, f) : b
		},
		access: function(a, c, d, e, f, g, h) {
			var i, j = null == d,
				k = 0,
				l = a.length;
			if (d && "object" == typeof d) {
				for (k in d) $.access(a, c, k, d[k], 1, g, e);
				f = 1
			} else if (e !== b) {
				if (i = h === b && $.isFunction(e), j && (i ? (i = c, c = function(a, b, c) {
					return i.call($(a), c)
				}) : (c.call(a, e), c = null)), c) for (; k < l; k++) c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
				f = 1
			}
			return f ? a : j ? c.call(a) : l ? c(a[0], d) : g
		},
		now: function() {
			return (new Date).getTime()
		}
	}), $.ready.promise = function(b) {
		if (!O) if (O = $.Deferred(), "complete" === P.readyState) setTimeout($.ready, 1);
		else if (P.addEventListener) P.addEventListener("DOMContentLoaded", ma, !1), a.addEventListener("load", $.ready, !1);
		else {
			P.attachEvent("onreadystatechange", ma), a.attachEvent("onload", $.ready);
			var c = !1;
			try {
				c = null == a.frameElement && P.documentElement
			} catch (a) {}
			c && c.doScroll &&
			function a() {
				if (!$.isReady) {
					try {
						c.doScroll("left")
					} catch (b) {
						return setTimeout(a, 50)
					}
					$.ready()
				}
			}()
		}
		return O.promise(b)
	}, $.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
		na["[object " + b + "]"] = b.toLowerCase()
	}), N = $(P);
	var oa = {};
	$.Callbacks = function(a) {
		a = "string" == typeof a ? oa[a] || c(a) : $.extend({}, a);
		var d, e, f, g, h, i, j = [],
			k = !a.once && [],
			l = function(b) {
				for (d = a.memory && b, e = !0, i = g || 0, g = 0, h = j.length, f = !0; j && i < h; i++) if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
					d = !1;
					break
				}
				f = !1, j && (k ? k.length && l(k.shift()) : d ? j = [] : m.disable())
			},
			m = {
				add: function() {
					if (j) {
						var b = j.length;
						!
						function b(c) {
							$.each(c, function(c, d) {
								var e = $.type(d);
								"function" !== e || a.unique && m.has(d) ? d && d.length && "string" !== e && b(d) : j.push(d)
							})
						}(arguments), f ? h = j.length : d && (g = b, l(d))
					}
					return this
				},
				remove: function() {
					return j && $.each(arguments, function(a, b) {
						for (var c;
						(c = $.inArray(b, j, c)) > -1;) j.splice(c, 1), f && (c <= h && h--, c <= i && i--)
					}), this
				},
				has: function(a) {
					return $.inArray(a, j) > -1
				},
				empty: function() {
					return j = [], this
				},
				disable: function() {
					return j = k = d = b, this
				},
				disabled: function() {
					return !j
				},
				lock: function() {
					return k = b, d || m.disable(), this
				},
				locked: function() {
					return !k
				},
				fireWith: function(a, b) {
					return b = b || [], b = [a, b.slice ? b.slice() : b], j && (!e || k) && (f ? k.push(b) : l(b)), this
				},
				fire: function() {
					return m.fireWith(this, arguments), this
				},
				fired: function() {
					return !!e
				}
			};
		return m
	}, $.extend({
		Deferred: function(a) {
			var b = [
				["resolve", "done", $.Callbacks("once memory"), "resolved"],
				["reject", "fail", $.Callbacks("once memory"), "rejected"],
				["notify", "progress", $.Callbacks("memory")]
			],
				c = "pending",
				d = {
					state: function() {
						return c
					},
					always: function() {
						return e.done(arguments).fail(arguments), this
					},
					then: function() {
						var a = arguments;
						return $.Deferred(function(c) {
							$.each(b, function(b, d) {
								var f = d[0],
									g = a[b];
								e[d[1]]($.isFunction(g) ?
								function() {
									var a = g.apply(this, arguments);
									a && $.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a])
								} : c[f])
							}), a = null
						}).promise()
					},
					promise: function(a) {
						return null != a ? $.extend(a, d) : d
					}
				},
				e = {};
			return d.pipe = d.then, $.each(b, function(a, f) {
				var g = f[2],
					h = f[3];
				d[f[1]] = g.add, h && g.add(function() {
					c = h
				}, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith
			}), d.promise(e), a && a.call(e, e), e
		},
		when: function(a) {
			var b, c, d, e = 0,
				f = V.call(arguments),
				g = f.length,
				h = 1 !== g || a && $.isFunction(a.promise) ? g : 0,
				i = 1 === h ? a : $.Deferred(),
				j = function(a, c, d) {
					return function(e) {
						c[a] = this, d[a] = arguments.length > 1 ? V.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
					}
				};
			if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); e < g; e++) f[e] && $.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
			return h || i.resolveWith(d, f), i.promise()
		}
	}), $.support = function() {
		var b, c, d, e, f, g, h, i, j, k, l, m = P.createElement("div");
		if (m.setAttribute("className", "t"), m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = m.getElementsByTagName("*"), d = m.getElementsByTagName("a")[0], d.style.cssText = "top:1px;float:left;opacity:.5", !c || !c.length) return {};
		e = P.createElement("select"), f = e.appendChild(P.createElement("option")), g = m.getElementsByTagName("input")[0], b = {
			leadingWhitespace: 3 === m.firstChild.nodeType,
			tbody: !m.getElementsByTagName("tbody").length,
			htmlSerialize: !! m.getElementsByTagName("link").length,
			style: /top/.test(d.getAttribute("style")),
			hrefNormalized: "/a" === d.getAttribute("href"),
			opacity: /^0.5/.test(d.style.opacity),
			cssFloat: !! d.style.cssFloat,
			checkOn: "on" === g.value,
			optSelected: f.selected,
			getSetAttribute: "t" !== m.className,
			enctype: !! P.createElement("form").enctype,
			html5Clone: "<:nav></:nav>" !== P.createElement("nav").cloneNode(!0).outerHTML,
			boxModel: "CSS1Compat" === P.compatMode,
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			boxSizingReliable: !0,
			pixelPosition: !1
		}, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
		try {
			delete m.test
		} catch (a) {
			b.deleteExpando = !1
		}
		if (!m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", l = function() {
			b.noCloneEvent = !1
		}), m.cloneNode(!0).fireEvent("onclick"), m.detachEvent("onclick", l)), g = P.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), b.radioValue = "t" === g.value, g.setAttribute("checked", "checked"), g.setAttribute("name", "t"), m.appendChild(g), h = P.createDocumentFragment(), h.appendChild(m.lastChild), b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, h.removeChild(g), h.appendChild(m), m.attachEvent) for (j in {
			submit: !0,
			change: !0,
			focusin: !0
		}) i = "on" + j, k = i in m, k || (m.setAttribute(i, "return;"), k = "function" == typeof m[i]), b[j + "Bubbles"] = k;
		return $(function() {
			var c, d, e, f, g = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
				h = P.getElementsByTagName("body")[0];
			h && (c = P.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", h.insertBefore(c, h.firstChild), d = P.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = d.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", k = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = k && 0 === e[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = 4 === d.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== h.offsetTop, a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(d, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(d, null) || {
				width: "4px"
			}).width, f = P.createElement("div"), f.style.cssText = d.style.cssText = g, f.style.marginRight = f.style.width = "0", d.style.width = "1px", d.appendChild(f), b.reliableMarginRight = !parseFloat((a.getComputedStyle(f, null) || {}).marginRight)), "undefined" != typeof d.style.zoom && (d.innerHTML = "", d.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== d.offsetWidth, c.style.zoom = 1), h.removeChild(c), c = d = e = f = null)
		}), h.removeChild(m), c = d = e = f = g = h = m = null, b
	}();
	var pa = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		qa = /([A-Z])/g;
	$.extend({
		cache: {},
		deletedIds: [],
		uuid: 0,
		expando: "jQuery" + ($.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(a) {
			return a = a.nodeType ? $.cache[a[$.expando]] : a[$.expando], !! a && !e(a)
		},
		data: function(a, c, d, e) {
			if ($.acceptData(a)) {
				var f, g, h = $.expando,
					i = "string" == typeof c,
					j = a.nodeType,
					k = j ? $.cache : a,
					l = j ? a[h] : a[h] && h;
				if (l && k[l] && (e || k[l].data) || !i || d !== b) return l || (j ? a[h] = l = $.deletedIds.pop() || $.guid++ : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = $.noop)), "object" != typeof c && "function" != typeof c || (e ? k[l] = $.extend(k[l], c) : k[l].data = $.extend(k[l].data, c)), f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[$.camelCase(c)] = d), i ? (g = f[c], null == g && (g = f[$.camelCase(c)])) : g = f, g
			}
		},
		removeData: function(a, b, c) {
			if ($.acceptData(a)) {
				var d, f, g, h = a.nodeType,
					i = h ? $.cache : a,
					j = h ? a[$.expando] : $.expando;
				if (i[j]) {
					if (b && (d = c ? i[j] : i[j].data)) {
						$.isArray(b) || (b in d ? b = [b] : (b = $.camelCase(b), b = b in d ? [b] : b.split(" ")));
						for (f = 0, g = b.length; f < g; f++) delete d[b[f]];
						if (!(c ? e : $.isEmptyObject)(d)) return
					}(c || (delete i[j].data, e(i[j]))) && (h ? $.cleanData([a], !0) : $.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null)
				}
			}
		},
		_data: function(a, b, c) {
			return $.data(a, b, c, !0)
		},
		acceptData: function(a) {
			var b = a.nodeName && $.noData[a.nodeName.toLowerCase()];
			return !b || b !== !0 && a.getAttribute("classid") === b
		}
	}), $.fn.extend({
		data: function(a, c) {
			var e, f, g, h, i, j = this[0],
				k = 0,
				l = null;
			if (a === b) {
				if (this.length && (l = $.data(j), 1 === j.nodeType && !$._data(j, "parsedAttrs"))) {
					for (g = j.attributes, i = g.length; k < i; k++) h = g[k].name, h.indexOf("data-") || (h = $.camelCase(h.substring(5)), d(j, h, l[h]));
					$._data(j, "parsedAttrs", !0)
				}
				return l
			}
			return "object" == typeof a ? this.each(function() {
				$.data(this, a)
			}) : (e = a.split(".", 2), e[1] = e[1] ? "." + e[1] : "", f = e[1] + "!", $.access(this, function(c) {
				return c === b ? (l = this.triggerHandler("getData" + f, [e[0]]), l === b && j && (l = $.data(j, a), l = d(j, a, l)), l === b && e[1] ? this.data(e[0]) : l) : (e[1] = c, void this.each(function() {
					var b = $(this);
					b.triggerHandler("setData" + f, e), $.data(this, a, c), b.triggerHandler("changeData" + f, e)
				}))
			}, null, c, arguments.length > 1, null, !1))
		},
		removeData: function(a) {
			return this.each(function() {
				$.removeData(this, a)
			})
		}
	}), $.extend({
		queue: function(a, b, c) {
			var d;
			if (a) return b = (b || "fx") + "queue", d = $._data(a, b), c && (!d || $.isArray(c) ? d = $._data(a, b, $.makeArray(c)) : d.push(c)), d || []
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var c = $.queue(a, b),
				d = c.length,
				e = c.shift(),
				f = $._queueHooks(a, b),
				g = function() {
					$.dequeue(a, b)
				};
			"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
		},
		_queueHooks: function(a, b) {
			var c = b + "queueHooks";
			return $._data(a, c) || $._data(a, c, {
				empty: $.Callbacks("once memory").add(function() {
					$.removeData(a, b + "queue", !0), $.removeData(a, c, !0)
				})
			})
		}
	}), $.fn.extend({
		queue: function(a, c) {
			var d = 2;
			return "string" != typeof a && (c = a, a = "fx", d--), arguments.length < d ? $.queue(this[0], a) : c === b ? this : this.each(function() {
				var b = $.queue(this, a, c);
				$._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && $.dequeue(this, a)
			})
		},
		dequeue: function(a) {
			return this.each(function() {
				$.dequeue(this, a)
			})
		},
		delay: function(a, b) {
			return a = $.fx ? $.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
				var d = setTimeout(b, a);
				c.stop = function() {
					clearTimeout(d)
				}
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		},
		promise: function(a, c) {
			var d, e = 1,
				f = $.Deferred(),
				g = this,
				h = this.length,
				i = function() {
					--e || f.resolveWith(g, [g])
				};
			for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;) d = $._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
			return i(), f.promise(c)
		}
	});
	var ra, sa, ta, ua = /[\t\r\n]/g,
		va = /\r/g,
		wa = /^(?:button|input)$/i,
		xa = /^(?:button|input|object|select|textarea)$/i,
		ya = /^a(?:rea|)$/i,
		za = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		Aa = $.support.getSetAttribute;
	$.fn.extend({
		attr: function(a, b) {
			return $.access(this, $.attr, a, b, arguments.length > 1)
		},
		removeAttr: function(a) {
			return this.each(function() {
				$.removeAttr(this, a)
			})
		},
		prop: function(a, b) {
			return $.access(this, $.prop, a, b, arguments.length > 1)
		},
		removeProp: function(a) {
			return a = $.propFix[a] || a, this.each(function() {
				try {
					this[a] = b, delete this[a]
				} catch (a) {}
			})
		},
		addClass: function(a) {
			var b, c, d, e, f, g, h;
			if ($.isFunction(a)) return this.each(function(b) {
				$(this).addClass(a.call(this, b, this.className))
			});
			if (a && "string" == typeof a) for (b = a.split(ba), c = 0, d = this.length; c < d; c++) if (e = this[c], 1 === e.nodeType) if (e.className || 1 !== b.length) {
				for (f = " " + e.className + " ", g = 0, h = b.length; g < h; g++) f.indexOf(" " + b[g] + " ") < 0 && (f += b[g] + " ");
				e.className = $.trim(f)
			} else e.className = a;
			return this
		},
		removeClass: function(a) {
			var c, d, e, f, g, h, i;
			if ($.isFunction(a)) return this.each(function(b) {
				$(this).removeClass(a.call(this, b, this.className))
			});
			if (a && "string" == typeof a || a === b) for (c = (a || "").split(ba), h = 0, i = this.length; h < i; h++) if (e = this[h], 1 === e.nodeType && e.className) {
				for (d = (" " + e.className + " ").replace(ua, " "), f = 0, g = c.length; f < g; f++) for (; d.indexOf(" " + c[f] + " ") >= 0;) d = d.replace(" " + c[f] + " ", " ");
				e.className = a ? $.trim(d) : ""
			}
			return this
		},
		toggleClass: function(a, b) {
			var c = typeof a,
				d = "boolean" == typeof b;
			return $.isFunction(a) ? this.each(function(c) {
				$(this).toggleClass(a.call(this, c, this.className, b), b)
			}) : this.each(function() {
				if ("string" === c) for (var e, f = 0, g = $(this), h = b, i = a.split(ba); e = i[f++];) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e);
				else "undefined" !== c && "boolean" !== c || (this.className && $._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : $._data(this, "__className__") || "")
			})
		},
		hasClass: function(a) {
			for (var b = " " + a + " ", c = 0, d = this.length; c < d; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ua, " ").indexOf(b) >= 0) return !0;
			return !1
		},
		val: function(a) {
			var c, d, e, f = this[0]; {
				if (arguments.length) return e = $.isFunction(a), this.each(function(d) {
					var f, g = $(this);
					1 === this.nodeType && (f = e ? a.call(this, d, g.val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : $.isArray(f) && (f = $.map(f, function(a) {
						return null == a ? "" : a + ""
					})), c = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()], c && "set" in c && c.set(this, f, "value") !== b || (this.value = f))
				});
				if (f) return c = $.valHooks[f.type] || $.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, "string" == typeof d ? d.replace(va, "") : null == d ? "" : d)
			}
		}
	}), $.extend({
		valHooks: {
			option: {
				get: function(a) {
					var b = a.attributes.value;
					return !b || b.specified ? a.value : a.text
				}
			},
			select: {
				get: function(a) {
					var b, c, d, e, f = a.selectedIndex,
						g = [],
						h = a.options,
						i = "select-one" === a.type;
					if (f < 0) return null;
					for (c = i ? f : 0, d = i ? f + 1 : h.length; c < d; c++) if (e = h[c], e.selected && ($.support.optDisabled ? !e.disabled : null === e.getAttribute("disabled")) && (!e.parentNode.disabled || !$.nodeName(e.parentNode, "optgroup"))) {
						if (b = $(e).val(), i) return b;
						g.push(b)
					}
					return i && !g.length && h.length ? $(h[f]).val() : g
				},
				set: function(a, b) {
					var c = $.makeArray(b);
					return $(a).find("option").each(function() {
						this.selected = $.inArray($(this).val(), c) >= 0
					}), c.length || (a.selectedIndex = -1), c
				}
			}
		},
		attrFn: {},
		attr: function(a, c, d, e) {
			var f, g, h, i = a.nodeType;
			if (a && 3 !== i && 8 !== i && 2 !== i) return e && $.isFunction($.fn[c]) ? $(a)[c](d) : "undefined" == typeof a.getAttribute ? $.prop(a, c, d) : (h = 1 !== i || !$.isXMLDoc(a), h && (c = c.toLowerCase(), g = $.attrHooks[c] || (za.test(c) ? sa : ra)), d !== b ? null === d ? void $.removeAttr(a, c) : g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, d + ""), d) : g && "get" in g && h && null !== (f = g.get(a, c)) ? f : (f = a.getAttribute(c), null === f ? b : f))
		},
		removeAttr: function(a, b) {
			var c, d, e, f, g = 0;
			if (b && 1 === a.nodeType) for (d = b.split(ba); g < d.length; g++) e = d[g], e && (c = $.propFix[e] || e, f = za.test(e), f || $.attr(a, e, ""), a.removeAttribute(Aa ? e : c), f && c in a && (a[c] = !1))
		},
		attrHooks: {
			type: {
				set: function(a, b) {
					if (wa.test(a.nodeName) && a.parentNode) $.error("type property can't be changed");
					else if (!$.support.radioValue && "radio" === b && $.nodeName(a, "input")) {
						var c = a.value;
						return a.setAttribute("type", b), c && (a.value = c), b
					}
				}
			},
			value: {
				get: function(a, b) {
					return ra && $.nodeName(a, "button") ? ra.get(a, b) : b in a ? a.value : null
				},
				set: function(a, b, c) {
					return ra && $.nodeName(a, "button") ? ra.set(a, b, c) : void(a.value = b)
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			for :"htmlFor",
			class: "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(a, c, d) {
			var e, f, g, h = a.nodeType;
			if (a && 3 !== h && 8 !== h && 2 !== h) return g = 1 !== h || !$.isXMLDoc(a), g && (c = $.propFix[c] || c, f = $.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c]
		},
		propHooks: {
			tabIndex: {
				get: function(a) {
					var c = a.getAttributeNode("tabindex");
					return c && c.specified ? parseInt(c.value, 10) : xa.test(a.nodeName) || ya.test(a.nodeName) && a.href ? 0 : b
				}
			}
		}
	}), sa = {
		get: function(a, c) {
			var d, e = $.prop(a, c);
			return e === !0 || "boolean" != typeof e && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
		},
		set: function(a, b, c) {
			var d;
			return b === !1 ? $.removeAttr(a, c) : (d = $.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
		}
	}, Aa || (ta = {
		name: !0,
		id: !0,
		coords: !0
	}, ra = $.valHooks.button = {
		get: function(a, c) {
			var d;
			return d = a.getAttributeNode(c), d && (ta[c] ? "" !== d.value : d.specified) ? d.value : b
		},
		set: function(a, b, c) {
			var d = a.getAttributeNode(c);
			return d || (d = P.createAttribute(c), a.setAttributeNode(d)), d.value = b + ""
		}
	}, $.each(["width", "height"], function(a, b) {
		$.attrHooks[b] = $.extend($.attrHooks[b], {
			set: function(a, c) {
				if ("" === c) return a.setAttribute(b, "auto"), c
			}
		})
	}), $.attrHooks.contenteditable = {
		get: ra.get,
		set: function(a, b, c) {
			"" === b && (b = "false"), ra.set(a, b, c)
		}
	}), $.support.hrefNormalized || $.each(["href", "src", "width", "height"], function(a, c) {
		$.attrHooks[c] = $.extend($.attrHooks[c], {
			get: function(a) {
				var d = a.getAttribute(c, 2);
				return null === d ? b : d
			}
		})
	}), $.support.style || ($.attrHooks.style = {
		get: function(a) {
			return a.style.cssText.toLowerCase() || b
		},
		set: function(a, b) {
			return a.style.cssText = b + ""
		}
	}), $.support.optSelected || ($.propHooks.selected = $.extend($.propHooks.selected, {
		get: function(a) {
			var b = a.parentNode;
			return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
		}
	})), $.support.enctype || ($.propFix.enctype = "encoding"), $.support.checkOn || $.each(["radio", "checkbox"], function() {
		$.valHooks[this] = {
			get: function(a) {
				return null === a.getAttribute("value") ? "on" : a.value
			}
		}
	}), $.each(["radio", "checkbox"], function() {
		$.valHooks[this] = $.extend($.valHooks[this], {
			set: function(a, b) {
				if ($.isArray(b)) return a.checked = $.inArray($(a).val(), b) >= 0
			}
		})
	});
	var Ba = /^(?:textarea|input|select)$/i,
		Ca = /^([^\.]*|)(?:\.(.+)|)$/,
		Da = /(?:^|\s)hover(\.\S+|)\b/,
		Ea = /^key/,
		Fa = /^(?:mouse|contextmenu)|click/,
		Ga = /^(?:focusinfocus|focusoutblur)$/,
		Ha = function(a) {
			return $.event.special.hover ? a : a.replace(Da, "mouseenter$1 mouseleave$1")
		};
	$.event = {
		add: function(a, c, d, e, f) {
			var g, h, i, j, k, l, m, n, o, p, q;
			if (3 !== a.nodeType && 8 !== a.nodeType && c && d && (g = $._data(a))) {
				for (d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = $.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function(a) {
					return "undefined" == typeof $ || a && $.event.triggered === a.type ? b : $.event.dispatch.apply(h.elem, arguments)
				}, h.elem = a), c = $.trim(Ha(c)).split(" "), j = 0; j < c.length; j++) k = Ca.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), q = $.event.special[l] || {}, l = (f ? q.delegateType : q.bindType) || l, q = $.event.special[l] || {}, n = $.extend({
					type: l,
					origType: k[1],
					data: e,
					handler: d,
					guid: d.guid,
					selector: f,
					needsContext: f && $.expr.match.needsContext.test(f),
					namespace: m.join(".")
				}, o), p = i[l], p || (p = i[l] = [], p.delegateCount = 0, q.setup && q.setup.call(a, e, m, h) !== !1 || (a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h))), q.add && (q.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? p.splice(p.delegateCount++, 0, n) : p.push(n), $.event.global[l] = !0;
				a = null
			}
		},
		global: {},
		remove: function(a, b, c, d, e) {
			var f, g, h, i, j, k, l, m, n, o, p, q = $.hasData(a) && $._data(a);
			if (q && (m = q.events)) {
				for (b = $.trim(Ha(b || "")).split(" "), f = 0; f < b.length; f++) if (g = Ca.exec(b[f]) || [], h = i = g[1], j = g[2], h) {
					for (n = $.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = 0; l < o.length; l++) p = o[l], (e || i === p.origType) && (!c || c.guid === p.guid) && (!j || j.test(p.namespace)) && (!d || d === p.selector || "**" === d && p.selector) && (o.splice(l--, 1), p.selector && o.delegateCount--, n.remove && n.remove.call(a, p));
					0 === o.length && k !== o.length && ((!n.teardown || n.teardown.call(a, j, q.handle) === !1) && $.removeEvent(a, h, q.handle), delete m[h])
				} else for (h in m) $.event.remove(a, h + b[f], c, d, !0);
				$.isEmptyObject(m) && (delete q.handle, $.removeData(a, "events", !0))
			}
		},
		customEvent: {
			getData: !0,
			setData: !0,
			changeData: !0
		},
		trigger: function(c, d, e, f) {
			if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
				var g, h, i, j, k, l, m, n, o, p, q = c.type || c,
					r = [];
				if (Ga.test(q + $.event.triggered)) return;
				if (q.indexOf("!") >= 0 && (q = q.slice(0, -1), h = !0), q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), (!e || $.event.customEvent[q]) && !$.event.global[q]) return;
				if (c = "object" == typeof c ? c[$.expando] ? c : new $.Event(q, c) : new $.Event(q), c.type = q, c.isTrigger = !0, c.exclusive = h, c.namespace = r.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = q.indexOf(":") < 0 ? "on" + q : "", !e) {
					g = $.cache;
					for (i in g) g[i].events && g[i].events[q] && $.event.trigger(c, d, g[i].handle.elem, !0);
					return
				}
				if (c.result = b, c.target || (c.target = e), d = null != d ? $.makeArray(d) : [], d.unshift(c), m = $.event.special[q] || {}, m.trigger && m.trigger.apply(e, d) === !1) return;
				if (o = [
					[e, m.bindType || q]
				], !f && !m.noBubble && !$.isWindow(e)) {
					for (p = m.delegateType || q, j = Ga.test(p + q) ? e : e.parentNode, k = e; j; j = j.parentNode) o.push([j, p]), k = j;
					k === (e.ownerDocument || P) && o.push([k.defaultView || k.parentWindow || a, p])
				}
				for (i = 0; i < o.length && !c.isPropagationStopped(); i++) j = o[i][0], c.type = o[i][1], n = ($._data(j, "events") || {})[c.type] && $._data(j, "handle"), n && n.apply(j, d), n = l && j[l], n && $.acceptData(j) && n.apply && n.apply(j, d) === !1 && c.preventDefault();
				return c.type = q, !f && !c.isDefaultPrevented() && (!m._default || m._default.apply(e.ownerDocument, d) === !1) && ("click" !== q || !$.nodeName(e, "a")) && $.acceptData(e) && l && e[q] && ("focus" !== q && "blur" !== q || 0 !== c.target.offsetWidth) && !$.isWindow(e) && (k = e[l], k && (e[l] = null), $.event.triggered = q, e[q](), $.event.triggered = b, k && (e[l] = k)), c.result
			}
		},
		dispatch: function(c) {
			c = $.event.fix(c || a.event);
			var d, e, f, g, h, i, j, k, l, m = ($._data(this, "events") || {})[c.type] || [],
				n = m.delegateCount,
				o = V.call(arguments),
				p = !c.exclusive && !c.namespace,
				q = $.event.special[c.type] || {},
				r = [];
			if (o[0] = c, c.delegateTarget = this, !q.preDispatch || q.preDispatch.call(this, c) !== !1) {
				if (n && (!c.button || "click" !== c.type)) for (f = c.target; f != this; f = f.parentNode || this) if (f.disabled !== !0 || "click" !== c.type) {
					for (h = {}, j = [], d = 0; d < n; d++) k = m[d], l = k.selector, h[l] === b && (h[l] = k.needsContext ? $(l, this).index(f) >= 0 : $.find(l, this, null, [f]).length), h[l] && j.push(k);
					j.length && r.push({
						elem: f,
						matches: j
					})
				}
				for (m.length > n && r.push({
					elem: this,
					matches: m.slice(n)
				}), d = 0; d < r.length && !c.isPropagationStopped(); d++) for (i = r[d], c.currentTarget = i.elem, e = 0; e < i.matches.length && !c.isImmediatePropagationStopped(); e++) k = i.matches[e], (p || !c.namespace && !k.namespace || c.namespace_re && c.namespace_re.test(k.namespace)) && (c.data = k.data, c.handleObj = k, g = (($.event.special[k.origType] || {}).handle || k.handler).apply(i.elem, o), g !== b && (c.result = g, g === !1 && (c.preventDefault(), c.stopPropagation())));
				return q.postDispatch && q.postDispatch.call(this, c), c.result
			}
		},
		props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(a, b) {
				return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(a, c) {
				var d, e, f, g = c.button,
					h = c.fromElement;
				return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || P, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
			}
		},
		fix: function(a) {
			if (a[$.expando]) return a;
			var b, c, d = a,
				e = $.event.fixHooks[a.type] || {},
				f = e.props ? this.props.concat(e.props) : this.props;
			for (a = $.Event(d), b = f.length; b;) c = f[--b], a[c] = d[c];
			return a.target || (a.target = d.srcElement || P), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !! a.metaKey, e.filter ? e.filter(a, d) : a
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				delegateType: "focusin"
			},
			blur: {
				delegateType: "focusout"
			},
			beforeunload: {
				setup: function(a, b, c) {
					$.isWindow(this) && (this.onbeforeunload = c)
				},
				teardown: function(a, b) {
					this.onbeforeunload === b && (this.onbeforeunload = null)
				}
			}
		},
		simulate: function(a, b, c, d) {
			var e = $.extend(new $.Event, c, {
				type: a,
				isSimulated: !0,
				originalEvent: {}
			});
			d ? $.event.trigger(e, null, b) : $.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
		}
	}, $.event.handle = $.event.dispatch, $.removeEvent = P.removeEventListener ?
	function(a, b, c) {
		a.removeEventListener && a.removeEventListener(b, c, !1)
	} : function(a, b, c) {
		var d = "on" + b;
		a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c))
	}, $.Event = function(a, b) {
		return this instanceof $.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? g : f) : this.type = a, b && $.extend(this, b), this.timeStamp = a && a.timeStamp || $.now(), this[$.expando] = !0, void 0) : new $.Event(a, b)
	}, $.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = g;
			var a = this.originalEvent;
			a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
		},
		stopPropagation: function() {
			this.isPropagationStopped = g;
			var a = this.originalEvent;
			a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = g, this.stopPropagation()
		},
		isDefaultPrevented: f,
		isPropagationStopped: f,
		isImmediatePropagationStopped: f
	}, $.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(a, b) {
		$.event.special[a] = {
			delegateType: b,
			bindType: b,
			handle: function(a) {
				var c, d = this,
					e = a.relatedTarget,
					f = a.handleObj;
				f.selector;
				return e && (e === d || $.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
			}
		}
	}), $.support.submitBubbles || ($.event.special.submit = {
		setup: function() {
			return !$.nodeName(this, "form") && void $.event.add(this, "click._submit keypress._submit", function(a) {
				var c = a.target,
					d = $.nodeName(c, "input") || $.nodeName(c, "button") ? c.form : b;
				d && !$._data(d, "_submit_attached") && ($.event.add(d, "submit._submit", function(a) {
					a._submit_bubble = !0
				}), $._data(d, "_submit_attached", !0))
			})
		},
		postDispatch: function(a) {
			a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && $.event.simulate("submit", this.parentNode, a, !0))
		},
		teardown: function() {
			return !$.nodeName(this, "form") && void $.event.remove(this, "._submit")
		}
	}), $.support.changeBubbles || ($.event.special.change = {
		setup: function() {
			return Ba.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || ($.event.add(this, "propertychange._change", function(a) {
				"checked" === a.originalEvent.propertyName && (this._just_changed = !0)
			}), $.event.add(this, "click._change", function(a) {
				this._just_changed && !a.isTrigger && (this._just_changed = !1), $.event.simulate("change", this, a, !0)
			})), !1) : void $.event.add(this, "beforeactivate._change", function(a) {
				var b = a.target;
				Ba.test(b.nodeName) && !$._data(b, "_change_attached") && ($.event.add(b, "change._change", function(a) {
					this.parentNode && !a.isSimulated && !a.isTrigger && $.event.simulate("change", this.parentNode, a, !0)
				}), $._data(b, "_change_attached", !0))
			})
		},
		handle: function(a) {
			var b = a.target;
			if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) return a.handleObj.handler.apply(this, arguments)
		},
		teardown: function() {
			return $.event.remove(this, "._change"), !Ba.test(this.nodeName)
		}
	}), $.support.focusinBubbles || $.each({
		focus: "focusin",
		blur: "focusout"
	}, function(a, b) {
		var c = 0,
			d = function(a) {
				$.event.simulate(b, a.target, $.event.fix(a), !0)
			};
		$.event.special[b] = {
			setup: function() {
				0 === c++ && P.addEventListener(a, d, !0)
			},
			teardown: function() {
				0 === --c && P.removeEventListener(a, d, !0)
			}
		}
	}), $.fn.extend({
		on: function(a, c, d, e, g) {
			var h, i;
			if ("object" == typeof a) {
				"string" != typeof c && (d = d || c, c = b);
				for (i in a) this.on(i, c, d, a[i], g);
				return this
			}
			if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1) e = f;
			else if (!e) return this;
			return 1 === g && (h = e, e = function(a) {
				return $().off(a), h.apply(this, arguments)
			}, e.guid = h.guid || (h.guid = $.guid++)), this.each(function() {
				$.event.add(this, a, e, d, c)
			})
		},
		one: function(a, b, c, d) {
			return this.on(a, b, c, d, 1)
		},
		off: function(a, c, d) {
			var e, g;
			if (a && a.preventDefault && a.handleObj) return e = a.handleObj, $(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
			if ("object" == typeof a) {
				for (g in a) this.off(g, c, a[g]);
				return this
			}
			return c !== !1 && "function" != typeof c || (d = c, c = b), d === !1 && (d = f), this.each(function() {
				$.event.remove(this, a, d, c)
			})
		},
		bind: function(a, b, c) {
			return this.on(a, null, b, c)
		},
		unbind: function(a, b) {
			return this.off(a, null, b)
		},
		live: function(a, b, c) {
			return $(this.context).on(a, this.selector, b, c), this
		},
		die: function(a, b) {
			return $(this.context).off(a, this.selector || "**", b), this
		},
		delegate: function(a, b, c, d) {
			return this.on(b, a, c, d)
		},
		undelegate: function(a, b, c) {
			return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
		},
		trigger: function(a, b) {
			return this.each(function() {
				$.event.trigger(a, b, this)
			})
		},
		triggerHandler: function(a, b) {
			if (this[0]) return $.event.trigger(a, b, this[0], !0)
		},
		toggle: function(a) {
			var b = arguments,
				c = a.guid || $.guid++,
				d = 0,
				e = function(c) {
					var e = ($._data(this, "lastToggle" + a.guid) || 0) % d;
					return $._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
				};
			for (e.guid = c; d < b.length;) b[d++].guid = c;
			return this.click(e)
		},
		hover: function(a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	}), $.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
		$.fn[b] = function(a, c) {
			return null == c && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
		}, Ea.test(b) && ($.event.fixHooks[b] = $.event.keyHooks), Fa.test(b) && ($.event.fixHooks[b] = $.event.mouseHooks)
	}), function(a, b) {
		function c(a, b, c, d) {
			c = c || [], b = b || F;
			var e, f, g, h, i = b.nodeType;
			if (!a || "string" != typeof a) return c;
			if (1 !== i && 9 !== i) return [];
			if (g = v(b), !g && !d && (e = ca.exec(a))) if (h = e[1]) {
				if (9 === i) {
					if (f = b.getElementById(h), !f || !f.parentNode) return c;
					if (f.id === h) return c.push(f), c
				} else if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && w(b, f) && f.id === h) return c.push(f), c
			} else {
				if (e[2]) return K.apply(c, L.call(b.getElementsByTagName(a), 0)), c;
				if ((h = e[3]) && ma && b.getElementsByClassName) return K.apply(c, L.call(b.getElementsByClassName(h), 0)), c
			}
			return p(a.replace(Z, "$1"), b, c, d, g)
		}
		function d(a) {
			return function(b) {
				var c = b.nodeName.toLowerCase();
				return "input" === c && b.type === a
			}
		}
		function e(a) {
			return function(b) {
				var c = b.nodeName.toLowerCase();
				return ("input" === c || "button" === c) && b.type === a
			}
		}
		function f(a) {
			return N(function(b) {
				return b = +b, N(function(c, d) {
					for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
				})
			})
		}
		function g(a, b, c) {
			if (a === b) return c;
			for (var d = a.nextSibling; d;) {
				if (d === b) return -1;
				d = d.nextSibling
			}
			return 1
		}
		function h(a, b) {
			var d, e, f, g, h, i, j, k = Q[D][a];
			if (k) return b ? 0 : k.slice(0);
			for (h = a, i = [], j = t.preFilter; h;) {
				d && !(e = _.exec(h)) || (e && (h = h.slice(e[0].length)), i.push(f = [])), d = !1, (e = aa.exec(h)) && (f.push(d = new E(e.shift())), h = h.slice(d.length), d.type = e[0].replace(Z, " "));
				for (g in t.filter)(e = ha[g].exec(h)) && (!j[g] || (e = j[g](e, F, !0))) && (f.push(d = new E(e.shift())), h = h.slice(d.length), d.type = g, d.matches = e);
				if (!d) break
			}
			return b ? h.length : h ? c.error(a) : Q(a, i).slice(0)
		}
		function i(a, b, c) {
			var d = b.dir,
				e = c && "parentNode" === b.dir,
				f = I++;
			return b.first ?
			function(b, c, f) {
				for (; b = b[d];) if (e || 1 === b.nodeType) return a(b, c, f)
			} : function(b, c, g) {
				if (g) {
					for (; b = b[d];) if ((e || 1 === b.nodeType) && a(b, c, g)) return b
				} else for (var h, i = H + " " + f + " ", j = i + r; b = b[d];) if (e || 1 === b.nodeType) {
					if ((h = b[D]) === j) return b.sizset;
					if ("string" == typeof h && 0 === h.indexOf(i)) {
						if (b.sizset) return b
					} else {
						if (b[D] = j, a(b, c, g)) return b.sizset = !0, b;
						b.sizset = !1
					}
				}
			}
		}
		function j(a) {
			return a.length > 1 ?
			function(b, c, d) {
				for (var e = a.length; e--;) if (!a[e](b, c, d)) return !1;
				return !0
			} : a[0]
		}
		function k(a, b, c, d, e) {
			for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
			return g
		}
		function l(a, b, c, d, e, f) {
			return d && !d[D] && (d = l(d)), e && !e[D] && (e = l(e, f)), N(function(f, g, h, i) {
				if (!f || !e) {
					var j, l, m, n = [],
						p = [],
						q = g.length,
						r = f || o(b || "*", h.nodeType ? [h] : h, [], f),
						s = !a || !f && b ? r : k(r, n, a, h, i),
						t = c ? e || (f ? a : q || d) ? [] : g : s;
					if (c && c(s, t, h, i), d) for (m = k(t, p), d(m, [], h, i), j = m.length; j--;)(l = m[j]) && (t[p[j]] = !(s[p[j]] = l));
					if (f) for (j = a && t.length; j--;)(l = t[j]) && (f[n[j]] = !(g[n[j]] = l));
					else t = k(t === g ? t.splice(q, t.length) : t), e ? e(null, g, t, i) : K.apply(g, t)
				}
			})
		}
		function m(a) {
			for (var b, c, d, e = a.length, f = t.relative[a[0].type], g = f || t.relative[" "], h = f ? 1 : 0, k = i(function(a) {
				return a === b
			}, g, !0), n = i(function(a) {
				return M.call(b, a) > -1
			}, g, !0), o = [function(a, c, d) {
				return !f && (d || c !== A) || ((b = c).nodeType ? k(a, c, d) : n(a, c, d))
			}]; h < e; h++) if (c = t.relative[a[h].type]) o = [i(j(o), c)];
			else {
				if (c = t.filter[a[h].type].apply(null, a[h].matches), c[D]) {
					for (d = ++h; d < e && !t.relative[a[d].type]; d++);
					return l(h > 1 && j(o), h > 1 && a.slice(0, h - 1).join("").replace(Z, "$1"), c, h < d && m(a.slice(h, d)), d < e && m(a = a.slice(d)), d < e && a.join(""))
				}
				o.push(c)
			}
			return j(o)
		}
		function n(a, b) {
			var d = b.length > 0,
				e = a.length > 0,
				f = function(g, h, i, j, l) {
					var m, n, o, p = [],
						q = 0,
						s = "0",
						u = g && [],
						v = null != l,
						w = A,
						x = g || e && t.find.TAG("*", l && h.parentNode || h),
						y = H += null == w ? 1 : Math.E;
					for (v && (A = h !== F && h, r = f.el); null != (m = x[s]); s++) {
						if (e && m) {
							for (n = 0; o = a[n]; n++) if (o(m, h, i)) {
								j.push(m);
								break
							}
							v && (H = y, r = ++f.el)
						}
						d && ((m = !o && m) && q--, g && u.push(m))
					}
					if (q += s, d && s !== q) {
						for (n = 0; o = b[n]; n++) o(u, p, h, i);
						if (g) {
							if (q > 0) for (; s--;)!u[s] && !p[s] && (p[s] = J.call(j));
							p = k(p)
						}
						K.apply(j, p), v && !g && p.length > 0 && q + b.length > 1 && c.uniqueSort(j)
					}
					return v && (H = y, A = w), u
				};
			return f.el = 0, d ? N(f) : f
		}
		function o(a, b, d, e) {
			for (var f = 0, g = b.length; f < g; f++) c(a, b[f], d, e);
			return d
		}
		function p(a, b, c, d, e) {
			var f, g, i, j, k, l = h(a);
			l.length;
			if (!d && 1 === l.length) {
				if (g = l[0] = l[0].slice(0), g.length > 2 && "ID" === (i = g[0]).type && 9 === b.nodeType && !e && t.relative[g[1].type]) {
					if (b = t.find.ID(i.matches[0].replace(ga, ""), b, e)[0], !b) return c;
					a = a.slice(g.shift().length)
				}
				for (f = ha.POS.test(a) ? -1 : g.length - 1; f >= 0 && (i = g[f], !t.relative[j = i.type]); f--) if ((k = t.find[j]) && (d = k(i.matches[0].replace(ga, ""), da.test(g[0].type) && b.parentNode || b, e))) {
					if (g.splice(f, 1), a = d.length && g.join(""), !a) return K.apply(c, L.call(d, 0)), c;
					break
				}
			}
			return x(a, l)(d, b, e, c, da.test(a)), c
		}
		function q() {}
		var r, s, t, u, v, w, x, y, z, A, B = !0,
			C = "undefined",
			D = ("sizcache" + Math.random()).replace(".", ""),
			E = String,
			F = a.document,
			G = F.documentElement,
			H = 0,
			I = 0,
			J = [].pop,
			K = [].push,
			L = [].slice,
			M = [].indexOf ||
		function(a) {
			for (var b = 0, c = this.length; b < c; b++) if (this[b] === a) return b;
			return -1
		}, N = function(a, b) {
			return a[D] = null == b || b, a
		}, O = function() {
			var a = {},
				b = [];
			return N(function(c, d) {
				return b.push(c) > t.cacheLength && delete a[b.shift()], a[c] = d
			}, a)
		}, P = O(), Q = O(), R = O(), S = "[\ \\t\\r\\n\\f]", T = "(?:\\\\.|[-\\w]|[^\-\ ])+", U = T.replace("w", "w#"), V = "([*^$|!~]?=)", W = "\\[" + S + "*(" + T + ")" + S + "*(?:" + V + S + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + U + ")|)|)" + S + "*\\]", X = ":(" + T + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + W + ")|[^:]|\\\\.)*|.*))\\)|)", Y = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + S + "*((?:-\\d)?\\d*)" + S + "*\\)|)(?=[^-]|$)", Z = new RegExp("^" + S + "+|((?:^|[^\\\\])(?:\\\\.)*)" + S + "+$", "g"), _ = new RegExp("^" + S + "*," + S + "*"), aa = new RegExp("^" + S + "*([\ \\t\\r\\n\\f>+~])" + S + "*"), ba = new RegExp(X), ca = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, da = /[ \t\r\n\f]*[+~]/, ea = /h\d/i, fa = /input|select|textarea|button/i, ga = /\\(?!\\)/g, ha = {
			ID: new RegExp("^#(" + T + ")"),
			CLASS: new RegExp("^\\.(" + T + ")"),
			NAME: new RegExp("^\\[name=['\"]?(" + T + ")['\"]?\\]"),
			TAG: new RegExp("^(" + T.replace("w", "w*") + ")"),
			ATTR: new RegExp("^" + W),
			PSEUDO: new RegExp("^" + X),
			POS: new RegExp(Y, "i"),
			CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + S + "*(even|odd|(([+-]|)(\\d*)n|)" + S + "*(?:([+-]|)" + S + "*(\\d+)|))" + S + "*\\)|)", "i"),
			needsContext: new RegExp("^" + S + "*[>+~]|" + Y, "i")
		}, ia = function(a) {
			var b = F.createElement("div");
			try {
				return a(b)
			} catch (a) {
				return !1
			} finally {
				b = null
			}
		}, ja = ia(function(a) {
			return a.appendChild(F.createComment("")), !a.getElementsByTagName("*").length
		}), ka = ia(function(a) {
			return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== C && "#" === a.firstChild.getAttribute("href")
		}), la = ia(function(a) {
			a.innerHTML = "<select></select>";
			var b = typeof a.lastChild.getAttribute("multiple");
			return "boolean" !== b && "string" !== b
		}), ma = ia(function(a) {
			return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !(!a.getElementsByClassName || !a.getElementsByClassName("e").length) && (a.lastChild.className = "e", 2 === a.getElementsByClassName("e").length)
		}), na = ia(function(a) {
			a.id = D + 0, a.innerHTML = "<a name='" + D + "'></a><div name='" + D + "'></div>", G.insertBefore(a, G.firstChild);
			var b = F.getElementsByName && F.getElementsByName(D).length === 2 + F.getElementsByName(D + 0).length;
			return s = !F.getElementById(D), G.removeChild(a), b
		});
		try {
			L.call(G.childNodes, 0)[0].nodeType
		} catch (a) {
			L = function(a) {
				for (var b, c = []; b = this[a]; a++) c.push(b);
				return c
			}
		}
		c.matches = function(a, b) {
			return c(a, null, null, b)
		}, c.matchesSelector = function(a, b) {
			return c(b, null, null, [a]).length > 0
		}, u = c.getText = function(a) {
			var b, c = "",
				d = 0,
				e = a.nodeType;
			if (e) {
				if (1 === e || 9 === e || 11 === e) {
					if ("string" == typeof a.textContent) return a.textContent;
					for (a = a.firstChild; a; a = a.nextSibling) c += u(a)
				} else if (3 === e || 4 === e) return a.nodeValue
			} else for (; b = a[d]; d++) c += u(b);
			return c
		}, v = c.isXML = function(a) {
			var b = a && (a.ownerDocument || a).documentElement;
			return !!b && "HTML" !== b.nodeName
		}, w = c.contains = G.contains ?
		function(a, b) {
			var c = 9 === a.nodeType ? a.documentElement : a,
				d = b && b.parentNode;
			return a === d || !! (d && 1 === d.nodeType && c.contains && c.contains(d))
		} : G.compareDocumentPosition ?
		function(a, b) {
			return b && !! (16 & a.compareDocumentPosition(b))
		} : function(a, b) {
			for (; b = b.parentNode;) if (b === a) return !0;
			return !1
		}, c.attr = function(a, b) {
			var c, d = v(a);
			return d || (b = b.toLowerCase()), (c = t.attrHandle[b]) ? c(a) : d || la ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? "boolean" == typeof a[b] ? a[b] ? b : null : c.specified ? c.value : null : null)
		}, t = c.selectors = {
			cacheLength: 50,
			createPseudo: N,
			match: ha,
			attrHandle: ka ? {} : {
				href: function(a) {
					return a.getAttribute("href", 2)
				},
				type: function(a) {
					return a.getAttribute("type")
				}
			},
			find: {
				ID: s ?
				function(a, b, c) {
					if (typeof b.getElementById !== C && !c) {
						var d = b.getElementById(a);
						return d && d.parentNode ? [d] : []
					}
				} : function(a, c, d) {
					if (typeof c.getElementById !== C && !d) {
						var e = c.getElementById(a);
						return e ? e.id === a || typeof e.getAttributeNode !== C && e.getAttributeNode("id").value === a ? [e] : b : []
					}
				},
				TAG: ja ?
				function(a, b) {
					if (typeof b.getElementsByTagName !== C) return b.getElementsByTagName(a)
				} : function(a, b) {
					var c = b.getElementsByTagName(a);
					if ("*" === a) {
						for (var d, e = [], f = 0; d = c[f]; f++) 1 === d.nodeType && e.push(d);
						return e
					}
					return c
				},
				NAME: na &&
				function(a, b) {
					if (typeof b.getElementsByName !== C) return b.getElementsByName(name)
				},
				CLASS: ma &&
				function(a, b, c) {
					if (typeof b.getElementsByClassName !== C && !c) return b.getElementsByClassName(a)
				}
			},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(a) {
					return a[1] = a[1].replace(ga, ""), a[3] = (a[4] || a[5] || "").replace(ga, ""), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
				},
				CHILD: function(a) {
					return a[1] = a[1].toLowerCase(), "nth" === a[1] ? (a[2] || c.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" === a[2] || "odd" === a[2])), a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && c.error(a[0]), a
				},
				PSEUDO: function(a) {
					var b, c;
					return ha.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[3] : (b = a[4]) && (ba.test(b) && (c = h(b, !0)) && (c = b.indexOf(")", b.length - c) - b.length) && (b = b.slice(0, c), a[0] = a[0].slice(0, c)), a[2] = b), a.slice(0, 3))
				}
			},
			filter: {
				ID: s ?
				function(a) {
					return a = a.replace(ga, ""), function(b) {
						return b.getAttribute("id") === a
					}
				} : function(a) {
					return a = a.replace(ga, ""), function(b) {
						var c = typeof b.getAttributeNode !== C && b.getAttributeNode("id");
						return c && c.value === a
					}
				},
				TAG: function(a) {
					return "*" === a ?
					function() {
						return !0
					} : (a = a.replace(ga, "").toLowerCase(), function(b) {
						return b.nodeName && b.nodeName.toLowerCase() === a
					})
				},
				CLASS: function(a) {
					var b = P[D][a];
					return b || (b = P(a, new RegExp("(^|" + S + ")" + a + "(" + S + "|$)"))), function(a) {
						return b.test(a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
					}
				},
				ATTR: function(a, b, d) {
					return function(e, f) {
						var g = c.attr(e, a);
						return null == g ? "!=" === b : !b || (g += "", "=" === b ? g === d : "!=" === b ? g !== d : "^=" === b ? d && 0 === g.indexOf(d) : "*=" === b ? d && g.indexOf(d) > -1 : "$=" === b ? d && g.substr(g.length - d.length) === d : "~=" === b ? (" " + g + " ").indexOf(d) > -1 : "|=" === b && (g === d || g.substr(0, d.length + 1) === d + "-"))
					}
				},
				CHILD: function(a, b, c, d) {
					return "nth" === a ?
					function(a) {
						var b, e, f = a.parentNode;
						if (1 === c && 0 === d) return !0;
						if (f) for (e = 0, b = f.firstChild; b && (1 !== b.nodeType || (e++, a !== b)); b = b.nextSibling);
						return e -= d, e === c || e % c === 0 && e / c >= 0
					} : function(b) {
						var c = b;
						switch (a) {
						case "only":
						case "first":
							for (; c = c.previousSibling;) if (1 === c.nodeType) return !1;
							if ("first" === a) return !0;
							c = b;
						case "last":
							for (; c = c.nextSibling;) if (1 === c.nodeType) return !1;
							return !0
						}
					}
				},
				PSEUDO: function(a, b) {
					var d, e = t.pseudos[a] || t.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
					return e[D] ? e(b) : e.length > 1 ? (d = [a, a, "", b], t.setFilters.hasOwnProperty(a.toLowerCase()) ? N(function(a, c) {
						for (var d, f = e(a, b), g = f.length; g--;) d = M.call(a, f[g]), a[d] = !(c[d] = f[g])
					}) : function(a) {
						return e(a, 0, d)
					}) : e
				}
			},
			pseudos: {
				not: N(function(a) {
					var b = [],
						c = [],
						d = x(a.replace(Z, "$1"));
					return d[D] ? N(function(a, b, c, e) {
						for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
					}) : function(a, e, f) {
						return b[0] = a, d(b, null, f, c), !c.pop()
					}
				}),
				has: N(function(a) {
					return function(b) {
						return c(a, b).length > 0
					}
				}),
				contains: N(function(a) {
					return function(b) {
						return (b.textContent || b.innerText || u(b)).indexOf(a) > -1
					}
				}),
				enabled: function(a) {
					return a.disabled === !1
				},
				disabled: function(a) {
					return a.disabled === !0
				},
				checked: function(a) {
					var b = a.nodeName.toLowerCase();
					return "input" === b && !! a.checked || "option" === b && !! a.selected
				},
				selected: function(a) {
					return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
				},
				parent: function(a) {
					return !t.pseudos.empty(a)
				},
				empty: function(a) {
					var b;
					for (a = a.firstChild; a;) {
						if (a.nodeName > "@" || 3 === (b = a.nodeType) || 4 === b) return !1;
						a = a.nextSibling
					}
					return !0
				},
				header: function(a) {
					return ea.test(a.nodeName)
				},
				text: function(a) {
					var b, c;
					return "input" === a.nodeName.toLowerCase() && "text" === (b = a.type) && (null == (c = a.getAttribute("type")) || c.toLowerCase() === b)
				},
				radio: d("radio"),
				checkbox: d("checkbox"),
				file: d("file"),
				password: d("password"),
				image: d("image"),
				submit: e("submit"),
				reset: e("reset"),
				button: function(a) {
					var b = a.nodeName.toLowerCase();
					return "input" === b && "button" === a.type || "button" === b
				},
				input: function(a) {
					return fa.test(a.nodeName)
				},
				focus: function(a) {
					var b = a.ownerDocument;
					return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && ( !! a.type || !! a.href)
				},
				active: function(a) {
					return a === a.ownerDocument.activeElement
				},
				first: f(function(a, b, c) {
					return [0]
				}),
				last: f(function(a, b, c) {
					return [b - 1]
				}),
				eq: f(function(a, b, c) {
					return [c < 0 ? c + b : c]
				}),
				even: f(function(a, b, c) {
					for (var d = 0; d < b; d += 2) a.push(d);
					return a
				}),
				odd: f(function(a, b, c) {
					for (var d = 1; d < b; d += 2) a.push(d);
					return a
				}),
				lt: f(function(a, b, c) {
					for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
					return a
				}),
				gt: f(function(a, b, c) {
					for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
					return a
				})
			}
		}, y = G.compareDocumentPosition ?
		function(a, b) {
			return a === b ? (z = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1
		} : function(a, b) {
			if (a === b) return z = !0, 0;
			if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
			var c, d, e = [],
				f = [],
				h = a.parentNode,
				i = b.parentNode,
				j = h;
			if (h === i) return g(a, b);
			if (!h) return -1;
			if (!i) return 1;
			for (; j;) e.unshift(j), j = j.parentNode;
			for (j = i; j;) f.unshift(j), j = j.parentNode;
			c = e.length, d = f.length;
			for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return g(e[k], f[k]);
			return k === c ? g(a, f[k], -1) : g(e[k], b, 1)
		}, [0, 0].sort(y), B = !z, c.uniqueSort = function(a) {
			var b, c = 1;
			if (z = B, a.sort(y), z) for (; b = a[c]; c++) b === a[c - 1] && a.splice(c--, 1);
			return a
		}, c.error = function(a) {
			throw new Error("Syntax error, unrecognized expression: " + a)
		}, x = c.compile = function(a, b) {
			var c, d = [],
				e = [],
				f = R[D][a];
			if (!f) {
				for (b || (b = h(a)), c = b.length; c--;) f = m(b[c]), f[D] ? d.push(f) : e.push(f);
				f = R(a, n(e, d))
			}
			return f
		}, F.querySelectorAll &&
		function() {
			var a, b = p,
				d = /'|\\/g,
				e = /\=[ \t\r\n\f]*([^'"\]]*)[ \t\r\n\f]*\]/g,
				f = [":focus"],
				g = [":active", ":focus"],
				i = G.matchesSelector || G.mozMatchesSelector || G.webkitMatchesSelector || G.oMatchesSelector || G.msMatchesSelector;
			ia(function(a) {
				a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || f.push("\\[" + S + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || f.push(":checked")
			}), ia(function(a) {
				a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && f.push("[*^$]=" + S + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'/>", a.querySelectorAll(":enabled").length || f.push(":enabled", ":disabled")
			}), f = new RegExp(f.join("|")), p = function(a, c, e, g, i) {
				if (!(g || i || f && f.test(a))) {
					var j, k, l = !0,
						m = D,
						n = c,
						o = 9 === c.nodeType && a;
					if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
						for (j = h(a), (l = c.getAttribute("id")) ? m = l.replace(d, "\\$&") : c.setAttribute("id", m), m = "[id='" + m + "'] ", k = j.length; k--;) j[k] = m + j[k].join("");
						n = da.test(a) && c.parentNode || c, o = j.join(",")
					}
					if (o) try {
						return K.apply(e, L.call(n.querySelectorAll(o), 0)), e
					} catch (a) {} finally {
						l || c.removeAttribute("id")
					}
				}
				return b(a, c, e, g, i)
			}, i && (ia(function(b) {
				a = i.call(b, "div");
				try {
					i.call(b, "[test!='']:sizzle"), g.push("!=", X)
				} catch (a) {}
			}), g = new RegExp(g.join("|")), c.matchesSelector = function(b, d) {
				if (d = d.replace(e, "='$1']"), !(v(b) || g.test(d) || f && f.test(d))) try {
					var h = i.call(b, d);
					if (h || a || b.document && 11 !== b.document.nodeType) return h
				} catch (a) {}
				return c(d, null, null, [b]).length > 0
			})
		}(), t.pseudos.nth = t.pseudos.eq, t.filters = q.prototype = t.pseudos, t.setFilters = new q, c.attr = $.attr, $.find = c, $.expr = c.selectors, $.expr[":"] = $.expr.pseudos, $.unique = c.uniqueSort, $.text = c.getText, $.isXMLDoc = c.isXML, $.contains = c.contains
	}(a);
	var Ia = /Until$/,
		Ja = /^(?:parents|prev(?:Until|All))/,
		Ka = /^.[^:#\[\.,]*$/,
		La = $.expr.match.needsContext,
		Ma = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	$.fn.extend({
		find: function(a) {
			var b, c, d, e, f, g, h = this;
			if ("string" != typeof a) return $(a).filter(function() {
				for (b = 0, c = h.length; b < c; b++) if ($.contains(h[b], this)) return !0
			});
			for (g = this.pushStack("", "find", a), b = 0, c = this.length; b < c; b++) if (d = g.length, $.find(a, this[b], g), b > 0) for (e = d; e < g.length; e++) for (f = 0; f < d; f++) if (g[f] === g[e]) {
				g.splice(e--, 1);
				break
			}
			return g
		},
		has: function(a) {
			var b, c = $(a, this),
				d = c.length;
			return this.filter(function() {
				for (b = 0; b < d; b++) if ($.contains(this, c[b])) return !0
			})
		},
		not: function(a) {
			return this.pushStack(j(this, a, !1), "not", a)
		},
		filter: function(a) {
			return this.pushStack(j(this, a, !0), "filter", a)
		},
		is: function(a) {
			return !!a && ("string" == typeof a ? La.test(a) ? $(a, this.context).index(this[0]) >= 0 : $.filter(a, this).length > 0 : this.filter(a).length > 0)
		},
		closest: function(a, b) {
			for (var c, d = 0, e = this.length, f = [], g = La.test(a) || "string" != typeof a ? $(a, b || this.context) : 0; d < e; d++) for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType;) {
				if (g ? g.index(c) > -1 : $.find.matchesSelector(c, a)) {
					f.push(c);
					break
				}
				c = c.parentNode
			}
			return f = f.length > 1 ? $.unique(f) : f, this.pushStack(f, "closest", a)
		},
		index: function(a) {
			return a ? "string" == typeof a ? $.inArray(this[0], $(a)) : $.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
		},
		add: function(a, b) {
			var c = "string" == typeof a ? $(a, b) : $.makeArray(a && a.nodeType ? [a] : a),
				d = $.merge(this.get(), c);
			return this.pushStack(h(c[0]) || h(d[0]) ? d : $.unique(d))
		},
		addBack: function(a) {
			return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
		}
	}), $.fn.andSelf = $.fn.addBack, $.each({
		parent: function(a) {
			var b = a.parentNode;
			return b && 11 !== b.nodeType ? b : null
		},
		parents: function(a) {
			return $.dir(a, "parentNode")
		},
		parentsUntil: function(a, b, c) {
			return $.dir(a, "parentNode", c)
		},
		next: function(a) {
			return i(a, "nextSibling")
		},
		prev: function(a) {
			return i(a, "previousSibling")
		},
		nextAll: function(a) {
			return $.dir(a, "nextSibling")
		},
		prevAll: function(a) {
			return $.dir(a, "previousSibling")
		},
		nextUntil: function(a, b, c) {
			return $.dir(a, "nextSibling", c)
		},
		prevUntil: function(a, b, c) {
			return $.dir(a, "previousSibling", c)
		},
		siblings: function(a) {
			return $.sibling((a.parentNode || {}).firstChild, a)
		},
		children: function(a) {
			return $.sibling(a.firstChild)
		},
		contents: function(a) {
			return $.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : $.merge([], a.childNodes)
		}
	}, function(a, b) {
		$.fn[a] = function(c, d) {
			var e = $.map(this, b, c);
			return Ia.test(a) || (d = c), d && "string" == typeof d && (e = $.filter(d, e)), e = this.length > 1 && !Ma[a] ? $.unique(e) : e, this.length > 1 && Ja.test(a) && (e = e.reverse()), this.pushStack(e, a, V.call(arguments).join(","))
		}
	}), $.extend({
		filter: function(a, b, c) {
			return c && (a = ":not(" + a + ")"), 1 === b.length ? $.find.matchesSelector(b[0], a) ? [b[0]] : [] : $.find.matches(a, b)
		},
		dir: function(a, c, d) {
			for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !$(f).is(d));) 1 === f.nodeType && e.push(f), f = f[c];
			return e
		},
		sibling: function(a, b) {
			for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
			return c
		}
	});
	var Na = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Oa = / jQuery\d+="(?:null|\d+)"/g,
		Pa = /^\s+/,
		Qa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Ra = /<([\w:]+)/,
		Sa = /<tbody/i,
		Ta = /<|&#?\w+;/,
		Ua = /<(?:script|style|link)/i,
		Va = /<(?:script|object|embed|option|style)/i,
		Wa = new RegExp("<(?:" + Na + ")[\\s/>]", "i"),
		Xa = /^(?:checkbox|radio)$/,
		Ya = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Za = /\/(java|ecma)script/i,
		$a = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
		_a = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		},
		ab = k(P),
		bb = ab.appendChild(P.createElement("div"));
	_a.optgroup = _a.option, _a.tbody = _a.tfoot = _a.colgroup = _a.caption = _a.thead, _a.th = _a.td, $.support.htmlSerialize || (_a._default = [1, "X<div>", "</div>"]), $.fn.extend({
		text: function(a) {
			return $.access(this, function(a) {
				return a === b ? $.text(this) : this.empty().append((this[0] && this[0].ownerDocument || P).createTextNode(a))
			}, null, a, arguments.length)
		},
		wrapAll: function(a) {
			if ($.isFunction(a)) return this.each(function(b) {
				$(this).wrapAll(a.call(this, b))
			});
			if (this[0]) {
				var b = $(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
					for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		},
		wrapInner: function(a) {
			return $.isFunction(a) ? this.each(function(b) {
				$(this).wrapInner(a.call(this, b))
			}) : this.each(function() {
				var b = $(this),
					c = b.contents();
				c.length ? c.wrapAll(a) : b.append(a)
			})
		},
		wrap: function(a) {
			var b = $.isFunction(a);
			return this.each(function(c) {
				$(this).wrapAll(b ? a.call(this, c) : a)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				$.nodeName(this, "body") || $(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, !0, function(a) {
				(1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a)
			})
		},
		prepend: function() {
			return this.domManip(arguments, !0, function(a) {
				(1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild)
			})
		},
		before: function() {
			if (!h(this[0])) return this.domManip(arguments, !1, function(a) {
				this.parentNode.insertBefore(a, this)
			});
			if (arguments.length) {
				var a = $.clean(arguments);
				return this.pushStack($.merge(a, this), "before", this.selector)
			}
		},
		after: function() {
			if (!h(this[0])) return this.domManip(arguments, !1, function(a) {
				this.parentNode.insertBefore(a, this.nextSibling)
			});
			if (arguments.length) {
				var a = $.clean(arguments);
				return this.pushStack($.merge(this, a), "after", this.selector)
			}
		},
		remove: function(a, b) {
			for (var c, d = 0; null != (c = this[d]); d++) a && !$.filter(a, [c]).length || (!b && 1 === c.nodeType && ($.cleanData(c.getElementsByTagName("*")), $.cleanData([c])), c.parentNode && c.parentNode.removeChild(c));
			return this
		},
		empty: function() {
			for (var a, b = 0; null != (a = this[b]); b++) for (1 === a.nodeType && $.cleanData(a.getElementsByTagName("*")); a.firstChild;) a.removeChild(a.firstChild);
			return this
		},
		clone: function(a, b) {
			return a = null != a && a, b = null == b ? a : b, this.map(function() {
				return $.clone(this, a, b)
			})
		},
		html: function(a) {
			return $.access(this, function(a) {
				var c = this[0] || {},
					d = 0,
					e = this.length;
				if (a === b) return 1 === c.nodeType ? c.innerHTML.replace(Oa, "") : b;
				if ("string" == typeof a && !Ua.test(a) && ($.support.htmlSerialize || !Wa.test(a)) && ($.support.leadingWhitespace || !Pa.test(a)) && !_a[(Ra.exec(a) || ["", ""])[1].toLowerCase()]) {
					a = a.replace(Qa, "<$1></$2>");
					try {
						for (; d < e; d++) c = this[d] || {}, 1 === c.nodeType && ($.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
						c = 0
					} catch (a) {}
				}
				c && this.empty().append(a)
			}, null, a, arguments.length)
		},
		replaceWith: function(a) {
			return h(this[0]) ? this.length ? this.pushStack($($.isFunction(a) ? a() : a), "replaceWith", a) : this : $.isFunction(a) ? this.each(function(b) {
				var c = $(this),
					d = c.html();
				c.replaceWith(a.call(this, b, d))
			}) : ("string" != typeof a && (a = $(a).detach()), this.each(function() {
				var b = this.nextSibling,
					c = this.parentNode;
				$(this).remove(), b ? $(b).before(a) : $(c).append(a)
			}))
		},
		detach: function(a) {
			return this.remove(a, !0)
		},
		domManip: function(a, c, d) {
			a = [].concat.apply([], a);
			var e, f, g, h, i = 0,
				j = a[0],
				k = [],
				m = this.length;
			if (!$.support.checkClone && m > 1 && "string" == typeof j && Ya.test(j)) return this.each(function() {
				$(this).domManip(a, c, d)
			});
			if ($.isFunction(j)) return this.each(function(e) {
				var f = $(this);
				a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
			});
			if (this[0]) {
				if (e = $.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, 1 === g.childNodes.length && (g = f), f) for (c = c && $.nodeName(f, "tr"), h = e.cacheable || m - 1; i < m; i++) d.call(c && $.nodeName(this[i], "table") ? l(this[i], "tbody") : this[i], i === h ? g : $.clone(g, !0, !0));
				g = f = null, k.length && $.each(k, function(a, b) {
					b.src ? $.ajax ? $.ajax({
						url: b.src,
						type: "GET",
						dataType: "script",
						async: !1,
						global: !1,
						throws: !0
					}) : $.error("no ajax") : $.globalEval((b.text || b.textContent || b.innerHTML || "").replace($a, "")), b.parentNode && b.parentNode.removeChild(b)
				})
			}
			return this
		}
	}), $.buildFragment = function(a, c, d) {
		var e, f, g, h = a[0];
		return c = c || P, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, 1 === a.length && "string" == typeof h && h.length < 512 && c === P && "<" === h.charAt(0) && !Va.test(h) && ($.support.checkClone || !Ya.test(h)) && ($.support.html5Clone || !Wa.test(h)) && (f = !0, e = $.fragments[h], g = e !== b), e || (e = c.createDocumentFragment(), $.clean(a, c, e, d), f && ($.fragments[h] = g && e)), {
			fragment: e,
			cacheable: f
		}
	}, $.fragments = {}, $.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		$.fn[a] = function(c) {
			var d, e = 0,
				f = [],
				g = $(c),
				h = g.length,
				i = 1 === this.length && this[0].parentNode;
			if ((null == i || i && 11 === i.nodeType && 1 === i.childNodes.length) && 1 === h) return g[b](this[0]), this;
			for (; e < h; e++) d = (e > 0 ? this.clone(!0) : this).get(), $(g[e])[b](d), f = f.concat(d);
			return this.pushStack(f, a, g.selector)
		}
	}), $.extend({
		clone: function(a, b, c) {
			var d, e, f, g;
			if ($.support.html5Clone || $.isXMLDoc(a) || !Wa.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bb.innerHTML = a.outerHTML, bb.removeChild(g = bb.firstChild)), !($.support.noCloneEvent && $.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || $.isXMLDoc(a))) for (n(a, g), d = o(a), e = o(g), f = 0; d[f]; ++f) e[f] && n(d[f], e[f]);
			if (b && (m(a, g), c)) for (d = o(a), e = o(g), f = 0; d[f]; ++f) m(d[f], e[f]);
			return d = e = null, g
		},
		clean: function(a, b, c, d) {
			var e, f, g, h, i, j, l, m, n, o, q, r = b === P && ab,
				s = [];
			for (b && "undefined" != typeof b.createDocumentFragment || (b = P), e = 0; null != (g = a[e]); e++) if ("number" == typeof g && (g += ""), g) {
				if ("string" == typeof g) if (Ta.test(g)) {
					for (r = r || k(b), l = b.createElement("div"), r.appendChild(l), g = g.replace(Qa, "<$1></$2>"), h = (Ra.exec(g) || ["", ""])[1].toLowerCase(), i = _a[h] || _a._default, j = i[0], l.innerHTML = i[1] + g + i[2]; j--;) l = l.lastChild;
					if (!$.support.tbody) for (m = Sa.test(g), n = "table" !== h || m ? "<table>" !== i[1] || m ? [] : l.childNodes : l.firstChild && l.firstChild.childNodes, f = n.length - 1; f >= 0; --f) $.nodeName(n[f], "tbody") && !n[f].childNodes.length && n[f].parentNode.removeChild(n[f]);
					!$.support.leadingWhitespace && Pa.test(g) && l.insertBefore(b.createTextNode(Pa.exec(g)[0]), l.firstChild), g = l.childNodes, l.parentNode.removeChild(l)
				} else g = b.createTextNode(g);
				g.nodeType ? s.push(g) : $.merge(s, g)
			}
			if (l && (g = l = r = null), !$.support.appendChecked) for (e = 0; null != (g = s[e]); e++) $.nodeName(g, "input") ? p(g) : "undefined" != typeof g.getElementsByTagName && $.grep(g.getElementsByTagName("input"), p);
			if (c) for (o = function(a) {
				if (!a.type || Za.test(a.type)) return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a)
			}, e = 0; null != (g = s[e]); e++) $.nodeName(g, "script") && o(g) || (c.appendChild(g), "undefined" != typeof g.getElementsByTagName && (q = $.grep($.merge([], g.getElementsByTagName("script")), o), s.splice.apply(s, [e + 1, 0].concat(q)), e += q.length));
			return s
		},
		cleanData: function(a, b) {
			for (var c, d, e, f, g = 0, h = $.expando, i = $.cache, j = $.support.deleteExpando, k = $.event.special; null != (e = a[g]); g++) if ((b || $.acceptData(e)) && (d = e[h], c = d && i[d])) {
				if (c.events) for (f in c.events) k[f] ? $.event.remove(e, f) : $.removeEvent(e, f, c.handle);
				i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, $.deletedIds.push(d))
			}
		}
	}), function() {
		var a, b;
		$.uaMatch = function(a) {
			a = a.toLowerCase();
			var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
			return {
				browser: b[1] || "",
				version: b[2] || "0"
			}
		}, a = $.uaMatch(R.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0), $.browser = b, $.sub = function() {
			function a(b, c) {
				return new a.fn.init(b, c)
			}
			$.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function c(c, d) {
				return d && d instanceof $ && !(d instanceof a) && (d = a(d)), $.fn.init.call(this, c, d, b)
			}, a.fn.init.prototype = a.fn;
			var b = a(P);
			return a
		}
	}();
	var cb, db, eb, fb = /alpha\([^)]*\)/i,
		gb = /opacity=([^)]*)/,
		hb = /^(top|right|bottom|left)$/,
		ib = /^(none|table(?!-c[ea]).+)/,
		jb = /^margin/,
		kb = new RegExp("^(" + _ + ")(.*)$", "i"),
		lb = new RegExp("^(" + _ + ")(?!px)[a-z%]+$", "i"),
		mb = new RegExp("^([-+])=(" + _ + ")", "i"),
		nb = {},
		ob = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		pb = {
			letterSpacing: 0,
			fontWeight: 400
		},
		qb = ["Top", "Right", "Bottom", "Left"],
		rb = ["Webkit", "O", "Moz", "ms"],
		sb = $.fn.toggle;
	$.fn.extend({
		css: function(a, c) {
			return $.access(this, function(a, c, d) {
				return d !== b ? $.style(a, c, d) : $.css(a, c)
			}, a, c, arguments.length > 1)
		},
		show: function() {
			return s(this, !0)
		},
		hide: function() {
			return s(this)
		},
		toggle: function(a, b) {
			var c = "boolean" == typeof a;
			return $.isFunction(a) && $.isFunction(b) ? sb.apply(this, arguments) : this.each(function() {
				(c ? a : r(this)) ? $(this).show() : $(this).hide()
			})
		}
	}), $.extend({
		cssHooks: {
			opacity: {
				get: function(a, b) {
					if (b) {
						var c = cb(a, "opacity");
						return "" === c ? "1" : c
					}
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			float: $.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(a, c, d, e) {
			if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
				var f, g, h, i = $.camelCase(c),
					j = a.style;
				if (c = $.cssProps[i] || ($.cssProps[i] = q(j, i)), h = $.cssHooks[c] || $.cssHooks[i], d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
				if (g = typeof d, "string" === g && (f = mb.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat($.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" === g && !$.cssNumber[i] && (d += "px"), h && "set" in h && (d = h.set(a, d, e)) === b))) try {
					j[c] = d
				} catch (a) {}
			}
		},
		css: function(a, c, d, e) {
			var f, g, h, i = $.camelCase(c);
			return c = $.cssProps[i] || ($.cssProps[i] = q(a.style, i)), h = $.cssHooks[c] || $.cssHooks[i], h && "get" in h && (f = h.get(a, !0, e)), f === b && (f = cb(a, c)), "normal" === f && c in pb && (f = pb[c]), d || e !== b ? (g = parseFloat(f), d || $.isNumeric(g) ? g || 0 : f) : f
		},
		swap: function(a, b, c) {
			var d, e, f = {};
			for (e in b) f[e] = a.style[e], a.style[e] = b[e];
			d = c.call(a);
			for (e in b) a.style[e] = f[e];
			return d
		}
	}), a.getComputedStyle ? cb = function(b, c) {
		var d, e, f, g, h = a.getComputedStyle(b, null),
			i = b.style;
		return h && (d = h[c], "" === d && !$.contains(b.ownerDocument, b) && (d = $.style(b, c)), lb.test(d) && jb.test(c) && (e = i.width, f = i.minWidth, g = i.maxWidth, i.minWidth = i.maxWidth = i.width = d, d = h.width, i.width = e, i.minWidth = f, i.maxWidth = g)), d
	} : P.documentElement.currentStyle && (cb = function(a, b) {
		var c, d, e = a.currentStyle && a.currentStyle[b],
			f = a.style;
		return null == e && f && f[b] && (e = f[b]), lb.test(e) && !hb.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = "fontSize" === b ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), "" === e ? "auto" : e
	}), $.each(["height", "width"], function(a, b) {
		$.cssHooks[b] = {
			get: function(a, c, d) {
				if (c) return 0 === a.offsetWidth && ib.test(cb(a, "display")) ? $.swap(a, ob, function() {
					return v(a, b, d)
				}) : v(a, b, d)
			},
			set: function(a, c, d) {
				return t(a, c, d ? u(a, b, d, $.support.boxSizing && "border-box" === $.css(a, "boxSizing")) : 0)
			}
		}
	}), $.support.opacity || ($.cssHooks.opacity = {
		get: function(a, b) {
			return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
		},
		set: function(a, b) {
			var c = a.style,
				d = a.currentStyle,
				e = $.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
				f = d && d.filter || c.filter || "";
			c.zoom = 1, b >= 1 && "" === $.trim(f.replace(fb, "")) && c.removeAttribute && (c.removeAttribute("filter"), d && !d.filter) || (c.filter = fb.test(f) ? f.replace(fb, e) : f + " " + e)
		}
	}), $(function() {
		$.support.reliableMarginRight || ($.cssHooks.marginRight = {
			get: function(a, b) {
				return $.swap(a, {
					display: "inline-block"
				}, function() {
					if (b) return cb(a, "marginRight")
				})
			}
		}), !$.support.pixelPosition && $.fn.position && $.each(["top", "left"], function(a, b) {
			$.cssHooks[b] = {
				get: function(a, c) {
					if (c) {
						var d = cb(a, b);
						return lb.test(d) ? $(a).position()[b] + "px" : d
					}
				}
			}
		})
	}), $.expr && $.expr.filters && ($.expr.filters.hidden = function(a) {
		return 0 === a.offsetWidth && 0 === a.offsetHeight || !$.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || cb(a, "display"))
	}, $.expr.filters.visible = function(a) {
		return !$.expr.filters.hidden(a)
	}), $.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(a, b) {
		$.cssHooks[a + b] = {
			expand: function(c) {
				var d, e = "string" == typeof c ? c.split(" ") : [c],
					f = {};
				for (d = 0; d < 4; d++) f[a + qb[d] + b] = e[d] || e[d - 2] || e[0];
				return f
			}
		}, jb.test(a) || ($.cssHooks[a + b].set = t)
	});
	var tb = /%20/g,
		ub = /\[\]$/,
		vb = /\r?\n/g,
		wb = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		xb = /^(?:select|textarea)/i;
	$.fn.extend({
		serialize: function() {
			return $.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? $.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || xb.test(this.nodeName) || wb.test(this.type))
			}).map(function(a, b) {
				var c = $(this).val();
				return null == c ? null : $.isArray(c) ? $.map(c, function(a, c) {
					return {
						name: b.name,
						value: a.replace(vb, "\r\n")
					}
				}) : {
					name: b.name,
					value: c.replace(vb, "\r\n")
				}
			}).get()
		}
	}), $.param = function(a, c) {
		var d, e = [],
			f = function(a, b) {
				b = $.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
			};
		if (c === b && (c = $.ajaxSettings && $.ajaxSettings.traditional), $.isArray(a) || a.jquery && !$.isPlainObject(a)) $.each(a, function() {
			f(this.name, this.value)
		});
		else for (d in a) x(d, a[d], c, f);
		return e.join("&").replace(tb, "+")
	};
	var yb, zb, Ab = /#.*$/,
		Bb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Cb = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		Db = /^(?:GET|HEAD)$/,
		Eb = /^\/\//,
		Fb = /\?/,
		Gb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		Hb = /([?&])_=[^&]*/,
		Ib = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		Jb = $.fn.load,
		Kb = {},
		Lb = {},
		Mb = ["*/"] + ["*"];
	try {
		zb = Q.href
	} catch (a) {
		zb = P.createElement("a"), zb.href = "", zb = zb.href
	}
	yb = Ib.exec(zb.toLowerCase()) || [], $.fn.load = function(a, c, d) {
		if ("string" != typeof a && Jb) return Jb.apply(this, arguments);
		if (!this.length) return this;
		var e, f, g, h = this,
			i = a.indexOf(" ");
		return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), $.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (f = "POST"), $.ajax({
			url: a,
			type: f,
			dataType: "html",
			data: c,
			complete: function(a, b) {
				d && h.each(d, g || [a.responseText, b, a])
			}
		}).done(function(a) {
			g = arguments, h.html(e ? $("<div>").append(a.replace(Gb, "")).find(e) : a)
		}), this
	}, $.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
		$.fn[b] = function(a) {
			return this.on(b, a)
		}
	}), $.each(["get", "post"], function(a, c) {
		$[c] = function(a, d, e, f) {
			return $.isFunction(d) && (f = f || e, e = d, d = b), $.ajax({
				type: c,
				url: a,
				data: d,
				success: e,
				dataType: f
			})
		}
	}), $.extend({
		getScript: function(a, c) {
			return $.get(a, b, c, "script")
		},
		getJSON: function(a, b, c) {
			return $.get(a, b, c, "json")
		},
		ajaxSetup: function(a, b) {
			return b ? A(a, $.ajaxSettings) : (b = a, a = $.ajaxSettings), A(a, b), a
		},
		ajaxSettings: {
			url: zb,
			isLocal: Cb.test(yb[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": Mb
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": a.String,
				"text html": !0,
				"text json": $.parseJSON,
				"text xml": $.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: y(Kb),
		ajaxTransport: y(Lb),
		ajax: function(a, c) {
			function d(a, c, d, g) {
				var j, l, s, t, v, x = c;
				2 !== u && (u = 2, i && clearTimeout(i), h = b, f = g || "", w.readyState = a > 0 ? 4 : 0, d && (t = B(m, w, d)), a >= 200 && a < 300 || 304 === a ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && ($.lastModified[e] = v), v = w.getResponseHeader("Etag"), v && ($.etag[e] = v)), 304 === a ? (x = "notmodified", j = !0) : (j = C(m, t), x = j.state, l = j.data, s = j.error, j = !s)) : (s = x, x && !a || (x = "error", a < 0 && (a = 0))), w.status = a, w.statusText = (c || x) + "", j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, k && o.trigger("ajax" + (j ? "Success" : "Error"), [w, m, j ? l : s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --$.active || $.event.trigger("ajaxStop")))
			}
			"object" == typeof a && (c = a, a = b), c = c || {};
			var e, f, g, h, i, j, k, l, m = $.ajaxSetup({}, c),
				n = m.context || m,
				o = n !== m && (n.nodeType || n instanceof $) ? $(n) : $.event,
				p = $.Deferred(),
				q = $.Callbacks("once memory"),
				r = m.statusCode || {},
				s = {},
				t = {},
				u = 0,
				v = "canceled",
				w = {
					readyState: 0,
					setRequestHeader: function(a, b) {
						if (!u) {
							var c = a.toLowerCase();
							a = t[c] = t[c] || a, s[a] = b
						}
						return this
					},
					getAllResponseHeaders: function() {
						return 2 === u ? f : null
					},
					getResponseHeader: function(a) {
						var c;
						if (2 === u) {
							if (!g) for (g = {}; c = Bb.exec(f);) g[c[1].toLowerCase()] = c[2];
							c = g[a.toLowerCase()]
						}
						return c === b ? null : c
					},
					overrideMimeType: function(a) {
						return u || (m.mimeType = a), this
					},
					abort: function(a) {
						return a = a || v, h && h.abort(a), d(0, a), this
					}
				};
			if (p.promise(w), w.success = w.done, w.error = w.fail, w.complete = q.add, w.statusCode = function(a) {
				if (a) {
					var b;
					if (u < 2) for (b in a) r[b] = [r[b], a[b]];
					else b = a[w.status], w.always(b)
				}
				return this
			}, m.url = ((a || m.url) + "").replace(Ab, "").replace(Eb, yb[1] + "//"), m.dataTypes = $.trim(m.dataType || "*").toLowerCase().split(ba), null == m.crossDomain && (j = Ib.exec(m.url.toLowerCase()) || !1, m.crossDomain = j && j.join(":") + (j[3] ? "" : "http:" === j[1] ? 80 : 443) !== yb.join(":") + (yb[3] ? "" : "http:" === yb[1] ? 80 : 443)), m.data && m.processData && "string" != typeof m.data && (m.data = $.param(m.data, m.traditional)), z(Kb, m, c, w), 2 === u) return w;
			if (k = m.global, m.type = m.type.toUpperCase(), m.hasContent = !Db.test(m.type), k && 0 === $.active++ && $.event.trigger("ajaxStart"), !m.hasContent && (m.data && (m.url += (Fb.test(m.url) ? "&" : "?") + m.data, delete m.data), e = m.url, m.cache === !1)) {
				var x = $.now(),
					y = m.url.replace(Hb, "$1_=" + x);
				m.url = y + (y === m.url ? (Fb.test(m.url) ? "&" : "?") + "_=" + x : "")
			}(m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), m.ifModified && (e = e || m.url, $.lastModified[e] && w.setRequestHeader("If-Modified-Since", $.lastModified[e]), $.etag[e] && w.setRequestHeader("If-None-Match", $.etag[e])), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Mb + "; q=0.01" : "") : m.accepts["*"]);
			for (l in m.headers) w.setRequestHeader(l, m.headers[l]);
			if (!m.beforeSend || m.beforeSend.call(n, w, m) !== !1 && 2 !== u) {
				v = "abort";
				for (l in {
					success: 1,
					error: 1,
					complete: 1
				}) w[l](m[l]);
				if (h = z(Lb, m, c, w)) {
					w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function() {
						w.abort("timeout")
					}, m.timeout));
					try {
						u = 1, h.send(s, d)
					} catch (a) {
						if (!(u < 2)) throw a;
						d(-1, a)
					}
				} else d(-1, "No Transport");
				return w
			}
			return w.abort()
		},
		active: 0,
		lastModified: {},
		etag: {}
	});
	var Nb = [],
		Ob = /\?/,
		Pb = /(=)\?(?=&|$)|\?\?/,
		Qb = $.now();
	$.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var a = Nb.pop() || $.expando + "_" + Qb++;
			return this[a] = !0, a
		}
	}), $.ajaxPrefilter("json jsonp", function(c, d, e) {
		var f, g, h, i = c.data,
			j = c.url,
			k = c.jsonp !== !1,
			l = k && Pb.test(j),
			m = k && !l && "string" == typeof i && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Pb.test(i);
		if ("jsonp" === c.dataTypes[0] || l || m) return f = c.jsonpCallback = $.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(Pb, "$1" + f) : m ? c.data = i.replace(Pb, "$1" + f) : k && (c.url += (Ob.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
			return h || $.error(f + " was not called"), h[0]
		}, c.dataTypes[0] = "json", a[f] = function() {
			h = arguments
		}, e.always(function() {
			a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Nb.push(f)), h && $.isFunction(g) && g(h[0]), h = g = b
		}), "script"
	}), $.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function(a) {
				return $.globalEval(a), a
			}
		}
	}), $.ajaxPrefilter("script", function(a) {
		a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
	}), $.ajaxTransport("script", function(a) {
		if (a.crossDomain) {
			var c, d = P.head || P.getElementsByTagName("head")[0] || P.documentElement;
			return {
				send: function(e, f) {
					c = P.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function(a, e) {
						(e || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success"))
					}, d.insertBefore(c, d.firstChild)
				},
				abort: function() {
					c && c.onload(0, 1)
				}
			}
		}
	});
	var Rb, Sb = !! a.ActiveXObject &&
	function() {
		for (var a in Rb) Rb[a](0, 1)
	}, Tb = 0;
	$.ajaxSettings.xhr = a.ActiveXObject ?
	function() {
		return !this.isLocal && D() || E()
	} : D, function(a) {
		$.extend($.support, {
			ajax: !! a,
			cors: !! a && "withCredentials" in a
		})
	}($.ajaxSettings.xhr()), $.support.ajax && $.ajaxTransport(function(c) {
		if (!c.crossDomain || $.support.cors) {
			var d;
			return {
				send: function(e, f) {
					var g, h, i = c.xhr();
					if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields) for (h in c.xhrFields) i[h] = c.xhrFields[h];
					c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (h in e) i.setRequestHeader(h, e[h])
					} catch (a) {}
					i.send(c.hasContent && c.data || null), d = function(a, e) {
						var h, j, k, l, m;
						try {
							if (d && (e || 4 === i.readyState)) if (d = b, g && (i.onreadystatechange = $.noop, Sb && delete Rb[g]), e) 4 !== i.readyState && i.abort();
							else {
								h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m);
								try {
									l.text = i.responseText
								} catch (a) {}
								try {
									j = i.statusText
								} catch (a) {
									j = ""
								}
								h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
							}
						} catch (a) {
							e || f(-1, a)
						}
						l && f(h, j, l, k)
					}, c.async ? 4 === i.readyState ? setTimeout(d, 0) : (g = ++Tb, Sb && (Rb || (Rb = {}, $(a).unload(Sb)), Rb[g] = d), i.onreadystatechange = d) : d()
				},
				abort: function() {
					d && d(0, 1)
				}
			}
		}
	});
	var Ub, Vb, Wb = /^(?:toggle|show|hide)$/,
		Xb = new RegExp("^(?:([-+])=|)(" + _ + ")([a-z%]*)$", "i"),
		Yb = /queueHooks$/,
		Zb = [J],
		$b = {
			"*": [function(a, b) {
				var c, d, e = this.createTween(a, b),
					f = Xb.exec(b),
					g = e.cur(),
					h = +g || 0,
					i = 1,
					j = 20;
				if (f) {
					if (c = +f[2], d = f[3] || ($.cssNumber[a] ? "" : "px"), "px" !== d && h) {
						h = $.css(e.elem, a, !0) || c || 1;
						do i = i || ".5", h /= i, $.style(e.elem, a, h + d);
						while (i !== (i = e.cur() / g) && 1 !== i && --j)
					}
					e.unit = d, e.start = h, e.end = f[1] ? h + (f[1] + 1) * c : c
				}
				return e
			}]
		};
	$.Animation = $.extend(H, {
		tweener: function(a, b) {
			$.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
			for (var c, d = 0, e = a.length; d < e; d++) c = a[d], $b[c] = $b[c] || [], $b[c].unshift(b)
		},
		prefilter: function(a, b) {
			b ? Zb.unshift(a) : Zb.push(a)
		}
	}), $.Tween = K, K.prototype = {
		constructor: K,
		init: function(a, b, c, d, e, f) {
			this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || ($.cssNumber[c] ? "" : "px")
		},
		cur: function() {
			var a = K.propHooks[this.prop];
			return a && a.get ? a.get(this) : K.propHooks._default.get(this)
		},
		run: function(a) {
			var b, c = K.propHooks[this.prop];
			return this.options.duration ? this.pos = b = $.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this
		}
	}, K.prototype.init.prototype = K.prototype, K.propHooks = {
		_default: {
			get: function(a) {
				var b;
				return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = $.css(a.elem, a.prop, !1, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
			},
			set: function(a) {
				$.fx.step[a.prop] ? $.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[$.cssProps[a.prop]] || $.cssHooks[a.prop]) ? $.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
			}
		}
	}, K.propHooks.scrollTop = K.propHooks.scrollLeft = {
		set: function(a) {
			a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
		}
	}, $.each(["toggle", "show", "hide"], function(a, b) {
		var c = $.fn[b];
		$.fn[b] = function(d, e, f) {
			return null == d || "boolean" == typeof d || !a && $.isFunction(d) && $.isFunction(e) ? c.apply(this, arguments) : this.animate(L(b, !0), d, e, f)
		}
	}), $.fn.extend({
		fadeTo: function(a, b, c, d) {
			return this.filter(r).css("opacity", 0).show().end().animate({
				opacity: b
			}, a, c, d)
		},
		animate: function(a, b, c, d) {
			var e = $.isEmptyObject(a),
				f = $.speed(b, c, d),
				g = function() {
					var b = H(this, $.extend({}, a), f);
					e && b.stop(!0)
				};
			return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
		},
		stop: function(a, c, d) {
			var e = function(a) {
					var b = a.stop;
					delete a.stop, b(d)
				};
			return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
				var b = !0,
					c = null != a && a + "queueHooks",
					f = $.timers,
					g = $._data(this);
				if (c) g[c] && g[c].stop && e(g[c]);
				else for (c in g) g[c] && g[c].stop && Yb.test(c) && e(g[c]);
				for (c = f.length; c--;) f[c].elem === this && (null == a || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1));
				(b || !d) && $.dequeue(this, a)
			})
		}
	}), $.each({
		slideDown: L("show"),
		slideUp: L("hide"),
		slideToggle: L("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(a, b) {
		$.fn[a] = function(a, c, d) {
			return this.animate(b, a, c, d)
		}
	}), $.speed = function(a, b, c) {
		var d = a && "object" == typeof a ? $.extend({}, a) : {
			complete: c || !c && b || $.isFunction(a) && a,
			duration: a,
			easing: c && b || b && !$.isFunction(b) && b
		};
		return d.duration = $.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in $.fx.speeds ? $.fx.speeds[d.duration] : $.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
			$.isFunction(d.old) && d.old.call(this), d.queue && $.dequeue(this, d.queue)
		}, d
	}, $.easing = {
		linear: function(a) {
			return a
		},
		swing: function(a) {
			return .5 - Math.cos(a * Math.PI) / 2
		}
	}, $.timers = [], $.fx = K.prototype.init, $.fx.tick = function() {
		for (var a, b = $.timers, c = 0; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
		b.length || $.fx.stop()
	}, $.fx.timer = function(a) {
		a() && $.timers.push(a) && !Vb && (Vb = setInterval($.fx.tick, $.fx.interval))
	}, $.fx.interval = 13, $.fx.stop = function() {
		clearInterval(Vb), Vb = null
	}, $.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, $.fx.step = {}, $.expr && $.expr.filters && ($.expr.filters.animated = function(a) {
		return $.grep($.timers, function(b) {
			return a === b.elem
		}).length
	});
	var _b = /^(?:body|html)$/i;
	$.fn.offset = function(a) {
		if (arguments.length) return a === b ? this : this.each(function(b) {
			$.offset.setOffset(this, a, b)
		});
		var c, d, e, f, g, h, i, j = {
			top: 0,
			left: 0
		},
			k = this[0],
			l = k && k.ownerDocument;
		if (l) return (d = l.body) === k ? $.offset.bodyOffset(k) : (c = l.documentElement, $.contains(c, k) ? ("undefined" != typeof k.getBoundingClientRect && (j = k.getBoundingClientRect()), e = M(l), f = c.clientTop || d.clientTop || 0, g = c.clientLeft || d.clientLeft || 0, h = e.pageYOffset || c.scrollTop, i = e.pageXOffset || c.scrollLeft, {
			top: j.top + h - f,
			left: j.left + i - g
		}) : j)
	}, $.offset = {
		bodyOffset: function(a) {
			var b = a.offsetTop,
				c = a.offsetLeft;
			return $.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat($.css(a, "marginTop")) || 0, c += parseFloat($.css(a, "marginLeft")) || 0), {
				top: b,
				left: c
			}
		},
		setOffset: function(a, b, c) {
			var d = $.css(a, "position");
			"static" === d && (a.style.position = "relative");
			var e, f, g = $(a),
				h = g.offset(),
				i = $.css(a, "top"),
				j = $.css(a, "left"),
				k = ("absolute" === d || "fixed" === d) && $.inArray("auto", [i, j]) > -1,
				l = {},
				m = {};
			k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), $.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), "using" in b ? b.using.call(a, l) : g.css(l)
		}
	}, $.fn.extend({
		position: function() {
			if (this[0]) {
				var a = this[0],
					b = this.offsetParent(),
					c = this.offset(),
					d = _b.test(b[0].nodeName) ? {
						top: 0,
						left: 0
					} : b.offset();
				return c.top -= parseFloat($.css(a, "marginTop")) || 0, c.left -= parseFloat($.css(a, "marginLeft")) || 0, d.top += parseFloat($.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat($.css(b[0], "borderLeftWidth")) || 0, {
					top: c.top - d.top,
					left: c.left - d.left
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var a = this.offsetParent || P.body; a && !_b.test(a.nodeName) && "static" === $.css(a, "position");) a = a.offsetParent;
				return a || P.body
			})
		}
	}), $.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(a, c) {
		var d = /Y/.test(c);
		$.fn[a] = function(e) {
			return $.access(this, function(a, e, f) {
				var g = M(a);
				return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : void(g ? g.scrollTo(d ? $(g).scrollLeft() : f, d ? f : $(g).scrollTop()) : a[e] = f)
			}, a, e, arguments.length, null)
		}
	}), $.each({
		Height: "height",
		Width: "width"
	}, function(a, c) {
		$.each({
			padding: "inner" + a,
			content: c,
			"": "outer" + a
		}, function(d, e) {
			$.fn[e] = function(e, f) {
				var g = arguments.length && (d || "boolean" != typeof e),
					h = d || (e === !0 || f === !0 ? "margin" : "border");
				return $.access(this, function(c, d, e) {
					var f;
					return $.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? $.css(c, d, e, h) : $.style(c, d, e, h)
				}, c, g ? e : b, g, null)
			}
		})
	}), a.jQuery = a.$ = $, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return $
	})
}(window), function(a, b) {
	"function" == typeof define && define.amd ? define([], b) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = b() : (a.dcodeIO = a.dcodeIO || {}).Long = b()
}(this, function() {
	"use strict";

	function a(a, b, c) {
		this.low = 0 | a, this.high = 0 | b, this.unsigned = !! c
	}
	a.__isLong__;
	try {
		Object.defineProperty(a.prototype, "__isLong__", {
			value: !0,
			enumerable: !1,
			configurable: !1
		})
	} catch (a) {}
	a.isLong = function(a) {
		return (a && a.__isLong__) === !0
	};
	var b = {},
		c = {};
	a.fromInt = function(d, e) {
		var f, g;
		return e ? (d >>>= 0, 0 <= d && d < 256 && (g = c[d]) ? g : (f = new a(d, (0 | d) < 0 ? -1 : 0, !0), 0 <= d && d < 256 && (c[d] = f), f)) : (d |= 0, -128 <= d && d < 128 && (g = b[d]) ? g : (f = new a(d, d < 0 ? -1 : 0, !1), -128 <= d && d < 128 && (b[d] = f), f))
	}, a.fromNumber = function(b, c) {
		return c = !! c, isNaN(b) || !isFinite(b) ? a.ZERO : !c && b <= -g ? a.MIN_VALUE : !c && b + 1 >= g ? a.MAX_VALUE : c && b >= f ? a.MAX_UNSIGNED_VALUE : b < 0 ? a.fromNumber(-b, c).negate() : new a(b % e | 0, b / e | 0, c)
	}, a.fromBits = function(b, c, d) {
		return new a(b, c, d)
	}, a.fromString = function(b, c, d) {
		if (0 === b.length) throw Error("number format error: empty string");
		if ("NaN" === b || "Infinity" === b || "+Infinity" === b || "-Infinity" === b) return a.ZERO;
		if ("number" == typeof c && (d = c, c = !1), d = d || 10, d < 2 || 36 < d) throw Error("radix out of range: " + d);
		var e;
		if ((e = b.indexOf("-")) > 0) throw Error('number format error: interior "-" character: ' + b);
		if (0 === e) return a.fromString(b.substring(1), c, d).negate();
		for (var f = a.fromNumber(Math.pow(d, 8)), g = a.ZERO, h = 0; h < b.length; h += 8) {
			var i = Math.min(8, b.length - h),
				j = parseInt(b.substring(h, h + i), d);
			if (i < 8) {
				var k = a.fromNumber(Math.pow(d, i));
				g = g.multiply(k).add(a.fromNumber(j))
			} else g = g.multiply(f), g = g.add(a.fromNumber(j))
		}
		return g.unsigned = c, g
	}, a.fromValue = function(b) {
		return b instanceof a ? b : "number" == typeof b ? a.fromNumber(b) : "string" == typeof b ? a.fromString(b) : new a(b.low, b.high, b.unsigned)
	};
	var d = 1 << 24,
		e = 4294967296,
		f = 0x10000000000000000,
		g = f / 2,
		h = a.fromInt(d);
	return a.ZERO = a.fromInt(0), a.UZERO = a.fromInt(0, !0), a.ONE = a.fromInt(1), a.UONE = a.fromInt(1, !0), a.NEG_ONE = a.fromInt(-1), a.MAX_VALUE = a.fromBits(-1, 2147483647, !1), a.MAX_UNSIGNED_VALUE = a.fromBits(-1, -1, !0), a.MIN_VALUE = a.fromBits(0, -2147483648, !1), a.prototype.toInt = function() {
		return this.unsigned ? this.low >>> 0 : this.low
	}, a.prototype.toNumber = function() {
		return this.unsigned ? (this.high >>> 0) * e + (this.low >>> 0) : this.high * e + (this.low >>> 0)
	}, a.prototype.toString = function(b) {
		if (b = b || 10, b < 2 || 36 < b) throw RangeError("radix out of range: " + b);
		if (this.isZero()) return "0";
		var c;
		if (this.isNegative()) {
			if (this.equals(a.MIN_VALUE)) {
				var d = a.fromNumber(b),
					e = this.divide(d);
				return c = e.multiply(d).subtract(this), e.toString(b) + c.toInt().toString(b)
			}
			return "-" + this.negate().toString(b)
		}
		var f = a.fromNumber(Math.pow(b, 6), this.unsigned);
		c = this;
		for (var g = "";;) {
			var h = c.divide(f),
				i = c.subtract(h.multiply(f)).toInt() >>> 0,
				j = i.toString(b);
			if (c = h, c.isZero()) return j + g;
			for (; j.length < 6;) j = "0" + j;
			g = "" + j + g
		}
	}, a.prototype.getHighBits = function() {
		return this.high
	}, a.prototype.getHighBitsUnsigned = function() {
		return this.high >>> 0
	}, a.prototype.getLowBits = function() {
		return this.low
	}, a.prototype.getLowBitsUnsigned = function() {
		return this.low >>> 0
	}, a.prototype.getNumBitsAbs = function() {
		if (this.isNegative()) return this.equals(a.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
		for (var b = 0 != this.high ? this.high : this.low, c = 31; c > 0 && 0 == (b & 1 << c); c--);
		return 0 != this.high ? c + 33 : c + 1
	}, a.prototype.isZero = function() {
		return 0 === this.high && 0 === this.low
	}, a.prototype.isNegative = function() {
		return !this.unsigned && this.high < 0
	}, a.prototype.isPositive = function() {
		return this.unsigned || this.high >= 0
	}, a.prototype.isOdd = function() {
		return 1 === (1 & this.low)
	}, a.prototype.isEven = function() {
		return 0 === (1 & this.low)
	}, a.prototype.equals = function(b) {
		return a.isLong(b) || (b = a.fromValue(b)), (this.unsigned === b.unsigned || this.high >>> 31 !== 1 || b.high >>> 31 !== 1) && (this.high === b.high && this.low === b.low)
	}, a.eq = a.prototype.equals, a.prototype.notEquals = function(a) {
		return !this.equals(a)
	}, a.neq = a.prototype.notEquals, a.prototype.lessThan = function(a) {
		return this.compare(a) < 0
	}, a.prototype.lt = a.prototype.lessThan, a.prototype.lessThanOrEqual = function(a) {
		return this.compare(a) <= 0
	}, a.prototype.lte = a.prototype.lessThanOrEqual, a.prototype.greaterThan = function(a) {
		return this.compare(a) > 0
	}, a.prototype.gt = a.prototype.greaterThan, a.prototype.greaterThanOrEqual = function(a) {
		return this.compare(a) >= 0
	}, a.prototype.gte = a.prototype.greaterThanOrEqual, a.prototype.compare = function(b) {
		if (a.isLong(b) || (b = a.fromValue(b)), this.equals(b)) return 0;
		var c = this.isNegative(),
			d = b.isNegative();
		return c && !d ? -1 : !c && d ? 1 : this.unsigned ? b.high >>> 0 > this.high >>> 0 || b.high === this.high && b.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.subtract(b).isNegative() ? -1 : 1
	}, a.prototype.negate = function() {
		return !this.unsigned && this.equals(a.MIN_VALUE) ? a.MIN_VALUE : this.not().add(a.ONE)
	}, a.prototype.neg = a.prototype.negate, a.prototype.add = function(b) {
		a.isLong(b) || (b = a.fromValue(b));
		var c = this.high >>> 16,
			d = 65535 & this.high,
			e = this.low >>> 16,
			f = 65535 & this.low,
			g = b.high >>> 16,
			h = 65535 & b.high,
			i = b.low >>> 16,
			j = 65535 & b.low,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
		return n += f + j, m += n >>> 16, n &= 65535, m += e + i, l += m >>> 16, m &= 65535, l += d + h, k += l >>> 16, l &= 65535, k += c + g, k &= 65535, a.fromBits(m << 16 | n, k << 16 | l, this.unsigned)
	}, a.prototype.subtract = function(b) {
		return a.isLong(b) || (b = a.fromValue(b)), this.add(b.negate())
	}, a.prototype.sub = a.prototype.subtract, a.prototype.multiply = function(b) {
		if (this.isZero()) return a.ZERO;
		if (a.isLong(b) || (b = a.fromValue(b)), b.isZero()) return a.ZERO;
		if (this.equals(a.MIN_VALUE)) return b.isOdd() ? a.MIN_VALUE : a.ZERO;
		if (b.equals(a.MIN_VALUE)) return this.isOdd() ? a.MIN_VALUE : a.ZERO;
		if (this.isNegative()) return b.isNegative() ? this.negate().multiply(b.negate()) : this.negate().multiply(b).negate();
		if (b.isNegative()) return this.multiply(b.negate()).negate();
		if (this.lessThan(h) && b.lessThan(h)) return a.fromNumber(this.toNumber() * b.toNumber(), this.unsigned);
		var c = this.high >>> 16,
			d = 65535 & this.high,
			e = this.low >>> 16,
			f = 65535 & this.low,
			g = b.high >>> 16,
			i = 65535 & b.high,
			j = b.low >>> 16,
			k = 65535 & b.low,
			l = 0,
			m = 0,
			n = 0,
			o = 0;
		return o += f * k, n += o >>> 16, o &= 65535, n += e * k, m += n >>> 16, n &= 65535, n += f * j, m += n >>> 16, n &= 65535, m += d * k, l += m >>> 16, m &= 65535, m += e * j, l += m >>> 16, m &= 65535, m += f * i, l += m >>> 16, m &= 65535, l += c * k + d * j + e * i + f * g, l &= 65535, a.fromBits(n << 16 | o, l << 16 | m, this.unsigned)
	}, a.prototype.mul = a.prototype.multiply, a.prototype.divide = function(b) {
		if (a.isLong(b) || (b = a.fromValue(b)), b.isZero()) throw new Error("division by zero");
		if (this.isZero()) return this.unsigned ? a.UZERO : a.ZERO;
		var c, d, e;
		if (this.equals(a.MIN_VALUE)) {
			if (b.equals(a.ONE) || b.equals(a.NEG_ONE)) return a.MIN_VALUE;
			if (b.equals(a.MIN_VALUE)) return a.ONE;
			var f = this.shiftRight(1);
			return c = f.divide(b).shiftLeft(1), c.equals(a.ZERO) ? b.isNegative() ? a.ONE : a.NEG_ONE : (d = this.subtract(b.multiply(c)), e = c.add(d.divide(b)))
		}
		if (b.equals(a.MIN_VALUE)) return this.unsigned ? a.UZERO : a.ZERO;
		if (this.isNegative()) return b.isNegative() ? this.negate().divide(b.negate()) : this.negate().divide(b).negate();
		if (b.isNegative()) return this.divide(b.negate()).negate();
		for (e = a.ZERO, d = this; d.greaterThanOrEqual(b);) {
			c = Math.max(1, Math.floor(d.toNumber() / b.toNumber()));
			for (var g = Math.ceil(Math.log(c) / Math.LN2), h = g <= 48 ? 1 : Math.pow(2, g - 48), i = a.fromNumber(c), j = i.multiply(b); j.isNegative() || j.greaterThan(d);) c -= h, i = a.fromNumber(c, this.unsigned), j = i.multiply(b);
			i.isZero() && (i = a.ONE), e = e.add(i), d = d.subtract(j)
		}
		return e
	}, a.prototype.div = a.prototype.divide, a.prototype.modulo = function(b) {
		return a.isLong(b) || (b = a.fromValue(b)), this.subtract(this.divide(b).multiply(b))
	}, a.prototype.mod = a.prototype.modulo, a.prototype.not = function() {
		return a.fromBits(~this.low, ~this.high, this.unsigned)
	}, a.prototype.and = function(b) {
		return a.isLong(b) || (b = a.fromValue(b)), a.fromBits(this.low & b.low, this.high & b.high, this.unsigned)
	}, a.prototype.or = function(b) {
		return a.isLong(b) || (b = a.fromValue(b)), a.fromBits(this.low | b.low, this.high | b.high, this.unsigned)
	}, a.prototype.xor = function(b) {
		return a.isLong(b) || (b = a.fromValue(b)), a.fromBits(this.low ^ b.low, this.high ^ b.high, this.unsigned)
	}, a.prototype.shiftLeft = function(b) {
		return a.isLong(b) && (b = b.toInt()), 0 === (b &= 63) ? this : b < 32 ? a.fromBits(this.low << b, this.high << b | this.low >>> 32 - b, this.unsigned) : a.fromBits(0, this.low << b - 32, this.unsigned)
	}, a.prototype.shl = a.prototype.shiftLeft, a.prototype.shiftRight = function(b) {
		return a.isLong(b) && (b = b.toInt()), 0 === (b &= 63) ? this : b < 32 ? a.fromBits(this.low >>> b | this.high << 32 - b, this.high >> b, this.unsigned) : a.fromBits(this.high >> b - 32, this.high >= 0 ? 0 : -1, this.unsigned)
	}, a.prototype.shr = a.prototype.shiftRight, a.prototype.shiftRightUnsigned = function(b) {
		if (a.isLong(b) && (b = b.toInt()), b &= 63, 0 === b) return this;
		var c = this.high;
		if (b < 32) {
			var d = this.low;
			return a.fromBits(d >>> b | c << 32 - b, c >>> b, this.unsigned)
		}
		return 32 === b ? a.fromBits(c, 0, this.unsigned) : a.fromBits(c >>> b - 32, 0, this.unsigned)
	}, a.prototype.shru = a.prototype.shiftRightUnsigned, a.prototype.toSigned = function() {
		return this.unsigned ? new a(this.low, this.high, !1) : this
	}, a.prototype.toUnsigned = function() {
		return this.unsigned ? this : new a(this.low, this.high, !0)
	}, a
}), function(a, b) {
	"function" == typeof define && define.amd ? define(["long"], b) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = function() {
		var a;
		try {
			a = require("long")
		} catch (a) {}
		return b(a)
	}() : (a.dcodeIO = a.dcodeIO || {}).ByteBuffer = b(a.dcodeIO.Long)
}(this, function(a) {
	"use strict";

	function b(a) {
		var b = 0;
		return function() {
			return b < a.length ? a.charCodeAt(b++) : null
		}
	}
	function c() {
		var a = [],
			b = [];
		return function() {
			return 0 === arguments.length ? b.join("") + i.apply(String, a) : (a.length + arguments.length > 1024 && (b.push(i.apply(String, a)), a.length = 0), void Array.prototype.push.apply(a, arguments))
		}
	}
	function d(a, b, c, d, e) {
		var f, g, h = 8 * e - d - 1,
			i = (1 << h) - 1,
			j = i >> 1,
			k = -7,
			l = c ? e - 1 : 0,
			m = c ? -1 : 1,
			n = a[b + l];
		for (l += m, f = n & (1 << -k) - 1, n >>= -k, k += h; k > 0; f = 256 * f + a[b + l], l += m, k -= 8);
		for (g = f & (1 << -k) - 1, f >>= -k, k += d; k > 0; g = 256 * g + a[b + l], l += m, k -= 8);
		if (0 === f) f = 1 - j;
		else {
			if (f === i) return g ? NaN : (n ? -1 : 1) * (1 / 0);
			g += Math.pow(2, d), f -= j
		}
		return (n ? -1 : 1) * g * Math.pow(2, f - d)
	}
	function e(a, b, c, d, e, f) {
		var g, h, i, j = 8 * f - e - 1,
			k = (1 << j) - 1,
			l = k >> 1,
			m = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
			n = d ? 0 : f - 1,
			o = d ? 1 : -1,
			p = b < 0 || 0 === b && 1 / b < 0 ? 1 : 0;
		for (b = Math.abs(b), isNaN(b) || b === 1 / 0 ? (h = isNaN(b) ? 1 : 0, g = k) : (g = Math.floor(Math.log(b) / Math.LN2), b * (i = Math.pow(2, -g)) < 1 && (g--, i *= 2), b += g + l >= 1 ? m / i : m * Math.pow(2, 1 - l), b * i >= 2 && (g++, i /= 2), g + l >= k ? (h = 0, g = k) : g + l >= 1 ? (h = (b * i - 1) * Math.pow(2, e), g += l) : (h = b * Math.pow(2, l - 1) * Math.pow(2, e), g = 0)); e >= 8; a[c + n] = 255 & h, n += o, h /= 256, e -= 8);
		for (g = g << e | h, j += e; j > 0; a[c + n] = 255 & g, n += o, g /= 256, j -= 8);
		a[c + n - o] |= 128 * p
	}
	var f = function(a, b, c) {
			if ("undefined" == typeof a && (a = f.DEFAULT_CAPACITY), "undefined" == typeof b && (b = f.DEFAULT_ENDIAN), "undefined" == typeof c && (c = f.DEFAULT_NOASSERT), !c) {
				if (a |= 0, a < 0) throw RangeError("Illegal capacity");
				b = !! b, c = !! c
			}
			this.buffer = 0 === a ? h : new ArrayBuffer(a), this.view = 0 === a ? null : new Uint8Array(this.buffer), this.offset = 0, this.markedOffset = -1, this.limit = a, this.littleEndian = b, this.noAssert = c
		};
	f.VERSION = "5.0.1", f.LITTLE_ENDIAN = !0, f.BIG_ENDIAN = !1, f.DEFAULT_CAPACITY = 16, f.DEFAULT_ENDIAN = f.BIG_ENDIAN, f.DEFAULT_NOASSERT = !1, f.Long = a || null;
	var g = f.prototype;
	g.__isByteBuffer__;
	try {
		Object.defineProperty(g, "__isByteBuffer__", {
			value: !0,
			enumerable: !1,
			configurable: !1
		})
	} catch (a) {}
	try {
		var h = new ArrayBuffer(0)
	} catch (a) {
		var h = ""
	}
	var i = String.fromCharCode;
	f.accessor = function() {
		return Uint8Array
	}, f.allocate = function(a, b, c) {
		return new f(a, b, c)
	}, f.concat = function(a, b, c, d) {
		"boolean" != typeof b && "string" == typeof b || (d = c, c = b, b = void 0);
		for (var e, g = 0, h = 0, i = a.length; h < i; ++h) f.isByteBuffer(a[h]) || (a[h] = f.wrap(a[h], b)), e = a[h].limit - a[h].offset, e > 0 && (g += e);
		if (0 === g) return new f(0, c, d);
		var j, k = new f(g, c, d);
		for (h = 0; h < i;) j = a[h++], e = j.limit - j.offset, e <= 0 || (k.view.set(j.view.subarray(j.offset, j.limit), k.offset), k.offset += e);
		return k.limit = k.offset, k.offset = 0, k
	}, f.isByteBuffer = function(a) {
		return (a && a.__isByteBuffer__) === !0
	}, f.type = function() {
		return ArrayBuffer
	}, f.wrap = function(a, b, c, d) {
		if ("string" != typeof b && (d = c, c = b, b = void 0), "string" == typeof a) switch ("undefined" == typeof b && (b = "utf8"), b) {
		case "base64":
			return f.fromBase64(a, c);
		case "hex":
			return f.fromHex(a, c);
		case "binary":
			return f.fromBinary(a, c);
		case "utf8":
			return f.fromUTF8(a, c);
		case "debug":
			return f.fromDebug(a, c);
		default:
			throw Error("Unsupported encoding: " + b)
		}
		if (null === a || "object" != typeof a) throw TypeError("Illegal buffer");
		var e;
		if (f.isByteBuffer(a)) return e = g.clone.call(a), e.markedOffset = -1, e;
		if (a instanceof Uint8Array) e = new f(0, c, d), a.length > 0 && (e.buffer = a.buffer, e.offset = a.byteOffset, e.limit = a.byteOffset + a.byteLength, e.view = new Uint8Array(a.buffer));
		else if (a instanceof ArrayBuffer) e = new f(0, c, d), a.byteLength > 0 && (e.buffer = a, e.offset = 0, e.limit = a.byteLength, e.view = a.byteLength > 0 ? new Uint8Array(a) : null);
		else {
			if ("[object Array]" !== Object.prototype.toString.call(a)) throw TypeError("Illegal buffer");
			e = new f(a.length, c, d), e.limit = a.length;
			for (var h = 0; h < a.length; ++h) e.view[h] = a[h]
		}
		return e
	}, g.writeBitSet = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if (!(a instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
			if ("number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		var d, e = b,
			f = a.length,
			g = f >> 3,
			h = 0;
		for (b += this.writeVarint32(f, b); g--;) d = 1 & !! a[h++] | (1 & !! a[h++]) << 1 | (1 & !! a[h++]) << 2 | (1 & !! a[h++]) << 3 | (1 & !! a[h++]) << 4 | (1 & !! a[h++]) << 5 | (1 & !! a[h++]) << 6 | (1 & !! a[h++]) << 7, this.writeByte(d, b++);
		if (h < f) {
			var i = 0;
			for (d = 0; h < f;) d |= (1 & !! a[h++]) << i++;
			this.writeByte(d, b++)
		}
		return c ? (this.offset = b, this) : b - e
	}, g.readBitSet = function(a) {
		var b = "undefined" == typeof a;
		b && (a = this.offset);
		var c, d = this.readVarint32(a),
			e = d.value,
			f = e >> 3,
			g = 0,
			h = [];
		for (a += d.length; f--;) c = this.readByte(a++), h[g++] = !! (1 & c), h[g++] = !! (2 & c), h[g++] = !! (4 & c), h[g++] = !! (8 & c), h[g++] = !! (16 & c), h[g++] = !! (32 & c), h[g++] = !! (64 & c), h[g++] = !! (128 & c);
		if (g < e) {
			var i = 0;
			for (c = this.readByte(a++); g < e;) h[g++] = !! (c >> i++ & 1)
		}
		return b && (this.offset = a), h
	}, g.readBytes = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + a > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+" + a + ") <= " + this.buffer.byteLength)
		}
		var d = this.slice(b, b + a);
		return c && (this.offset += a), d
	}, g.writeBytes = g.append, g.writeInt8 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal value: " + a + " (not an integer)");
			if (a |= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		b += 1;
		var d = this.buffer.byteLength;
		return b > d && this.resize((d *= 2) > b ? d : b), b -= 1, this.view[b] = a, c && (this.offset += 1), this
	}, g.writeByte = g.writeInt8, g.readInt8 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength)
		}
		var c = this.view[a];
		return 128 === (128 & c) && (c = -(255 - c + 1)), b && (this.offset += 1), c
	}, g.readByte = g.readInt8, g.writeUint8 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal value: " + a + " (not an integer)");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		b += 1;
		var d = this.buffer.byteLength;
		return b > d && this.resize((d *= 2) > b ? d : b), b -= 1, this.view[b] = a, c && (this.offset += 1), this
	}, g.writeUInt8 = g.writeUint8, g.readUint8 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength)
		}
		var c = this.view[a];
		return b && (this.offset += 1), c
	}, g.readUInt8 = g.readUint8, g.writeInt16 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal value: " + a + " (not an integer)");
			if (a |= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		b += 2;
		var d = this.buffer.byteLength;
		return b > d && this.resize((d *= 2) > b ? d : b), b -= 2, this.littleEndian ? (this.view[b + 1] = (65280 & a) >>> 8, this.view[b] = 255 & a) : (this.view[b] = (65280 & a) >>> 8, this.view[b + 1] = 255 & a), c && (this.offset += 2), this
	}, g.writeShort = g.writeInt16, g.readInt16 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+2) <= " + this.buffer.byteLength)
		}
		var c = 0;
		return this.littleEndian ? (c = this.view[a], c |= this.view[a + 1] << 8) : (c = this.view[a] << 8, c |= this.view[a + 1]), 32768 === (32768 & c) && (c = -(65535 - c + 1)), b && (this.offset += 2), c
	}, g.readShort = g.readInt16, g.writeUint16 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal value: " + a + " (not an integer)");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		b += 2;
		var d = this.buffer.byteLength;
		return b > d && this.resize((d *= 2) > b ? d : b), b -= 2, this.littleEndian ? (this.view[b + 1] = (65280 & a) >>> 8, this.view[b] = 255 & a) : (this.view[b] = (65280 & a) >>> 8, this.view[b + 1] = 255 & a), c && (this.offset += 2), this
	}, g.writeUInt16 = g.writeUint16, g.readUint16 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+2) <= " + this.buffer.byteLength)
		}
		var c = 0;
		return this.littleEndian ? (c = this.view[a], c |= this.view[a + 1] << 8) : (c = this.view[a] << 8, c |= this.view[a + 1]), b && (this.offset += 2), c
	}, g.readUInt16 = g.readUint16, g.writeInt32 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal value: " + a + " (not an integer)");
			if (a |= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		b += 4;
		var d = this.buffer.byteLength;
		return b > d && this.resize((d *= 2) > b ? d : b), b -= 4, this.littleEndian ? (this.view[b + 3] = a >>> 24 & 255, this.view[b + 2] = a >>> 16 & 255, this.view[b + 1] = a >>> 8 & 255, this.view[b] = 255 & a) : (this.view[b] = a >>> 24 & 255, this.view[b + 1] = a >>> 16 & 255, this.view[b + 2] = a >>> 8 & 255, this.view[b + 3] = 255 & a), c && (this.offset += 4), this
	}, g.writeInt = g.writeInt32, g.readInt32 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength)
		}
		var c = 0;
		return this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0), c |= 0, b && (this.offset += 4), c
	}, g.readInt = g.readInt32, g.writeUint32 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal value: " + a + " (not an integer)");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		b += 4;
		var d = this.buffer.byteLength;
		return b > d && this.resize((d *= 2) > b ? d : b), b -= 4, this.littleEndian ? (this.view[b + 3] = a >>> 24 & 255, this.view[b + 2] = a >>> 16 & 255, this.view[b + 1] = a >>> 8 & 255, this.view[b] = 255 & a) : (this.view[b] = a >>> 24 & 255, this.view[b + 1] = a >>> 16 & 255, this.view[b + 2] = a >>> 8 & 255, this.view[b + 3] = 255 & a), c && (this.offset += 4), this
	}, g.writeUInt32 = g.writeUint32, g.readUint32 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength)
		}
		var c = 0;
		return this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0), b && (this.offset += 4), c
	}, g.readUInt32 = g.readUint32, a && (g.writeInt64 = function(b, c) {
		var d = "undefined" == typeof c;
		if (d && (c = this.offset), !this.noAssert) {
			if ("number" == typeof b) b = a.fromNumber(b);
			else if ("string" == typeof b) b = a.fromString(b);
			else if (!(b && b instanceof a)) throw TypeError("Illegal value: " + b + " (not an integer or Long)");
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		"number" == typeof b ? b = a.fromNumber(b) : "string" == typeof b && (b = a.fromString(b)), c += 8;
		var e = this.buffer.byteLength;
		c > e && this.resize((e *= 2) > c ? e : c), c -= 8;
		var f = b.low,
			g = b.high;
		return this.littleEndian ? (this.view[c + 3] = f >>> 24 & 255, this.view[c + 2] = f >>> 16 & 255, this.view[c + 1] = f >>> 8 & 255, this.view[c] = 255 & f, c += 4, this.view[c + 3] = g >>> 24 & 255, this.view[c + 2] = g >>> 16 & 255, this.view[c + 1] = g >>> 8 & 255, this.view[c] = 255 & g) : (this.view[c] = g >>> 24 & 255, this.view[c + 1] = g >>> 16 & 255, this.view[c + 2] = g >>> 8 & 255, this.view[c + 3] = 255 & g, c += 4, this.view[c] = f >>> 24 & 255, this.view[c + 1] = f >>> 16 & 255, this.view[c + 2] = f >>> 8 & 255, this.view[c + 3] = 255 & f), d && (this.offset += 8), this
	}, g.writeLong = g.writeInt64, g.readInt64 = function(b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+8) <= " + this.buffer.byteLength)
		}
		var d = 0,
			e = 0;
		this.littleEndian ? (d = this.view[b + 2] << 16, d |= this.view[b + 1] << 8, d |= this.view[b], d += this.view[b + 3] << 24 >>> 0, b += 4, e = this.view[b + 2] << 16, e |= this.view[b + 1] << 8, e |= this.view[b], e += this.view[b + 3] << 24 >>> 0) : (e = this.view[b + 1] << 16, e |= this.view[b + 2] << 8, e |= this.view[b + 3], e += this.view[b] << 24 >>> 0, b += 4, d = this.view[b + 1] << 16, d |= this.view[b + 2] << 8, d |= this.view[b + 3], d += this.view[b] << 24 >>> 0);
		var f = new a(d, e, !1);
		return c && (this.offset += 8), f
	}, g.readLong = g.readInt64, g.writeUint64 = function(b, c) {
		var d = "undefined" == typeof c;
		if (d && (c = this.offset), !this.noAssert) {
			if ("number" == typeof b) b = a.fromNumber(b);
			else if ("string" == typeof b) b = a.fromString(b);
			else if (!(b && b instanceof a)) throw TypeError("Illegal value: " + b + " (not an integer or Long)");
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		"number" == typeof b ? b = a.fromNumber(b) : "string" == typeof b && (b = a.fromString(b)), c += 8;
		var e = this.buffer.byteLength;
		c > e && this.resize((e *= 2) > c ? e : c), c -= 8;
		var f = b.low,
			g = b.high;
		return this.littleEndian ? (this.view[c + 3] = f >>> 24 & 255, this.view[c + 2] = f >>> 16 & 255, this.view[c + 1] = f >>> 8 & 255, this.view[c] = 255 & f, c += 4, this.view[c + 3] = g >>> 24 & 255, this.view[c + 2] = g >>> 16 & 255, this.view[c + 1] = g >>> 8 & 255, this.view[c] = 255 & g) : (this.view[c] = g >>> 24 & 255, this.view[c + 1] = g >>> 16 & 255, this.view[c + 2] = g >>> 8 & 255, this.view[c + 3] = 255 & g, c += 4, this.view[c] = f >>> 24 & 255, this.view[c + 1] = f >>> 16 & 255, this.view[c + 2] = f >>> 8 & 255, this.view[c + 3] = 255 & f), d && (this.offset += 8), this
	}, g.writeUInt64 = g.writeUint64, g.readUint64 = function(b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+8) <= " + this.buffer.byteLength)
		}
		var d = 0,
			e = 0;
		this.littleEndian ? (d = this.view[b + 2] << 16, d |= this.view[b + 1] << 8, d |= this.view[b], d += this.view[b + 3] << 24 >>> 0, b += 4, e = this.view[b + 2] << 16, e |= this.view[b + 1] << 8, e |= this.view[b], e += this.view[b + 3] << 24 >>> 0) : (e = this.view[b + 1] << 16, e |= this.view[b + 2] << 8, e |= this.view[b + 3], e += this.view[b] << 24 >>> 0, b += 4, d = this.view[b + 1] << 16, d |= this.view[b + 2] << 8, d |= this.view[b + 3], d += this.view[b] << 24 >>> 0);
		var f = new a(d, e, !0);
		return c && (this.offset += 8), f
	}, g.readUInt64 = g.readUint64), g.writeFloat32 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a) throw TypeError("Illegal value: " + a + " (not a number)");
			if ("number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		b += 4;
		var d = this.buffer.byteLength;
		return b > d && this.resize((d *= 2) > b ? d : b), b -= 4, e(this.view, a, b, this.littleEndian, 23, 4), c && (this.offset += 4), this
	}, g.writeFloat = g.writeFloat32, g.readFloat32 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength)
		}
		var c = d(this.view, a, this.littleEndian, 23, 4);
		return b && (this.offset += 4), c
	}, g.readFloat = g.readFloat32, g.writeFloat64 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a) throw TypeError("Illegal value: " + a + " (not a number)");
			if ("number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		b += 8;
		var d = this.buffer.byteLength;
		return b > d && this.resize((d *= 2) > b ? d : b), b -= 8, e(this.view, a, b, this.littleEndian, 52, 8), c && (this.offset += 8), this
	}, g.writeDouble = g.writeFloat64, g.readFloat64 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+8) <= " + this.buffer.byteLength)
		}
		var c = d(this.view, a, this.littleEndian, 52, 8);
		return b && (this.offset += 8), c
	}, g.readDouble = g.readFloat64, f.MAX_VARINT32_BYTES = 5, f.calculateVarint32 = function(a) {
		return a >>>= 0, a < 128 ? 1 : a < 16384 ? 2 : a < 1 << 21 ? 3 : a < 1 << 28 ? 4 : 5
	}, f.zigZagEncode32 = function(a) {
		return ((a |= 0) << 1 ^ a >> 31) >>> 0
	}, f.zigZagDecode32 = function(a) {
		return a >>> 1 ^ -(1 & a) | 0
	}, g.writeVarint32 = function(a, b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal value: " + a + " (not an integer)");
			if (a |= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+0) <= " + this.buffer.byteLength)
		}
		var d, e = f.calculateVarint32(a);
		b += e;
		var g = this.buffer.byteLength;
		for (b > g && this.resize((g *= 2) > b ? g : b), b -= e, a >>>= 0; a >= 128;) d = 127 & a | 128, this.view[b++] = d, a >>>= 7;
		return this.view[b++] = a, c ? (this.offset = b, this) : e
	}, g.writeVarint32ZigZag = function(a, b) {
		return this.writeVarint32(f.zigZagEncode32(a), b)
	}, g.readVarint32 = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength)
		}
		var c, d = 0,
			e = 0;
		do {
			if (!this.noAssert && a > this.limit) {
				var f = Error("Truncated");
				throw f.truncated = !0, f
			}
			c = this.view[a++], d < 5 && (e |= (127 & c) << 7 * d), ++d
		} while (0 !== (128 & c));
		return e |= 0, b ? (this.offset = a, e) : {
			value: e,
			length: d
		}
	}, g.readVarint32ZigZag = function(a) {
		var b = this.readVarint32(a);
		return "object" == typeof b ? b.value = f.zigZagDecode32(b.value) : b = f.zigZagDecode32(b), b
	}, a && (f.MAX_VARINT64_BYTES = 10, f.calculateVarint64 = function(b) {
		"number" == typeof b ? b = a.fromNumber(b) : "string" == typeof b && (b = a.fromString(b));
		var c = b.toInt() >>> 0,
			d = b.shiftRightUnsigned(28).toInt() >>> 0,
			e = b.shiftRightUnsigned(56).toInt() >>> 0;
		return 0 == e ? 0 == d ? c < 16384 ? c < 128 ? 1 : 2 : c < 1 << 21 ? 3 : 4 : d < 16384 ? d < 128 ? 5 : 6 : d < 1 << 21 ? 7 : 8 : e < 128 ? 9 : 10
	}, f.zigZagEncode64 = function(b) {
		return "number" == typeof b ? b = a.fromNumber(b, !1) : "string" == typeof b ? b = a.fromString(b, !1) : b.unsigned !== !1 && (b = b.toSigned()), b.shiftLeft(1).xor(b.shiftRight(63)).toUnsigned()
	}, f.zigZagDecode64 = function(b) {
		return "number" == typeof b ? b = a.fromNumber(b, !1) : "string" == typeof b ? b = a.fromString(b, !1) : b.unsigned !== !1 && (b = b.toSigned()), b.shiftRightUnsigned(1).xor(b.and(a.ONE).toSigned().negate()).toSigned()
	}, g.writeVarint64 = function(b, c) {
		var d = "undefined" == typeof c;
		if (d && (c = this.offset), !this.noAssert) {
			if ("number" == typeof b) b = a.fromNumber(b);
			else if ("string" == typeof b) b = a.fromString(b);
			else if (!(b && b instanceof a)) throw TypeError("Illegal value: " + b + " (not an integer or Long)");
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		"number" == typeof b ? b = a.fromNumber(b, !1) : "string" == typeof b ? b = a.fromString(b, !1) : b.unsigned !== !1 && (b = b.toSigned());
		var e = f.calculateVarint64(b),
			g = b.toInt() >>> 0,
			h = b.shiftRightUnsigned(28).toInt() >>> 0,
			i = b.shiftRightUnsigned(56).toInt() >>> 0;
		c += e;
		var j = this.buffer.byteLength;
		switch (c > j && this.resize((j *= 2) > c ? j : c), c -= e, e) {
		case 10:
			this.view[c + 9] = i >>> 7 & 1;
		case 9:
			this.view[c + 8] = 9 !== e ? 128 | i : 127 & i;
		case 8:
			this.view[c + 7] = 8 !== e ? h >>> 21 | 128 : h >>> 21 & 127;
		case 7:
			this.view[c + 6] = 7 !== e ? h >>> 14 | 128 : h >>> 14 & 127;
		case 6:
			this.view[c + 5] = 6 !== e ? h >>> 7 | 128 : h >>> 7 & 127;
		case 5:
			this.view[c + 4] = 5 !== e ? 128 | h : 127 & h;
		case 4:
			this.view[c + 3] = 4 !== e ? g >>> 21 | 128 : g >>> 21 & 127;
		case 3:
			this.view[c + 2] = 3 !== e ? g >>> 14 | 128 : g >>> 14 & 127;
		case 2:
			this.view[c + 1] = 2 !== e ? g >>> 7 | 128 : g >>> 7 & 127;
		case 1:
			this.view[c] = 1 !== e ? 128 | g : 127 & g
		}
		return d ? (this.offset += e, this) : e
	}, g.writeVarint64ZigZag = function(a, b) {
		return this.writeVarint64(f.zigZagEncode64(a), b)
	}, g.readVarint64 = function(b) {
		var c = "undefined" == typeof b;
		if (c && (b = this.offset), !this.noAssert) {
			if ("number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: " + b + " (not an integer)");
			if (b >>>= 0, b < 0 || b + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + b + " (+1) <= " + this.buffer.byteLength)
		}
		var d = b,
			e = 0,
			f = 0,
			g = 0,
			h = 0;
		if (h = this.view[b++], e = 127 & h, 128 & h && (h = this.view[b++], e |= (127 & h) << 7, (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++], e |= (127 & h) << 14, (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++], e |= (127 & h) << 21, (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++], f = 127 & h, (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++], f |= (127 & h) << 7, (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++], f |= (127 & h) << 14, (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++], f |= (127 & h) << 21, (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++], g = 127 & h, (128 & h || this.noAssert && "undefined" == typeof h) && (h = this.view[b++], g |= (127 & h) << 7, 128 & h || this.noAssert && "undefined" == typeof h)))))))))) throw Error("Buffer overrun");
		var i = a.fromBits(e | f << 28, f >>> 4 | g << 24, !1);
		return c ? (this.offset = b, i) : {
			value: i,
			length: b - d
		}
	}, g.readVarint64ZigZag = function(b) {
		var c = this.readVarint64(b);
		return c && c.value instanceof a ? c.value = f.zigZagDecode64(c.value) : c = f.zigZagDecode64(c), c
	}), g.writeCString = function(a, c) {
		var d = "undefined" == typeof c;
		d && (c = this.offset);
		var e, f = a.length;
		if (!this.noAssert) {
			if ("string" != typeof a) throw TypeError("Illegal str: Not a string");
			for (e = 0; e < f; ++e) if (0 === a.charCodeAt(e)) throw RangeError("Illegal str: Contains NULL-characters");
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		f = k.calculateUTF16asUTF8(b(a))[1], c += f + 1;
		var g = this.buffer.byteLength;
		return c > g && this.resize((g *= 2) > c ? g : c), c -= f + 1, k.encodeUTF16toUTF8(b(a), function(a) {
			this.view[c++] = a
		}.bind(this)), this.view[c++] = 0, d ? (this.offset = c, this) : f
	}, g.readCString = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength)
		}
		var d, e = a,
			f = -1;
		return k.decodeUTF8toUTF16(function() {
			if (0 === f) return null;
			if (a >= this.limit) throw RangeError("Illegal range: Truncated data, " + a + " < " + this.limit);
			return f = this.view[a++], 0 === f ? null : f
		}.bind(this), d = c(), !0), b ? (this.offset = a, d()) : {
			string: d(),
			length: a - e
		}
	}, g.writeIString = function(a, c) {
		var d = "undefined" == typeof c;
		if (d && (c = this.offset), !this.noAssert) {
			if ("string" != typeof a) throw TypeError("Illegal str: Not a string");
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		var e, f = c;
		e = k.calculateUTF16asUTF8(b(a), this.noAssert)[1], c += 4 + e;
		var g = this.buffer.byteLength;
		if (c > g && this.resize((g *= 2) > c ? g : c), c -= 4 + e, this.littleEndian ? (this.view[c + 3] = e >>> 24 & 255, this.view[c + 2] = e >>> 16 & 255, this.view[c + 1] = e >>> 8 & 255, this.view[c] = 255 & e) : (this.view[c] = e >>> 24 & 255, this.view[c + 1] = e >>> 16 & 255, this.view[c + 2] = e >>> 8 & 255, this.view[c + 3] = 255 & e), c += 4, k.encodeUTF16toUTF8(b(a), function(a) {
			this.view[c++] = a
		}.bind(this)), c !== f + 4 + e) throw RangeError("Illegal range: Truncated data, " + c + " == " + (c + 4 + e));
		return d ? (this.offset = c, this) : c - f
	}, g.readIString = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+4) <= " + this.buffer.byteLength)
		}
		var c = a,
			d = this.readUint32(a),
			e = this.readUTF8String(d, f.METRICS_BYTES, a += 4);
		return a += e.length, b ? (this.offset = a, e.string) : {
			string: e.string,
			length: a - c
		}
	}, f.METRICS_CHARS = "c", f.METRICS_BYTES = "b", g.writeUTF8String = function(a, c) {
		var d = "undefined" == typeof c;
		if (d && (c = this.offset), !this.noAssert) {
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		var e, f = c;
		e = k.calculateUTF16asUTF8(b(a))[1], c += e;
		var g = this.buffer.byteLength;
		return c > g && this.resize((g *= 2) > c ? g : c), c -= e, k.encodeUTF16toUTF8(b(a), function(a) {
			this.view[c++] = a
		}.bind(this)), d ? (this.offset = c, this) : c - f
	}, g.writeString = g.writeUTF8String, f.calculateUTF8Chars = function(a) {
		return k.calculateUTF16asUTF8(b(a))[0]
	}, f.calculateUTF8Bytes = function(a) {
		return k.calculateUTF16asUTF8(b(a))[1]
	}, f.calculateString = f.calculateUTF8Bytes, g.readUTF8String = function(a, b, d) {
		"number" == typeof b && (d = b, b = void 0);
		var e = "undefined" == typeof d;
		if (e && (d = this.offset), "undefined" == typeof b && (b = f.METRICS_CHARS), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal length: " + a + " (not an integer)");
			if (a |= 0, "number" != typeof d || d % 1 !== 0) throw TypeError("Illegal offset: " + d + " (not an integer)");
			if (d >>>= 0, d < 0 || d + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + d + " (+0) <= " + this.buffer.byteLength)
		}
		var g, h = 0,
			i = d;
		if (b === f.METRICS_CHARS) {
			if (g = c(), k.decodeUTF8(function() {
				return h < a && d < this.limit ? this.view[d++] : null
			}.bind(this), function(a) {
				++h, k.UTF8toUTF16(a, g)
			}), h !== a) throw RangeError("Illegal range: Truncated data, " + h + " == " + a);
			return e ? (this.offset = d, g()) : {
				string: g(),
				length: d - i
			}
		}
		if (b === f.METRICS_BYTES) {
			if (!this.noAssert) {
				if ("number" != typeof d || d % 1 !== 0) throw TypeError("Illegal offset: " + d + " (not an integer)");
				if (d >>>= 0, d < 0 || d + a > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + d + " (+" + a + ") <= " + this.buffer.byteLength)
			}
			var j = d + a;
			if (k.decodeUTF8toUTF16(function() {
				return d < j ? this.view[d++] : null
			}.bind(this), g = c(), this.noAssert), d !== j) throw RangeError("Illegal range: Truncated data, " + d + " == " + j);
			return e ? (this.offset = d, g()) : {
				string: g(),
				length: d - i
			}
		}
		throw TypeError("Unsupported metrics: " + b)
	}, g.readString = g.readUTF8String, g.writeVString = function(a, c) {
		var d = "undefined" == typeof c;
		if (d && (c = this.offset), !this.noAssert) {
			if ("string" != typeof a) throw TypeError("Illegal str: Not a string");
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		var e, g, h = c;
		e = k.calculateUTF16asUTF8(b(a), this.noAssert)[1], g = f.calculateVarint32(e), c += g + e;
		var i = this.buffer.byteLength;
		if (c > i && this.resize((i *= 2) > c ? i : c), c -= g + e, c += this.writeVarint32(e, c), k.encodeUTF16toUTF8(b(a), function(a) {
			this.view[c++] = a
		}.bind(this)), c !== h + e + g) throw RangeError("Illegal range: Truncated data, " + c + " == " + (c + e + g));
		return d ? (this.offset = c, this) : c - h
	}, g.readVString = function(a) {
		var b = "undefined" == typeof a;
		if (b && (a = this.offset), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+1) <= " + this.buffer.byteLength)
		}
		var c = a,
			d = this.readVarint32(a),
			e = this.readUTF8String(d.value, f.METRICS_BYTES, a += d.length);
		return a += e.length, b ? (this.offset = a, e.string) : {
			string: e.string,
			length: a - c
		}
	}, g.append = function(a, b, c) {
		"number" != typeof b && "string" == typeof b || (c = b, b = void 0);
		var d = "undefined" == typeof c;
		if (d && (c = this.offset), !this.noAssert) {
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		a instanceof f || (a = f.wrap(a, b));
		var e = a.limit - a.offset;
		if (e <= 0) return this;
		c += e;
		var g = this.buffer.byteLength;
		return c > g && this.resize((g *= 2) > c ? g : c), c -= e, this.view.set(a.view.subarray(a.offset, a.limit), c), a.offset += e, d && (this.offset += e), this
	}, g.appendTo = function(a, b) {
		return a.append(this, b), this
	}, g.assert = function(a) {
		return this.noAssert = !a, this
	}, g.capacity = function() {
		return this.buffer.byteLength
	}, g.clear = function() {
		return this.offset = 0, this.limit = this.buffer.byteLength, this.markedOffset = -1, this
	}, g.clone = function(a) {
		var b = new f(0, this.littleEndian, this.noAssert);
		return a ? (b.buffer = new ArrayBuffer(this.buffer.byteLength), b.view = new Uint8Array(b.buffer)) : (b.buffer = this.buffer, b.view = this.view), b.offset = this.offset, b.markedOffset = this.markedOffset, b.limit = this.limit, b
	}, g.compact = function(a, b) {
		if ("undefined" == typeof a && (a = this.offset), "undefined" == typeof b && (b = this.limit), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal end: Not an integer");
			if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
		}
		if (0 === a && b === this.buffer.byteLength) return this;
		var c = b - a;
		if (0 === c) return this.buffer = h, this.view = null, this.markedOffset >= 0 && (this.markedOffset -= a), this.offset = 0, this.limit = 0, this;
		var d = new ArrayBuffer(c),
			e = new Uint8Array(d);
		return e.set(this.view.subarray(a, b)), this.buffer = d, this.view = e, this.markedOffset >= 0 && (this.markedOffset -= a), this.offset = 0, this.limit = c, this
	}, g.copy = function(a, b) {
		if ("undefined" == typeof a && (a = this.offset), "undefined" == typeof b && (b = this.limit), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal end: Not an integer");
			if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
		}
		if (a === b) return new f(0, this.littleEndian, this.noAssert);
		var c = b - a,
			d = new f(c, this.littleEndian, this.noAssert);
		return d.offset = 0, d.limit = c, d.markedOffset >= 0 && (d.markedOffset -= a), this.copyTo(d, 0, a, b), d
	}, g.copyTo = function(a, b, c, d) {
		var e, g;
		if (!this.noAssert && !f.isByteBuffer(a)) throw TypeError("Illegal target: Not a ByteBuffer");
		if (b = (g = "undefined" == typeof b) ? a.offset : 0 | b, c = (e = "undefined" == typeof c) ? this.offset : 0 | c, d = "undefined" == typeof d ? this.limit : 0 | d, b < 0 || b > a.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + b + " <= " + a.buffer.byteLength);
		if (c < 0 || d > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + c + " <= " + this.buffer.byteLength);
		var h = d - c;
		return 0 === h ? a : (a.ensureCapacity(b + h), a.view.set(this.view.subarray(c, d), b), e && (this.offset += h), g && (a.offset += h), this)
	}, g.ensureCapacity = function(a) {
		var b = this.buffer.byteLength;
		return b < a ? this.resize((b *= 2) > a ? b : a) : this
	}, g.fill = function(a, b, c) {
		var d = "undefined" == typeof b;
		if (d && (b = this.offset), "string" == typeof a && a.length > 0 && (a = a.charCodeAt(0)), "undefined" == typeof b && (b = this.offset), "undefined" == typeof c && (c = this.limit), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal value: " + a + " (not an integer)");
			if (a |= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
			if (b >>>= 0, "number" != typeof c || c % 1 !== 0) throw TypeError("Illegal end: Not an integer");
			if (c >>>= 0, b < 0 || b > c || c > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + b + " <= " + c + " <= " + this.buffer.byteLength)
		}
		if (b >= c) return this;
		for (; b < c;) this.view[b++] = a;
		return d && (this.offset = b), this
	}, g.flip = function() {
		return this.limit = this.offset, this.offset = 0, this
	}, g.mark = function(a) {
		if (a = "undefined" == typeof a ? this.offset : a, !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal offset: " + a + " (not an integer)");
			if (a >>>= 0, a < 0 || a + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + a + " (+0) <= " + this.buffer.byteLength)
		}
		return this.markedOffset = a, this
	}, g.order = function(a) {
		if (!this.noAssert && "boolean" != typeof a) throw TypeError("Illegal littleEndian: Not a boolean");
		return this.littleEndian = !! a, this
	}, g.LE = function(a) {
		return this.littleEndian = "undefined" == typeof a || !! a, this
	}, g.BE = function(a) {
		return this.littleEndian = "undefined" != typeof a && !a, this
	}, g.prepend = function(a, b, c) {
		"number" != typeof b && "string" == typeof b || (c = b, b = void 0);
		var d = "undefined" == typeof c;
		if (d && (c = this.offset), !this.noAssert) {
			if ("number" != typeof c || c % 1 !== 0) throw TypeError("Illegal offset: " + c + " (not an integer)");
			if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + c + " (+0) <= " + this.buffer.byteLength)
		}
		a instanceof f || (a = f.wrap(a, b));
		var e = a.limit - a.offset;
		if (e <= 0) return this;
		var g = e - c;
		if (g > 0) {
			var h = new ArrayBuffer(this.buffer.byteLength + g),
				i = new Uint8Array(h);
			i.set(this.view.subarray(c, this.buffer.byteLength), e), this.buffer = h, this.view = i, this.offset += g, this.markedOffset >= 0 && (this.markedOffset += g), this.limit += g, c += g
		} else {
			new Uint8Array(this.buffer)
		}
		return this.view.set(a.view.subarray(a.offset, a.limit), c - e), a.offset = a.limit, d && (this.offset -= e), this
	}, g.prependTo = function(a, b) {
		return a.prepend(this, b), this
	}, g.printDebug = function(a) {
		"function" != typeof a && (a = console.log.bind(console)), a(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0))
	}, g.remaining = function() {
		return this.limit - this.offset
	}, g.reset = function() {
		return this.markedOffset >= 0 ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0, this
	}, g.resize = function(a) {
		if (!this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal capacity: " + a + " (not an integer)");
			if (a |= 0, a < 0) throw RangeError("Illegal capacity: 0 <= " + a)
		}
		if (this.buffer.byteLength < a) {
			var b = new ArrayBuffer(a),
				c = new Uint8Array(b);
			c.set(this.view), this.buffer = b, this.view = c
		}
		return this
	}, g.reverse = function(a, b) {
		if ("undefined" == typeof a && (a = this.offset), "undefined" == typeof b && (b = this.limit), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal end: Not an integer");
			if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
		}
		return a === b ? this : (Array.prototype.reverse.call(this.view.subarray(a, b)), this)
	}, g.skip = function(a) {
		if (!this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal length: " + a + " (not an integer)");
			a |= 0
		}
		var b = this.offset + a;
		if (!this.noAssert && (b < 0 || b > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + a + " <= " + this.buffer.byteLength);
		return this.offset = b, this
	}, g.slice = function(a, b) {
		if ("undefined" == typeof a && (a = this.offset), "undefined" == typeof b && (b = this.limit), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal end: Not an integer");
			if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
		}
		var c = this.clone();
		return c.offset = a, c.limit = b, c
	}, g.toBuffer = function(a) {
		var b = this.offset,
			c = this.limit;
		if (!this.noAssert) {
			if ("number" != typeof b || b % 1 !== 0) throw TypeError("Illegal offset: Not an integer");
			if (b >>>= 0, "number" != typeof c || c % 1 !== 0) throw TypeError("Illegal limit: Not an integer");
			if (c >>>= 0, b < 0 || b > c || c > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + b + " <= " + c + " <= " + this.buffer.byteLength)
		}
		if (!a && 0 === b && c === this.buffer.byteLength) return this.buffer;
		if (b === c) return h;
		var d = new ArrayBuffer(c - b);
		return new Uint8Array(d).set(new Uint8Array(this.buffer).subarray(b, c), 0), d
	}, g.toArrayBuffer = g.toBuffer, g.toString = function(a, b, c) {
		if ("undefined" == typeof a) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
		switch ("number" == typeof a && (a = "utf8", b = a, c = b), a) {
		case "utf8":
			return this.toUTF8(b, c);
		case "base64":
			return this.toBase64(b, c);
		case "hex":
			return this.toHex(b, c);
		case "binary":
			return this.toBinary(b, c);
		case "debug":
			return this.toDebug();
		case "columns":
			return this.toColumns();
		default:
			throw Error("Unsupported encoding: " + a)
		}
	};
	var j = function() {
			for (var a = {}, b = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47], c = [], d = 0, e = b.length; d < e; ++d) c[b[d]] = d;
			return a.encode = function(a, c) {
				for (var d, e; null !== (d = a());) c(b[d >> 2 & 63]), e = (3 & d) << 4, null !== (d = a()) ? (e |= d >> 4 & 15, c(b[63 & (e | d >> 4 & 15)]), e = (15 & d) << 2, null !== (d = a()) ? (c(b[63 & (e | d >> 6 & 3)]), c(b[63 & d])) : (c(b[63 & e]), c(61))) : (c(b[63 & e]), c(61), c(61))
			}, a.decode = function(a, b) {
				function d(a) {
					throw Error("Illegal character code: " + a)
				}
				for (var e, f, g; null !== (e = a());) if (f = c[e], "undefined" == typeof f && d(e), null !== (e = a()) && (g = c[e], "undefined" == typeof g && d(e), b(f << 2 >>> 0 | (48 & g) >> 4), null !== (e = a()))) {
					if (f = c[e], "undefined" == typeof f) {
						if (61 === e) break;
						d(e)
					}
					if (b((15 & g) << 4 >>> 0 | (60 & f) >> 2), null !== (e = a())) {
						if (g = c[e], "undefined" == typeof g) {
							if (61 === e) break;
							d(e)
						}
						b((3 & f) << 6 >>> 0 | g)
					}
				}
			}, a.test = function(a) {
				return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(a)
			}, a
		}();
	g.toBase64 = function(a, b) {
		if ("undefined" == typeof a && (a = this.offset), "undefined" == typeof b && (b = this.limit), a |= 0, b |= 0, a < 0 || b > this.capacity || a > b) throw RangeError("begin, end");
		var d;
		return j.encode(function() {
			return a < b ? this.view[a++] : null
		}.bind(this), d = c()), d()
	}, f.fromBase64 = function(a, c) {
		if ("string" != typeof a) throw TypeError("str");
		var d = new f(a.length / 4 * 3, c),
			e = 0;
		return j.decode(b(a), function(a) {
			d.view[e++] = a
		}), d.limit = e, d
	}, f.btoa = function(a) {
		return f.fromBinary(a).toBase64()
	}, f.atob = function(a) {
		return f.fromBase64(a).toBinary();
	}, g.toBinary = function(a, b) {
		if ("undefined" == typeof a && (a = this.offset), "undefined" == typeof b && (b = this.limit), a |= 0, b |= 0, a < 0 || b > this.capacity() || a > b) throw RangeError("begin, end");
		if (a === b) return "";
		for (var c = [], d = []; a < b;) c.push(this.view[a++]), c.length >= 1024 && (d.push(String.fromCharCode.apply(String, c)), c = []);
		return d.join("") + String.fromCharCode.apply(String, c)
	}, f.fromBinary = function(a, b) {
		if ("string" != typeof a) throw TypeError("str");
		for (var c, d = 0, e = a.length, g = new f(e, b); d < e;) {
			if (c = a.charCodeAt(d), c > 255) throw RangeError("illegal char code: " + c);
			g.view[d++] = c
		}
		return g.limit = e, g
	}, g.toDebug = function(a) {
		for (var b, c = -1, d = this.buffer.byteLength, e = "", f = "", g = ""; c < d;) {
			if (c !== -1 && (b = this.view[c], e += b < 16 ? "0" + b.toString(16).toUpperCase() : b.toString(16).toUpperCase(), a && (f += b > 32 && b < 127 ? String.fromCharCode(b) : ".")), ++c, a && c > 0 && c % 16 === 0 && c !== d) {
				for (; e.length < 51;) e += " ";
				g += e + f + "\n", e = f = ""
			}
			e += c === this.offset && c === this.limit ? c === this.markedOffset ? "!" : "|" : c === this.offset ? c === this.markedOffset ? "[" : "<" : c === this.limit ? c === this.markedOffset ? "]" : ">" : c === this.markedOffset ? "'" : a || 0 !== c && c !== d ? " " : ""
		}
		if (a && " " !== e) {
			for (; e.length < 51;) e += " ";
			g += e + f + "\n"
		}
		return a ? g : e
	}, f.fromDebug = function(a, b, c) {
		for (var d, e, g = a.length, h = new f((g + 1) / 3 | 0, b, c), i = 0, j = 0, k = !1, l = !1, m = !1, n = !1, o = !1; i < g;) {
			switch (d = a.charAt(i++)) {
			case "!":
				if (!c) {
					if (l || m || n) {
						o = !0;
						break
					}
					l = m = n = !0
				}
				h.offset = h.markedOffset = h.limit = j, k = !1;
				break;
			case "|":
				if (!c) {
					if (l || n) {
						o = !0;
						break
					}
					l = n = !0
				}
				h.offset = h.limit = j, k = !1;
				break;
			case "[":
				if (!c) {
					if (l || m) {
						o = !0;
						break
					}
					l = m = !0
				}
				h.offset = h.markedOffset = j, k = !1;
				break;
			case "<":
				if (!c) {
					if (l) {
						o = !0;
						break
					}
					l = !0
				}
				h.offset = j, k = !1;
				break;
			case "]":
				if (!c) {
					if (n || m) {
						o = !0;
						break
					}
					n = m = !0
				}
				h.limit = h.markedOffset = j, k = !1;
				break;
			case ">":
				if (!c) {
					if (n) {
						o = !0;
						break
					}
					n = !0
				}
				h.limit = j, k = !1;
				break;
			case "'":
				if (!c) {
					if (m) {
						o = !0;
						break
					}
					m = !0
				}
				h.markedOffset = j, k = !1;
				break;
			case " ":
				k = !1;
				break;
			default:
				if (!c && k) {
					o = !0;
					break
				}
				if (e = parseInt(d + a.charAt(i++), 16), !c && (isNaN(e) || e < 0 || e > 255)) throw TypeError("Illegal str: Not a debug encoded string");
				h.view[j++] = e, k = !0
			}
			if (o) throw TypeError("Illegal str: Invalid symbol at " + i)
		}
		if (!c) {
			if (!l || !n) throw TypeError("Illegal str: Missing offset or limit");
			if (j < h.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + j + " < " + g)
		}
		return h
	}, g.toHex = function(a, b) {
		if (a = "undefined" == typeof a ? this.offset : a, b = "undefined" == typeof b ? this.limit : b, !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal end: Not an integer");
			if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
		}
		for (var c, d = new Array(b - a); a < b;) c = this.view[a++], c < 16 ? d.push("0", c.toString(16)) : d.push(c.toString(16));
		return d.join("")
	}, f.fromHex = function(a, b, c) {
		if (!c) {
			if ("string" != typeof a) throw TypeError("Illegal str: Not a string");
			if (a.length % 2 !== 0) throw TypeError("Illegal str: Length not a multiple of 2")
		}
		for (var d, e = a.length, g = new f(e / 2 | 0, b), h = 0, i = 0; h < e; h += 2) {
			if (d = parseInt(a.substring(h, h + 2), 16), !c && (!isFinite(d) || d < 0 || d > 255)) throw TypeError("Illegal str: Contains non-hex characters");
			g.view[i++] = d
		}
		return g.limit = i, g
	};
	var k = function() {
			var a = {};
			return a.MAX_CODEPOINT = 1114111, a.encodeUTF8 = function(a, b) {
				var c = null;
				for ("number" == typeof a && (c = a, a = function() {
					return null
				}); null !== c || null !== (c = a());) c < 128 ? b(127 & c) : c < 2048 ? (b(c >> 6 & 31 | 192), b(63 & c | 128)) : c < 65536 ? (b(c >> 12 & 15 | 224), b(c >> 6 & 63 | 128), b(63 & c | 128)) : (b(c >> 18 & 7 | 240), b(c >> 12 & 63 | 128), b(c >> 6 & 63 | 128), b(63 & c | 128)), c = null
			}, a.decodeUTF8 = function(a, b) {
				for (var c, d, e, f, g = function(a) {
						a = a.slice(0, a.indexOf(null));
						var b = Error(a.toString());
						throw b.name = "TruncatedError", b.bytes = a, b
					}; null !== (c = a());) if (0 === (128 & c)) b(c);
				else if (192 === (224 & c)) null === (d = a()) && g([c, d]), b((31 & c) << 6 | 63 & d);
				else if (224 === (240 & c))(null === (d = a()) || null === (e = a())) && g([c, d, e]), b((15 & c) << 12 | (63 & d) << 6 | 63 & e);
				else {
					if (240 !== (248 & c)) throw RangeError("Illegal starting byte: " + c);
					(null === (d = a()) || null === (e = a()) || null === (f = a())) && g([c, d, e, f]), b((7 & c) << 18 | (63 & d) << 12 | (63 & e) << 6 | 63 & f)
				}
			}, a.UTF16toUTF8 = function(a, b) {
				for (var c, d = null;;) {
					if (null === (c = null !== d ? d : a())) break;
					c >= 55296 && c <= 57343 && null !== (d = a()) && d >= 56320 && d <= 57343 ? (b(1024 * (c - 55296) + d - 56320 + 65536), d = null) : b(c)
				}
				null !== d && b(d)
			}, a.UTF8toUTF16 = function(a, b) {
				var c = null;
				for ("number" == typeof a && (c = a, a = function() {
					return null
				}); null !== c || null !== (c = a());) c <= 65535 ? b(c) : (c -= 65536, b((c >> 10) + 55296), b(c % 1024 + 56320)), c = null
			}, a.encodeUTF16toUTF8 = function(b, c) {
				a.UTF16toUTF8(b, function(b) {
					a.encodeUTF8(b, c)
				})
			}, a.decodeUTF8toUTF16 = function(b, c) {
				a.decodeUTF8(b, function(b) {
					a.UTF8toUTF16(b, c)
				})
			}, a.calculateCodePoint = function(a) {
				return a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4
			}, a.calculateUTF8 = function(a) {
				for (var b, c = 0; null !== (b = a());) c += b < 128 ? 1 : b < 2048 ? 2 : b < 65536 ? 3 : 4;
				return c
			}, a.calculateUTF16asUTF8 = function(b) {
				var c = 0,
					d = 0;
				return a.UTF16toUTF8(b, function(a) {
					++c, d += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4
				}), [c, d]
			}, a
		}();
	return g.toUTF8 = function(a, b) {
		if ("undefined" == typeof a && (a = this.offset), "undefined" == typeof b && (b = this.limit), !this.noAssert) {
			if ("number" != typeof a || a % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
			if (a >>>= 0, "number" != typeof b || b % 1 !== 0) throw TypeError("Illegal end: Not an integer");
			if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + a + " <= " + b + " <= " + this.buffer.byteLength)
		}
		var d;
		try {
			k.decodeUTF8toUTF16(function() {
				return a < b ? this.view[a++] : null
			}.bind(this), d = c())
		} catch (c) {
			if (a !== b) throw RangeError("Illegal range: Truncated data, " + a + " != " + b)
		}
		return d()
	}, f.fromUTF8 = function(a, c, d) {
		if (!d && "string" != typeof a) throw TypeError("Illegal str: Not a string");
		var e = new f(k.calculateUTF16asUTF8(b(a), !0)[1], c, d),
			g = 0;
		return k.encodeUTF16toUTF8(b(a), function(a) {
			e.view[g++] = a
		}), e.limit = g, e
	}, f
}), function(a, b) {
	"function" == typeof define && define.amd ? define(a) : "undefined" != typeof module && "object" == typeof exports ? module.exports = a() : b.log4javascript = a()
}(function() {
	function isUndefined(a) {
		return "undefined" == typeof a
	}
	function EventSupport() {}
	function Log4JavaScript() {}
	function toStr(a) {
		return a && a.toString ? a.toString() : String(a)
	}
	function getExceptionMessage(a) {
		return a.message ? a.message : a.description ? a.description : toStr(a)
	}
	function getUrlFileName(a) {
		var b = Math.max(a.lastIndexOf("/"), a.lastIndexOf("\\"));
		return a.substr(b + 1)
	}
	function getExceptionStringRep(a) {
		if (a) {
			var b = "Exception: " + getExceptionMessage(a);
			try {
				a.lineNumber && (b += " on line number " + a.lineNumber), a.fileName && (b += " in file " + getUrlFileName(a.fileName))
			} catch (a) {
				logLog.warn("Unable to obtain file and line information for error")
			}
			return showStackTraces && a.stack && (b += newLine + "Stack trace:" + newLine + a.stack), b
		}
		return null
	}
	function bool(a) {
		return Boolean(a)
	}
	function trim(a) {
		return a.replace(/^\s+/, "").replace(/\s+$/, "")
	}
	function splitIntoLines(a) {
		var b = a.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		return b.split("\n")
	}
	function array_remove(a, b) {
		for (var c = -1, d = 0, e = a.length; d < e; d++) if (a[d] === b) {
			c = d;
			break
		}
		return c >= 0 && (a.splice(c, 1), !0)
	}
	function array_contains(a, b) {
		for (var c = 0, d = a.length; c < d; c++) if (a[c] == b) return !0;
		return !1
	}
	function extractBooleanFromParam(a, b) {
		return isUndefined(a) ? b : bool(a)
	}
	function extractStringFromParam(a, b) {
		return isUndefined(a) ? b : String(a)
	}
	function extractIntFromParam(a, b) {
		if (isUndefined(a)) return b;
		try {
			var c = parseInt(a, 10);
			return isNaN(c) ? b : c
		} catch (c) {
			return logLog.warn("Invalid int param " + a, c), b
		}
	}
	function extractFunctionFromParam(a, b) {
		return "function" == typeof a ? a : b
	}
	function isError(a) {
		return a instanceof Error
	}
	function handleError(a, b) {
		logLog.error(a, b), log4javascript.dispatchEvent("error", {
			message: a,
			exception: b
		})
	}
	function Timer(a, b) {
		this.name = a, this.level = isUndefined(b) ? Level.INFO : b, this.start = new Date
	}
	function Logger(a) {
		this.name = a, this.parent = null, this.children = [];
		var b = [],
			c = null,
			d = this.name === rootLoggerName,
			e = this.name === nullLoggerName,
			f = null,
			g = !1;
		this.addChild = function(a) {
			this.children.push(a), a.parent = this, a.invalidateAppenderCache()
		};
		var h = !0;
		this.getAdditivity = function() {
			return h
		}, this.setAdditivity = function(a) {
			var b = h != a;
			h = a, b && this.invalidateAppenderCache()
		}, this.addAppender = function(a) {
			e ? handleError("Logger.addAppender: you may not add an appender to the null logger") : a instanceof log4javascript.Appender ? array_contains(b, a) || (b.push(a), a.setAddedToLogger(this), this.invalidateAppenderCache()) : handleError("Logger.addAppender: appender supplied ('" + toStr(a) + "') is not a subclass of Appender")
		}, this.removeAppender = function(a) {
			array_remove(b, a), a.setRemovedFromLogger(this), this.invalidateAppenderCache()
		}, this.removeAllAppenders = function() {
			var a = b.length;
			if (a > 0) {
				for (var c = 0; c < a; c++) b[c].setRemovedFromLogger(this);
				b.length = 0, this.invalidateAppenderCache()
			}
		}, this.getEffectiveAppenders = function() {
			if (null === f || g) {
				var a = d || !this.getAdditivity() ? [] : this.parent.getEffectiveAppenders();
				f = a.concat(b), g = !1
			}
			return f
		}, this.invalidateAppenderCache = function() {
			g = !0;
			for (var a = 0, b = this.children.length; a < b; a++) this.children[a].invalidateAppenderCache()
		}, this.log = function(a, b) {
			if (enabled && a.isGreaterOrEqual(this.getEffectiveLevel())) {
				var c, d = b.length - 1,
					e = b[d];
				b.length > 1 && isError(e) && (c = e, d--);
				for (var f = [], g = 0; g <= d; g++) f[g] = b[g];
				var h = new LoggingEvent(this, new Date, a, f, c);
				this.callAppenders(h)
			}
			"undefined" != typeof logAjax && logAjax.enabled && a.level >= logAjax.level && saveLog(a.name, b[0], b[1])
		}, this.callAppenders = function(a) {
			for (var b = this.getEffectiveAppenders(), c = 0, d = b.length; c < d; c++) b[c].doAppend(a)
		}, this.setLevel = function(a) {
			d && null === a ? handleError("Logger.setLevel: you cannot set the level of the root logger to null") : a instanceof Level ? c = a : handleError("Logger.setLevel: level supplied to logger " + this.name + " is not an instance of log4javascript.Level")
		}, this.getLevel = function() {
			return c
		}, this.getEffectiveLevel = function() {
			for (var a = this; null !== a; a = a.parent) {
				var b = a.getLevel();
				if (null !== b) return b
			}
		}, this.group = function(a, b) {
			if (enabled) for (var c = this.getEffectiveAppenders(), d = 0, e = c.length; d < e; d++) c[d].group(a, b)
		}, this.groupEnd = function() {
			if (enabled) for (var a = this.getEffectiveAppenders(), b = 0, c = a.length; b < c; b++) a[b].groupEnd()
		};
		var i = {};
		this.time = function(a, b) {
			enabled && (isUndefined(a) ? handleError("Logger.time: a name for the timer must be supplied") : !b || b instanceof Level ? i[a] = new Timer(a, b) : handleError("Logger.time: level supplied to timer " + a + " is not an instance of log4javascript.Level"))
		}, this.timeEnd = function(a) {
			if (enabled) if (isUndefined(a)) handleError("Logger.timeEnd: a name for the timer must be supplied");
			else if (i[a]) {
				var b = i[a],
					c = b.getElapsedTime();
				this.log(b.level, ["Timer " + toStr(a) + " completed in " + c + "ms"]), delete i[a]
			} else logLog.warn("Logger.timeEnd: no timer found with name " + a)
		}, this.assert = function(a) {
			if (enabled && !a) {
				for (var b = [], c = 1, d = arguments.length; c < d; c++) b.push(arguments[c]);
				b = b.length > 0 ? b : ["Assertion Failure"], b.push(newLine), b.push(a), this.log(Level.ERROR, b)
			}
		}, this.toString = function() {
			return "Logger[" + this.name + "]"
		}
	}
	function SimpleLayout() {
		this.customFields = []
	}
	function NullLayout() {
		this.customFields = []
	}
	function XmlLayout(a) {
		this.combineMessages = extractBooleanFromParam(a, !0), this.customFields = []
	}
	function escapeNewLines(a) {
		return a.replace(/\r\n|\r|\n/g, "\\r\\n")
	}
	function JsonLayout(a, b) {
		this.readable = extractBooleanFromParam(a, !1), this.combineMessages = extractBooleanFromParam(b, !0), this.batchHeader = this.readable ? "[" + newLine : "[", this.batchFooter = this.readable ? "]" + newLine : "]", this.batchSeparator = this.readable ? "," + newLine : ",", this.setKeys(), this.colon = this.readable ? ": " : ":", this.tab = this.readable ? "\t" : "", this.lineBreak = this.readable ? newLine : "", this.customFields = []
	}
	function HttpPostDataLayout() {
		this.setKeys(), this.customFields = [], this.returnsPostData = !0
	}
	function formatObjectExpansion(a, b, c) {
		function d(a, b, c) {
			function f(a) {
				for (var b = splitIntoLines(a), d = 1, e = b.length; d < e; d++) b[d] = c + b[d];
				return b.join(newLine)
			}
			var g, h, i, j, k, l, m;
			if (c || (c = ""), null === a) return "null";
			if ("undefined" == typeof a) return "undefined";
			if ("string" == typeof a) return f(a);
			if ("object" == typeof a && array_contains(e, a)) {
				try {
					l = toStr(a)
				} catch (a) {
					l = "Error formatting property. Details: " + getExceptionStringRep(a)
				}
				return l + " [already expanded]"
			}
			if (a instanceof Array && b > 0) {
				for (e.push(a), l = "[" + newLine, i = b - 1, j = c + "  ", k = [], g = 0, h = a.length; g < h; g++) try {
					m = d(a[g], i, j), k.push(j + m)
				} catch (a) {
					k.push(j + "Error formatting array member. Details: " + getExceptionStringRep(a))
				}
				return l += k.join("," + newLine) + newLine + c + "]"
			}
			if ("[object Date]" == Object.prototype.toString.call(a)) return a.toString();
			if ("object" == typeof a && b > 0) {
				e.push(a), l = "{" + newLine, i = b - 1, j = c + "  ", k = [];
				for (g in a) try {
					m = d(a[g], i, j), k.push(j + g + ": " + m)
				} catch (a) {
					k.push(j + g + ": Error formatting property. Details: " + getExceptionStringRep(a))
				}
				return l += k.join("," + newLine) + newLine + c + "}"
			}
			return f(toStr(a))
		}
		var e = [];
		return d(a, b, c)
	}
	function PatternLayout(a) {
		a ? this.pattern = a : this.pattern = PatternLayout.DEFAULT_CONVERSION_PATTERN, this.customFields = []
	}
	function AlertAppender() {}
	function BrowserConsoleAppender() {}
	function isHttpRequestSuccessful(a) {
		return isUndefined(a.status) || 0 === a.status || a.status >= 200 && a.status < 300 || 1223 == a.status
	}
	function AjaxAppender(a, b) {
		function c(a) {
			return !A || (handleError("AjaxAppender: configuration option '" + a + "' may not be set after the appender has been initialized"), !1)
		}
		function d() {
			if (l && enabled) {
				z = !0;
				var a;
				if (n) x.length > 0 ? (a = x.shift(), i(f(a), d)) : (z = !1, m && g());
				else {
					for (; a = x.shift();) i(f(a));
					z = !1, m && g()
				}
			}
		}
		function e() {
			var a = !1;
			if (l && enabled) {
				for (var b, c = k.getLayout().allowBatching() ? o : 1, e = []; b = w.shift();) e.push(b), w.length >= c && (x.push(e), e = []);
				e.length > 0 && x.push(e), a = x.length > 0, n = !1, m = !1, d()
			}
			return a
		}
		function f(a) {
			for (var b, c = [], d = ""; b = a.shift();) c.push(k.getLayout().formatWithException(b));
			return d = 1 == a.length ? c.join("") : k.getLayout().batchHeader + c.join(k.getLayout().batchSeparator) + k.getLayout().batchFooter, u == k.defaults.contentType && (d = k.getLayout().returnsPostData ? d : urlEncode(s) + "=" + urlEncode(d), d.length > 0 && (d += "&"), d += "layout=" + urlEncode(k.getLayout().toString())), d
		}
		function g() {
			window.setTimeout(d, p)
		}
		function h() {
			var a = "AjaxAppender: could not create XMLHttpRequest object. AjaxAppender disabled";
			handleError(a), l = !1, r && r(a)
		}
		function i(c, d) {
			try {
				var e = getXmlHttp(h);
				if (l) {
					e.onreadystatechange = function() {
						if (4 == e.readyState) {
							if (isHttpRequestSuccessful(e)) q && q(e), d && d(e);
							else {
								var b = "AjaxAppender.append: XMLHttpRequest request to URL " + a + " returned status code " + e.status;
								handleError(b), r && r(b)
							}
							e.onreadystatechange = emptyFunction, e = null
						}
					}, e.open("POST", a, !0), b && withCredentialsSupported && (e.withCredentials = !0);
					try {
						for (var f, g = 0; f = y[g++];) e.setRequestHeader(f.name, f.value);
						e.setRequestHeader("Content-Type", u)
					} catch (a) {
						var i = "AjaxAppender.append: your browser's XMLHttpRequest implementation does not support setRequestHeader, therefore cannot post data. AjaxAppender disabled";
						return handleError(i), l = !1, void(r && r(i))
					}
					e.send(c)
				}
			} catch (b) {
				var j = "AjaxAppender.append: error sending log message to " + a;
				handleError(j, b), l = !1, r && r(j + ". Details: " + getExceptionStringRep(b))
			}
		}
		function j() {
			if (A = !0, t) {
				var a = window.onbeforeunload;
				window.onbeforeunload = function() {
					a && a(), e()
				}
			}
			m && g()
		}
		var k = this,
			l = !0;
		a || (handleError("AjaxAppender: URL must be specified in constructor"), l = !1);
		var m = this.defaults.timed,
			n = this.defaults.waitForResponse,
			o = this.defaults.batchSize,
			p = this.defaults.timerInterval,
			q = this.defaults.requestSuccessCallback,
			r = this.defaults.failCallback,
			s = this.defaults.postVarName,
			t = this.defaults.sendAllOnUnload,
			u = this.defaults.contentType,
			v = null,
			w = [],
			x = [],
			y = [],
			z = !1,
			A = !1;
		this.getSessionId = function() {
			return v
		}, this.setSessionId = function(a) {
			v = extractStringFromParam(a, null), this.layout.setCustomField("sessionid", v)
		}, this.setLayout = function(a) {
			c("layout") && (this.layout = a, null !== v && this.setSessionId(v))
		}, this.isTimed = function() {
			return m
		}, this.setTimed = function(a) {
			c("timed") && (m = bool(a))
		}, this.getTimerInterval = function() {
			return p
		}, this.setTimerInterval = function(a) {
			c("timerInterval") && (p = extractIntFromParam(a, p))
		}, this.isWaitForResponse = function() {
			return n
		}, this.setWaitForResponse = function(a) {
			c("waitForResponse") && (n = bool(a))
		}, this.getBatchSize = function() {
			return o
		}, this.setBatchSize = function(a) {
			c("batchSize") && (o = extractIntFromParam(a, o))
		}, this.isSendAllOnUnload = function() {
			return t
		}, this.setSendAllOnUnload = function(a) {
			c("sendAllOnUnload") && (t = extractBooleanFromParam(a, t))
		}, this.setRequestSuccessCallback = function(a) {
			q = extractFunctionFromParam(a, q)
		}, this.setFailCallback = function(a) {
			r = extractFunctionFromParam(a, r)
		}, this.getPostVarName = function() {
			return s
		}, this.setPostVarName = function(a) {
			c("postVarName") && (s = extractStringFromParam(a, s))
		}, this.getHeaders = function() {
			return y
		}, this.addHeader = function(a, b) {
			"content-type" == a.toLowerCase() ? u = b : y.push({
				name: a,
				value: b
			})
		}, this.sendAll = d, this.sendAllRemaining = e, this.append = function(a) {
			if (l) {
				A || j(), w.push(a);
				var b = this.getLayout().allowBatching() ? o : 1;
				if (w.length >= b) {
					for (var c, e = []; c = w.shift();) e.push(c);
					x.push(e), m || n && (!n || z) || d()
				}
			}
		}
	}
	function setCookie(a, b, c, d) {
		var e;
		if (d = d ? "; path=" + d : "", c) {
			var f = new Date;
			f.setTime(f.getTime() + 24 * c * 60 * 60 * 1e3), e = "; expires=" + f.toGMTString()
		} else e = "";
		document.cookie = escape(a) + "=" + escape(b) + e + d
	}
	function getCookie(a) {
		for (var b = escape(a) + "=", c = document.cookie.split(";"), d = 0, e = c.length; d < e; d++) {
			for (var f = c[d];
			" " === f.charAt(0);) f = f.substring(1, f.length);
			if (0 === f.indexOf(b)) return unescape(f.substring(b.length, f.length))
		}
		return null
	}
	function getBaseUrl() {
		for (var a = document.getElementsByTagName("script"), b = 0, c = a.length; b < c; ++b) if (a[b].src.indexOf("log4javascript") != -1) {
			var d = a[b].src.lastIndexOf("/");
			return d == -1 ? "" : a[b].src.substr(0, d + 1)
		}
		return null
	}
	function isLoaded(a) {
		try {
			return bool(a.loaded)
		} catch (a) {
			return !1
		}
	}
	function padWithSpaces(a, b) {
		if (a.length < b) {
			for (var c = [], d = Math.max(0, b - a.length), e = 0; e < d; e++) c[e] = " ";
			a += c.join("")
		}
		return a
	}
	function createDefaultLogger() {
		var a = log4javascript.getLogger(defaultLoggerName),
			b = new log4javascript.PopUpAppender;
		return a.addAppender(b), a
	}
	Array.prototype.push || (Array.prototype.push = function() {
		for (var a = 0, b = arguments.length; a < b; a++) this[this.length] = arguments[a];
		return this.length
	}), Array.prototype.shift || (Array.prototype.shift = function() {
		if (this.length > 0) {
			for (var a = this[0], b = 0, c = this.length - 1; b < c; b++) this[b] = this[b + 1];
			return this.length = this.length - 1, a
		}
	}), Array.prototype.splice || (Array.prototype.splice = function(a, b) {
		var c = this.slice(a + b),
			d = this.slice(a, a + b);
		this.length = a;
		for (var e = [], f = 0, g = arguments.length; f < g; f++) e[f] = arguments[f];
		var h = e.length > 2 ? c = e.slice(2).concat(c) : c;
		for (f = 0, g = h.length; f < g; f++) this.push(h[f]);
		return d
	}), EventSupport.prototype = {
		eventTypes: [],
		eventListeners: {},
		setEventTypes: function(a) {
			if (a instanceof Array) {
				this.eventTypes = a, this.eventListeners = {};
				for (var b = 0, c = this.eventTypes.length; b < c; b++) this.eventListeners[this.eventTypes[b]] = []
			} else handleError("log4javascript.EventSupport [" + this + "]: setEventTypes: eventTypes parameter must be an Array")
		},
		addEventListener: function(a, b) {
			"function" == typeof b ? (array_contains(this.eventTypes, a) || handleError("log4javascript.EventSupport [" + this + "]: addEventListener: no event called '" + a + "'"), this.eventListeners[a].push(b)) : handleError("log4javascript.EventSupport [" + this + "]: addEventListener: listener must be a function")
		},
		removeEventListener: function(a, b) {
			"function" == typeof b ? (array_contains(this.eventTypes, a) || handleError("log4javascript.EventSupport [" + this + "]: removeEventListener: no event called '" + a + "'"), array_remove(this.eventListeners[a], b)) : handleError("log4javascript.EventSupport [" + this + "]: removeEventListener: listener must be a function")
		},
		dispatchEvent: function(a, b) {
			if (array_contains(this.eventTypes, a)) for (var c = this.eventListeners[a], d = 0, e = c.length; d < e; d++) c[d](this, a, b);
			else handleError("log4javascript.EventSupport [" + this + "]: dispatchEvent: no event called '" + a + "'")
		}
	};
	var applicationStartDate = new Date,
		uniqueId = "log4javascript_" + applicationStartDate.getTime() + "_" + Math.floor(1e8 * Math.random()),
		emptyFunction = function() {},
		newLine = "\r\n",
		pageLoaded = !1;
	Log4JavaScript.prototype = new EventSupport;
	var log4javascript = new Log4JavaScript;
	log4javascript.version = "1.4.11", log4javascript.edition = "log4javascript";
	var urlEncode = "undefined" != typeof window.encodeURIComponent ?
	function(a) {
		return encodeURIComponent(a)
	} : function(a) {
		return escape(a).replace(/\+/g, "%2B").replace(/"/g, "%22").replace(/'/g, "%27").replace(/\//g, "%2F").replace(/=/g, "%3D")
	};
	Function.prototype.apply || (Function.prototype.apply = function(obj, args) {
		var methodName = "__apply__";
		"undefined" != typeof obj[methodName] && (methodName += String(Math.random()).substr(2)), obj[methodName] = this;
		for (var argsStrings = [], i = 0, len = args.length; i < len; i++) argsStrings[i] = "args[" + i + "]";
		var script = "obj." + methodName + "(" + argsStrings.join(",") + ")",
			returnValue = eval(script);
		return delete obj[methodName], returnValue
	}), Function.prototype.call || (Function.prototype.call = function(a) {
		for (var b = [], c = 1, d = arguments.length; c < d; c++) b[c - 1] = arguments[c];
		return this.apply(a, b)
	});
	var logLog = {
		quietMode: !1,
		debugMessages: [],
		setQuietMode: function(a) {
			this.quietMode = bool(a)
		},
		numberOfErrors: 0,
		alertAllErrors: !1,
		setAlertAllErrors: function(a) {
			this.alertAllErrors = a
		},
		debug: function(a) {
			this.debugMessages.push(a)
		},
		displayDebug: function() {
			alert(this.debugMessages.join(newLine))
		},
		warn: function(a, b) {},
		error: function(a, b) {
			if ((1 == ++this.numberOfErrors || this.alertAllErrors) && !this.quietMode) {
				var c = "log4javascript error: " + a;
				b && (c += newLine + newLine + "Original error: " + getExceptionStringRep(b)), alert(c)
			}
		}
	};
	log4javascript.logLog = logLog, log4javascript.setEventTypes(["load", "error"]), log4javascript.handleError = handleError;
	var enabled = !("undefined" != typeof log4javascript_disabled && log4javascript_disabled);
	log4javascript.setEnabled = function(a) {
		enabled = bool(a)
	}, log4javascript.isEnabled = function() {
		return enabled
	};
	var useTimeStampsInMilliseconds = !0;
	log4javascript.setTimeStampsInMilliseconds = function(a) {
		useTimeStampsInMilliseconds = bool(a)
	}, log4javascript.isTimeStampsInMilliseconds = function() {
		return useTimeStampsInMilliseconds
	}, log4javascript.evalInScope = function(expr) {
		return eval(expr)
	};
	var showStackTraces = !1;
	log4javascript.setShowStackTraces = function(a) {
		showStackTraces = bool(a)
	};
	var Level = function(a, b) {
			this.level = a, this.name = b
		};
	Level.prototype = {
		toString: function() {
			return this.name
		},
		equals: function(a) {
			return this.level == a.level
		},
		isGreaterOrEqual: function(a) {
			return this.level >= a.level
		}
	}, Level.ALL = new Level(Number.MIN_VALUE, "ALL"), Level.TRACE = new Level(1e4, "TRACE"), Level.DEBUG = new Level(2e4, "DEBUG"), Level.INFO = new Level(3e4, "INFO"), Level.WARN = new Level(4e4, "WARN"), Level.ERROR = new Level(5e4, "ERROR"), Level.FATAL = new Level(6e4, "FATAL"), Level.OFF = new Level(Number.MAX_VALUE, "OFF"), log4javascript.Level = Level, Timer.prototype.getElapsedTime = function() {
		return (new Date).getTime() - this.start.getTime()
	};
	var anonymousLoggerName = "[anonymous]",
		defaultLoggerName = "[default]",
		nullLoggerName = "[null]",
		rootLoggerName = "root";
	Logger.prototype = {
		trace: function() {
			this.log(Level.TRACE, arguments)
		},
		debug: function() {
			this.log(Level.DEBUG, arguments)
		},
		info: function() {
			this.log(Level.INFO, arguments)
		},
		warn: function() {
			this.log(Level.WARN, arguments)
		},
		error: function() {
			this.log(Level.ERROR, arguments)
		},
		fatal: function() {
			this.log(Level.FATAL, arguments)
		},
		isEnabledFor: function(a) {
			return a.isGreaterOrEqual(this.getEffectiveLevel())
		},
		isTraceEnabled: function() {
			return this.isEnabledFor(Level.TRACE)
		},
		isDebugEnabled: function() {
			return this.isEnabledFor(Level.DEBUG)
		},
		isInfoEnabled: function() {
			return this.isEnabledFor(Level.INFO)
		},
		isWarnEnabled: function() {
			return this.isEnabledFor(Level.WARN)
		},
		isErrorEnabled: function() {
			return this.isEnabledFor(Level.ERROR)
		},
		isFatalEnabled: function() {
			return this.isEnabledFor(Level.FATAL)
		}
	}, Logger.prototype.trace.isEntryPoint = !0, Logger.prototype.debug.isEntryPoint = !0, Logger.prototype.info.isEntryPoint = !0, Logger.prototype.warn.isEntryPoint = !0, Logger.prototype.error.isEntryPoint = !0, Logger.prototype.fatal.isEntryPoint = !0;
	var loggers = {},
		loggerNames = [],
		ROOT_LOGGER_DEFAULT_LEVEL = Level.DEBUG,
		rootLogger = new Logger(rootLoggerName);
	rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL), log4javascript.getRootLogger = function() {
		return rootLogger
	}, log4javascript.getLogger = function(a) {
		if ("string" != typeof a && (a = anonymousLoggerName, logLog.warn("log4javascript.getLogger: non-string logger name " + toStr(a) + " supplied, returning anonymous logger")), a == rootLoggerName && handleError("log4javascript.getLogger: root logger may not be obtained by name"), !loggers[a]) {
			var b = new Logger(a);
			loggers[a] = b, loggerNames.push(a);
			var c, d = a.lastIndexOf(".");
			if (d > -1) {
				var e = a.substring(0, d);
				c = log4javascript.getLogger(e)
			} else c = rootLogger;
			c.addChild(b)
		}
		return loggers[a]
	};
	var defaultLogger = null;
	log4javascript.getDefaultLogger = function() {
		return defaultLogger || (defaultLogger = createDefaultLogger()), defaultLogger
	};
	var nullLogger = null;
	log4javascript.getNullLogger = function() {
		return nullLogger || (nullLogger = new Logger(nullLoggerName), nullLogger.setLevel(Level.OFF)), nullLogger
	}, log4javascript.resetConfiguration = function() {
		rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL), loggers = {}
	};
	var LoggingEvent = function(a, b, c, d, e) {
			this.logger = a, this.timeStamp = b, this.timeStampInMilliseconds = b.getTime(), this.timeStampInSeconds = Math.floor(this.timeStampInMilliseconds / 1e3), this.milliseconds = this.timeStamp.getMilliseconds(), this.level = c, this.messages = d, this.exception = e
		};
	LoggingEvent.prototype = {
		getThrowableStrRep: function() {
			return this.exception ? getExceptionStringRep(this.exception) : ""
		},
		getCombinedMessages: function() {
			return 1 == this.messages.length ? this.messages[0] : this.messages.join(newLine)
		},
		toString: function() {
			return "LoggingEvent[" + this.level + "]"
		}
	}, log4javascript.LoggingEvent = LoggingEvent;
	var Layout = function() {};
	Layout.prototype = {
		defaults: {
			loggerKey: "logger",
			timeStampKey: "timestamp",
			millisecondsKey: "milliseconds",
			levelKey: "level",
			messageKey: "message",
			exceptionKey: "exception",
			urlKey: "url"
		},
		loggerKey: "logger",
		timeStampKey: "timestamp",
		millisecondsKey: "milliseconds",
		levelKey: "level",
		messageKey: "message",
		exceptionKey: "exception",
		urlKey: "url",
		batchHeader: "",
		batchFooter: "",
		batchSeparator: "",
		returnsPostData: !1,
		overrideTimeStampsSetting: !1,
		useTimeStampsInMilliseconds: null,
		format: function() {
			handleError("Layout.format: layout supplied has no format() method")
		},
		ignoresThrowable: function() {
			handleError("Layout.ignoresThrowable: layout supplied has no ignoresThrowable() method")
		},
		getContentType: function() {
			return "text/plain"
		},
		allowBatching: function() {
			return !0
		},
		setTimeStampsInMilliseconds: function(a) {
			this.overrideTimeStampsSetting = !0, this.useTimeStampsInMilliseconds = bool(a)
		},
		isTimeStampsInMilliseconds: function() {
			return this.overrideTimeStampsSetting ? this.useTimeStampsInMilliseconds : useTimeStampsInMilliseconds
		},
		getTimeStampValue: function(a) {
			return this.isTimeStampsInMilliseconds() ? a.timeStampInMilliseconds : a.timeStampInSeconds
		},
		getDataValues: function(a, b) {
			var c = [
				[this.loggerKey, a.logger.name],
				[this.timeStampKey, this.getTimeStampValue(a)],
				[this.levelKey, a.level.name],
				[this.urlKey, window.location.href],
				[this.messageKey, b ? a.getCombinedMessages() : a.messages]
			];
			if (this.isTimeStampsInMilliseconds() || c.push([this.millisecondsKey, a.milliseconds]), a.exception && c.push([this.exceptionKey, getExceptionStringRep(a.exception)]), this.hasCustomFields()) for (var d = 0, e = this.customFields.length; d < e; d++) {
				var f = this.customFields[d].value;
				"function" == typeof f && (f = f(this, a)), c.push([this.customFields[d].name, f])
			}
			return c
		},
		setKeys: function(a, b, c, d, e, f, g) {
			this.loggerKey = extractStringFromParam(a, this.defaults.loggerKey), this.timeStampKey = extractStringFromParam(b, this.defaults.timeStampKey), this.levelKey = extractStringFromParam(c, this.defaults.levelKey), this.messageKey = extractStringFromParam(d, this.defaults.messageKey), this.exceptionKey = extractStringFromParam(e, this.defaults.exceptionKey), this.urlKey = extractStringFromParam(f, this.defaults.urlKey), this.millisecondsKey = extractStringFromParam(g, this.defaults.millisecondsKey)
		},
		setCustomField: function(a, b) {
			for (var c = !1, d = 0, e = this.customFields.length; d < e; d++) this.customFields[d].name === a && (this.customFields[d].value = b, c = !0);
			c || this.customFields.push({
				name: a,
				value: b
			})
		},
		hasCustomFields: function() {
			return this.customFields.length > 0
		},
		formatWithException: function(a) {
			var b = this.format(a);
			return a.exception && this.ignoresThrowable() && (b += a.getThrowableStrRep()), b
		},
		toString: function() {
			handleError("Layout.toString: all layouts must override this method")
		}
	}, log4javascript.Layout = Layout;
	var Appender = function() {};
	Appender.prototype = new EventSupport, Appender.prototype.layout = new PatternLayout, Appender.prototype.threshold = Level.ALL, Appender.prototype.loggers = [], Appender.prototype.doAppend = function(a) {
		enabled && a.level.level >= this.threshold.level && this.append(a)
	}, Appender.prototype.append = function(a) {}, Appender.prototype.setLayout = function(a) {
		a instanceof Layout ? this.layout = a : handleError("Appender.setLayout: layout supplied to " + this.toString() + " is not a subclass of Layout")
	}, Appender.prototype.getLayout = function() {
		return this.layout
	}, Appender.prototype.setThreshold = function(a) {
		a instanceof Level ? this.threshold = a : handleError("Appender.setThreshold: threshold supplied to " + this.toString() + " is not a subclass of Level")
	}, Appender.prototype.getThreshold = function() {
		return this.threshold
	}, Appender.prototype.setAddedToLogger = function(a) {
		this.loggers.push(a)
	}, Appender.prototype.setRemovedFromLogger = function(a) {
		array_remove(this.loggers, a)
	}, Appender.prototype.group = emptyFunction, Appender.prototype.groupEnd = emptyFunction, Appender.prototype.toString = function() {
		handleError("Appender.toString: all appenders must override this method")
	}, log4javascript.Appender = Appender, SimpleLayout.prototype = new Layout, SimpleLayout.prototype.format = function(a) {
		return a.level.name + " - " + a.getCombinedMessages()
	}, SimpleLayout.prototype.ignoresThrowable = function() {
		return !0
	}, SimpleLayout.prototype.toString = function() {
		return "SimpleLayout"
	}, log4javascript.SimpleLayout = SimpleLayout, NullLayout.prototype = new Layout, NullLayout.prototype.format = function(a) {
		return a.messages
	}, NullLayout.prototype.ignoresThrowable = function() {
		return !0
	}, NullLayout.prototype.formatWithException = function(a) {
		var b = a.messages,
			c = a.exception;
		return c ? b.concat([c]) : b
	}, NullLayout.prototype.toString = function() {
		return "NullLayout"
	}, log4javascript.NullLayout = NullLayout, XmlLayout.prototype = new Layout, XmlLayout.prototype.isCombinedMessages = function() {
		return this.combineMessages
	}, XmlLayout.prototype.getContentType = function() {
		return "text/xml"
	}, XmlLayout.prototype.escapeCdata = function(a) {
		return a.replace(/\]\]>/, "]]>]]&gt;<![CDATA[")
	}, XmlLayout.prototype.format = function(a) {
		function b(a) {
			return a = "string" == typeof a ? a : toStr(a), "<log4javascript:message><![CDATA[" + e.escapeCdata(a) + "]]></log4javascript:message>"
		}
		var c, d, e = this,
			f = '<log4javascript:event logger="' + a.logger.name + '" timestamp="' + this.getTimeStampValue(a) + '"';
		if (this.isTimeStampsInMilliseconds() || (f += ' milliseconds="' + a.milliseconds + '"'), f += ' level="' + a.level.name + '">' + newLine, this.combineMessages) f += b(a.getCombinedMessages());
		else {
			for (f += "<log4javascript:messages>" + newLine, c = 0, d = a.messages.length; c < d; c++) f += b(a.messages[c]) + newLine;
			f += "</log4javascript:messages>" + newLine
		}
		if (this.hasCustomFields()) for (c = 0, d = this.customFields.length; c < d; c++) f += '<log4javascript:customfield name="' + this.customFields[c].name + '"><![CDATA[' + this.customFields[c].value.toString() + "]]></log4javascript:customfield>" + newLine;
		return a.exception && (f += "<log4javascript:exception><![CDATA[" + getExceptionStringRep(a.exception) + "]]></log4javascript:exception>" + newLine), f += "</log4javascript:event>" + newLine + newLine
	}, XmlLayout.prototype.ignoresThrowable = function() {
		return !1
	}, XmlLayout.prototype.toString = function() {
		return "XmlLayout"
	}, log4javascript.XmlLayout = XmlLayout, JsonLayout.prototype = new Layout, JsonLayout.prototype.isReadable = function() {
		return this.readable
	}, JsonLayout.prototype.isCombinedMessages = function() {
		return this.combineMessages
	}, JsonLayout.prototype.format = function(a) {
		function b(a, c, d) {
			var f, g = typeof a;
			if (a instanceof Date) f = String(a.getTime());
			else if (d && a instanceof Array) {
				f = "[" + e.lineBreak;
				for (var h = 0, i = a.length; h < i; h++) {
					var j = c + e.tab;
					f += j + b(a[h], j, !1), h < a.length - 1 && (f += ","), f += e.lineBreak
				}
				f += c + "]"
			} else f = "number" !== g && "boolean" !== g ? '"' + escapeNewLines(toStr(a).replace(/\"/g, '\\"')) + '"' : a;
			return f
		}
		var c, d, e = this,
			f = this.getDataValues(a, this.combineMessages),
			g = "{" + this.lineBreak;
		for (c = 0, d = f.length - 1; c <= d; c++) g += this.tab + '"' + f[c][0] + '"' + this.colon + b(f[c][1], this.tab, !0), c < d && (g += ","), g += this.lineBreak;
		return g += "}" + this.lineBreak
	}, JsonLayout.prototype.ignoresThrowable = function() {
		return !1
	}, JsonLayout.prototype.toString = function() {
		return "JsonLayout"
	}, JsonLayout.prototype.getContentType = function() {
		return "application/json"
	}, log4javascript.JsonLayout = JsonLayout, HttpPostDataLayout.prototype = new Layout, HttpPostDataLayout.prototype.allowBatching = function() {
		return !1
	}, HttpPostDataLayout.prototype.format = function(a) {
		for (var b = this.getDataValues(a), c = [], d = 0, e = b.length; d < e; d++) {
			var f = b[d][1] instanceof Date ? String(b[d][1].getTime()) : b[d][1];
			c.push(urlEncode(b[d][0]) + "=" + urlEncode(f))
		}
		return c.join("&")
	}, HttpPostDataLayout.prototype.ignoresThrowable = function(a) {
		return !1
	}, HttpPostDataLayout.prototype.toString = function() {
		return "HttpPostDataLayout"
	}, log4javascript.HttpPostDataLayout = HttpPostDataLayout;
	var SimpleDateFormat;
	!
	function() {
		var a = /('[^']*')|(G+|y+|M+|w+|W+|D+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/,
			b = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			c = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			d = 0,
			e = 1,
			f = 2,
			g = 3,
			h = 4,
			i = 5,
			j = {
				G: d,
				y: g,
				M: h,
				w: f,
				W: f,
				D: f,
				d: f,
				F: f,
				E: e,
				a: d,
				H: f,
				k: f,
				K: f,
				h: f,
				m: f,
				s: f,
				S: f,
				Z: i
			},
			k = 864e5,
			l = 7 * k,
			m = 1,
			n = function(a, b, c) {
				var d = new Date(a, b, c, 0, 0, 0);
				return d.setMilliseconds(0), d
			};
		Date.prototype.getDifference = function(a) {
			return this.getTime() - a.getTime()
		}, Date.prototype.isBefore = function(a) {
			return this.getTime() < a.getTime()
		}, Date.prototype.getUTCTime = function() {
			return Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds())
		}, Date.prototype.getTimeSince = function(a) {
			return this.getUTCTime() - a.getUTCTime()
		}, Date.prototype.getPreviousSunday = function() {
			var a = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 12, 0, 0),
				b = new Date(a.getTime() - this.getDay() * k);
			return n(b.getFullYear(), b.getMonth(), b.getDate())
		}, Date.prototype.getWeekInYear = function(a) {
			isUndefined(this.minimalDaysInFirstWeek) && (a = m);
			var b = this.getPreviousSunday(),
				c = n(this.getFullYear(), 0, 1),
				d = b.isBefore(c) ? 0 : 1 + Math.floor(b.getTimeSince(c) / l),
				e = 7 - c.getDay(),
				f = d;
			return e < a && f--, f
		}, Date.prototype.getWeekInMonth = function(a) {
			isUndefined(this.minimalDaysInFirstWeek) && (a = m);
			var b = this.getPreviousSunday(),
				c = n(this.getFullYear(), this.getMonth(), 1),
				d = b.isBefore(c) ? 0 : 1 + Math.floor(b.getTimeSince(c) / l),
				e = 7 - c.getDay(),
				f = d;
			return e >= a && f++, f
		}, Date.prototype.getDayInYear = function() {
			var a = n(this.getFullYear(), 0, 1);
			return 1 + Math.floor(this.getTimeSince(a) / k)
		}, SimpleDateFormat = function(a) {
			this.formatString = a
		}, SimpleDateFormat.prototype.setMinimalDaysInFirstWeek = function(a) {
			this.minimalDaysInFirstWeek = a
		}, SimpleDateFormat.prototype.getMinimalDaysInFirstWeek = function() {
			return isUndefined(this.minimalDaysInFirstWeek) ? m : this.minimalDaysInFirstWeek
		};
		var o = function(a, b) {
				for (; a.length < b;) a = "0" + a;
				return a
			},
			p = function(a, b, c) {
				return b >= 4 ? a : a.substr(0, Math.max(c, b))
			},
			q = function(a, b) {
				var c = "" + a;
				return o(c, b)
			};
		SimpleDateFormat.prototype.format = function(k) {
			for (var l, m = "", n = this.formatString; l = a.exec(n);) {
				var r = l[1],
					s = l[2],
					t = l[3],
					u = l[4];
				if (r) m += "''" == r ? "'" : r.substring(1, r.length - 1);
				else if (t);
				else if (u) m += u;
				else if (s) {
					var v = s.charAt(0),
						w = s.length,
						x = "";
					switch (v) {
					case "G":
						x = "AD";
						break;
					case "y":
						x = k.getFullYear();
						break;
					case "M":
						x = k.getMonth();
						break;
					case "w":
						x = k.getWeekInYear(this.getMinimalDaysInFirstWeek());
						break;
					case "W":
						x = k.getWeekInMonth(this.getMinimalDaysInFirstWeek());
						break;
					case "D":
						x = k.getDayInYear();
						break;
					case "d":
						x = k.getDate();
						break;
					case "F":
						x = 1 + Math.floor((k.getDate() - 1) / 7);
						break;
					case "E":
						x = c[k.getDay()];
						break;
					case "a":
						x = k.getHours() >= 12 ? "PM" : "AM";
						break;
					case "H":
						x = k.getHours();
						break;
					case "k":
						x = k.getHours() || 24;
						break;
					case "K":
						x = k.getHours() % 12;
						break;
					case "h":
						x = k.getHours() % 12 || 12;
						break;
					case "m":
						x = k.getMinutes();
						break;
					case "s":
						x = k.getSeconds();
						break;
					case "S":
						x = k.getMilliseconds();
						break;
					case "Z":
						x = k.getTimezoneOffset()
					}
					switch (j[v]) {
					case d:
						m += p(x, w, 2);
						break;
					case e:
						m += p(x, w, 3);
						break;
					case f:
						m += q(x, w);
						break;
					case g:
						if (w <= 3) {
							var y = "" + x;
							m += y.substr(2, 2)
						} else m += q(x, w);
						break;
					case h:
						m += w >= 3 ? p(b[x], w, w) : q(x + 1, w);
						break;
					case i:
						var z = x > 0,
							A = z ? "-" : "+",
							B = Math.abs(x),
							C = "" + Math.floor(B / 60);
						C = o(C, 2);
						var D = "" + B % 60;
						D = o(D, 2), m += A + C + D
					}
				}
				n = n.substr(l.index + l[0].length)
			}
			return m
		}
	}(), log4javascript.SimpleDateFormat = SimpleDateFormat, PatternLayout.TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n", PatternLayout.DEFAULT_CONVERSION_PATTERN = "%m%n", PatternLayout.ISO8601_DATEFORMAT = "yyyy-MM-dd HH:mm:ss,SSS", PatternLayout.DATETIME_DATEFORMAT = "dd MMM yyyy HH:mm:ss,SSS", PatternLayout.ABSOLUTETIME_DATEFORMAT = "HH:mm:ss,SSS", PatternLayout.prototype = new Layout, PatternLayout.prototype.format = function(a) {
		for (var b, c = /%(-?[0-9]+)?(\.?[0-9]+)?([acdfmMnpr%])(\{([^\}]+)\})?|([^%]+)/, d = "", e = this.pattern; b = c.exec(e);) {
			var f = b[0],
				g = b[1],
				h = b[2],
				i = b[3],
				j = b[5],
				k = b[6];
			if (k) d += "" + k;
			else {
				var l = "";
				switch (i) {
				case "a":
				case "m":
					var m = 0;
					j && (m = parseInt(j, 10), isNaN(m) && (handleError("PatternLayout.format: invalid specifier '" + j + "' for conversion character '" + i + "' - should be a number"), m = 0));
					for (var n = "a" === i ? a.messages[0] : a.messages, o = 0, p = n.length; o < p; o++) o > 0 && " " !== l.charAt(l.length - 1) && (l += " "), l += 0 === m ? n[o] : formatObjectExpansion(n[o], m);
					break;
				case "c":
					var q = a.logger.name;
					if (j) {
						var r = parseInt(j, 10),
							s = a.logger.name.split(".");
						l = r >= s.length ? q : s.slice(s.length - r).join(".")
					} else l = q;
					break;
				case "d":
					var t = PatternLayout.ISO8601_DATEFORMAT;
					j && (t = j, "ISO8601" == t ? t = PatternLayout.ISO8601_DATEFORMAT : "ABSOLUTE" == t ? t = PatternLayout.ABSOLUTETIME_DATEFORMAT : "DATE" == t && (t = PatternLayout.DATETIME_DATEFORMAT)), l = new SimpleDateFormat(t).format(a.timeStamp);
					break;
				case "f":
					if (this.hasCustomFields()) {
						var u = 0;
						j && (u = parseInt(j, 10), isNaN(u) ? handleError("PatternLayout.format: invalid specifier '" + j + "' for conversion character 'f' - should be a number") : 0 === u ? handleError("PatternLayout.format: invalid specifier '" + j + "' for conversion character 'f' - must be greater than zero") : u > this.customFields.length ? handleError("PatternLayout.format: invalid specifier '" + j + "' for conversion character 'f' - there aren't that many custom fields") : u -= 1);
						var v = this.customFields[u].value;
						"function" == typeof v && (v = v(this, a)), l = v
					}
					break;
				case "n":
					l = newLine;
					break;
				case "p":
					l = a.level.name;
					break;
				case "r":
					l = "" + a.timeStamp.getDifference(applicationStartDate);
					break;
				case "%":
					l = "%";
					break;
				default:
					l = f
				}
				var w;
				if (h) {
					w = parseInt(h.substr(1), 10);
					var x = l.length;
					w < x && (l = l.substring(x - w, x))
				}
				if (g) if ("-" == g.charAt(0)) for (w = parseInt(g.substr(1), 10); l.length < w;) l += " ";
				else for (w = parseInt(g, 10); l.length < w;) l = " " + l;
				d += l
			}
			e = e.substr(b.index + b[0].length)
		}
		return d
	}, PatternLayout.prototype.ignoresThrowable = function() {
		return !0
	}, PatternLayout.prototype.toString = function() {
		return "PatternLayout"
	}, log4javascript.PatternLayout = PatternLayout, AlertAppender.prototype = new Appender, AlertAppender.prototype.layout = new SimpleLayout, AlertAppender.prototype.append = function(a) {
		alert(this.getLayout().formatWithException(a))
	}, AlertAppender.prototype.toString = function() {
		return "AlertAppender"
	}, log4javascript.AlertAppender = AlertAppender, BrowserConsoleAppender.prototype = new log4javascript.Appender, BrowserConsoleAppender.prototype.layout = new NullLayout, BrowserConsoleAppender.prototype.threshold = Level.DEBUG, BrowserConsoleAppender.prototype.append = function(a) {
		var b, c = this,
			d = function() {
				var b = c.getLayout().formatWithException(a);
				return "string" == typeof b ? [b] : b
			};
		if ((b = window.console) && b.log) {
			var e, f = d();
			e = b.debug && Level.DEBUG.isGreaterOrEqual(a.level) ? "debug" : b.info && Level.INFO.equals(a.level) ? "info" : b.warn && Level.WARN.equals(a.level) ? "warn" : b.error && a.level.isGreaterOrEqual(Level.ERROR) ? "error" : "log", b[e].apply ? b[e].apply(b, f) : b[e](f)
		} else "undefined" != typeof opera && opera.postError && opera.postError(d())
	}, BrowserConsoleAppender.prototype.group = function(a) {
		window.console && window.console.group && window.console.group(a)
	}, BrowserConsoleAppender.prototype.groupEnd = function() {
		window.console && window.console.groupEnd && window.console.groupEnd()
	}, BrowserConsoleAppender.prototype.toString = function() {
		return "BrowserConsoleAppender"
	}, log4javascript.BrowserConsoleAppender = BrowserConsoleAppender;
	var xhrFactory = function() {
			return new XMLHttpRequest
		},
		xmlHttpFactories = [xhrFactory, function() {
			return new ActiveXObject("Msxml2.XMLHTTP")
		}, function() {
			return new ActiveXObject("Microsoft.XMLHTTP")
		}],
		withCredentialsSupported = !1,
		getXmlHttp = function(a) {
			for (var b, c = null, d = 0, e = xmlHttpFactories.length; d < e; d++) {
				b = xmlHttpFactories[d];
				try {
					return c = b(), withCredentialsSupported = b == xhrFactory && "withCredentials" in c, getXmlHttp = b, c
				} catch (a) {}
			}
			a ? a() : handleError("getXmlHttp: unable to obtain XMLHttpRequest object")
		};
	AjaxAppender.prototype = new Appender, AjaxAppender.prototype.defaults = {
		waitForResponse: !1,
		timed: !1,
		timerInterval: 1e3,
		batchSize: 1,
		sendAllOnUnload: !1,
		requestSuccessCallback: null,
		failCallback: null,
		postVarName: "data",
		contentType: "application/x-www-form-urlencoded"
	}, AjaxAppender.prototype.layout = new HttpPostDataLayout, AjaxAppender.prototype.toString = function() {
		return "AjaxAppender"
	}, log4javascript.AjaxAppender = AjaxAppender;
	var ConsoleAppender;
	if (function() {
		function a(a, b, c, d, e) {
			this.create(!1, null, a, b, c, d, e, this.defaults.focusPopUp)
		}
		function b(a, b, c, d, e, f) {
			this.create(!0, a, b, c, d, e, f, !1)
		}
		var c = function() {
				return ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">', '<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">', "\t<head>", "\t\t<title>log4javascript</title>", '\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />', "\t\t<!-- Make IE8 behave like IE7, having gone to all the trouble of making IE work -->", '\t\t<meta http-equiv="X-UA-Compatible" content="IE=7" />', '\t\t<script type="text/javascript">var isIe = false, isIePre7 = false;</script>', '\t\t<!--[if IE]><script type="text/javascript">isIe = true</script><![endif]-->', '\t\t<!--[if lt IE 7]><script type="text/javascript">isIePre7 = true</script><![endif]-->', '\t\t<script type="text/javascript">', "\t\t\t//<![CDATA[", "\t\t\tvar loggingEnabled = true;", "\t\t\tvar logQueuedEventsTimer = null;", "\t\t\tvar logEntries = [];", "\t\t\tvar logEntriesAndSeparators = [];", "\t\t\tvar logItems = [];", "\t\t\tvar renderDelay = 100;", "\t\t\tvar unrenderedLogItemsExist = false;", "\t\t\tvar rootGroup, currentGroup = null;", "\t\t\tvar loaded = false;", "\t\t\tvar currentLogItem = null;", "\t\t\tvar logMainContainer;", "", "\t\t\tfunction copyProperties(obj, props) {", "\t\t\t\tfor (var i in props) {", "\t\t\t\t\tobj[i] = props[i];", "\t\t\t\t}", "\t\t\t}", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogItem() {", "\t\t\t}", "", "\t\t\tLogItem.prototype = {", "\t\t\t\tmainContainer: null,", "\t\t\t\twrappedContainer: null,", "\t\t\t\tunwrappedContainer: null,", "\t\t\t\tgroup: null,", "", "\t\t\t\tappendToLog: function() {", "\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\tthis.elementContainers[i].appendToLog();", "\t\t\t\t\t}", "\t\t\t\t\tthis.group.update();", "\t\t\t\t},", "", "\t\t\t\tdoRemove: function(doUpdate, removeFromGroup) {", "\t\t\t\t\tif (this.rendered) {", "\t\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\t\tthis.elementContainers[i].remove();", "\t\t\t\t\t\t}", "\t\t\t\t\t\tthis.unwrappedElementContainer = null;", "\t\t\t\t\t\tthis.wrappedElementContainer = null;", "\t\t\t\t\t\tthis.mainElementContainer = null;", "\t\t\t\t\t}", "\t\t\t\t\tif (this.group && removeFromGroup) {", "\t\t\t\t\t\tthis.group.removeChild(this, doUpdate);", "\t\t\t\t\t}", "\t\t\t\t\tif (this === currentLogItem) {", "\t\t\t\t\t\tcurrentLogItem = null;", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tremove: function(doUpdate, removeFromGroup) {", "\t\t\t\t\tthis.doRemove(doUpdate, removeFromGroup);", "\t\t\t\t},", "", "\t\t\t\trender: function() {},", "", "\t\t\t\taccept: function(visitor) {", "\t\t\t\t\tvisitor.visit(this);", "\t\t\t\t},", "", "\t\t\t\tgetUnwrappedDomContainer: function() {", "\t\t\t\t\treturn this.group.unwrappedElementContainer.contentDiv;", "\t\t\t\t},", "", "\t\t\t\tgetWrappedDomContainer: function() {", "\t\t\t\t\treturn this.group.wrappedElementContainer.contentDiv;", "\t\t\t\t},", "", "\t\t\t\tgetMainDomContainer: function() {", "\t\t\t\t\treturn this.group.mainElementContainer.contentDiv;", "\t\t\t\t}", "\t\t\t};", "", "\t\t\tLogItem.serializedItemKeys = {LOG_ENTRY: 0, GROUP_START: 1, GROUP_END: 2};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogItemContainerElement() {", "\t\t\t}", "", "\t\t\tLogItemContainerElement.prototype = {", "\t\t\t\tappendToLog: function() {", "\t\t\t\t\tvar insertBeforeFirst = (newestAtTop && this.containerDomNode.hasChildNodes());", "\t\t\t\t\tif (insertBeforeFirst) {", "\t\t\t\t\t\tthis.containerDomNode.insertBefore(this.mainDiv, this.containerDomNode.firstChild);", "\t\t\t\t\t} else {", "\t\t\t\t\t\tthis.containerDomNode.appendChild(this.mainDiv);", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction SeparatorElementContainer(containerDomNode) {", "\t\t\t\tthis.containerDomNode = containerDomNode;", '\t\t\t\tthis.mainDiv = document.createElement("div");', '\t\t\t\tthis.mainDiv.className = "separator";', '\t\t\t\tthis.mainDiv.innerHTML = "&nbsp;";', "\t\t\t}", "", "\t\t\tSeparatorElementContainer.prototype = new LogItemContainerElement();", "", "\t\t\tSeparatorElementContainer.prototype.remove = function() {", "\t\t\t\tthis.mainDiv.parentNode.removeChild(this.mainDiv);", "\t\t\t\tthis.mainDiv = null;", "\t\t\t};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction Separator() {", "\t\t\t\tthis.rendered = false;", "\t\t\t}", "", "\t\t\tSeparator.prototype = new LogItem();", "", "\t\t\tcopyProperties(Separator.prototype, {", "\t\t\t\trender: function() {", "\t\t\t\t\tvar containerDomNode = this.group.contentDiv;", "\t\t\t\t\tif (isIe) {", "\t\t\t\t\t\tthis.unwrappedElementContainer = new SeparatorElementContainer(this.getUnwrappedDomContainer());", "\t\t\t\t\t\tthis.wrappedElementContainer = new SeparatorElementContainer(this.getWrappedDomContainer());", "\t\t\t\t\t\tthis.elementContainers = [this.unwrappedElementContainer, this.wrappedElementContainer];", "\t\t\t\t\t} else {", "\t\t\t\t\t\tthis.mainElementContainer = new SeparatorElementContainer(this.getMainDomContainer());", "\t\t\t\t\t\tthis.elementContainers = [this.mainElementContainer];", "\t\t\t\t\t}", "\t\t\t\t\tthis.content = this.formattedMessage;", "\t\t\t\t\tthis.rendered = true;", "\t\t\t\t}", "\t\t\t});", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction GroupElementContainer(group, containerDomNode, isRoot, isWrapped) {", "\t\t\t\tthis.group = group;", "\t\t\t\tthis.containerDomNode = containerDomNode;", "\t\t\t\tthis.isRoot = isRoot;", "\t\t\t\tthis.isWrapped = isWrapped;", "\t\t\t\tthis.expandable = false;", "", "\t\t\t\tif (this.isRoot) {", "\t\t\t\t\tif (isIe) {", '\t\t\t\t\t\tthis.contentDiv = logMainContainer.appendChild(document.createElement("div"));', '\t\t\t\t\t\tthis.contentDiv.id = this.isWrapped ? "log_wrapped" : "log_unwrapped";', "\t\t\t\t\t} else {", "\t\t\t\t\t\tthis.contentDiv = logMainContainer;", "\t\t\t\t\t}", "\t\t\t\t} else {", "\t\t\t\t\tvar groupElementContainer = this;", "\t\t\t\t\t", '\t\t\t\t\tthis.mainDiv = document.createElement("div");', '\t\t\t\t\tthis.mainDiv.className = "group";', "", '\t\t\t\t\tthis.headingDiv = this.mainDiv.appendChild(document.createElement("div"));', '\t\t\t\t\tthis.headingDiv.className = "groupheading";', "", '\t\t\t\t\tthis.expander = this.headingDiv.appendChild(document.createElement("span"));', '\t\t\t\t\tthis.expander.className = "expander unselectable greyedout";', "\t\t\t\t\tthis.expander.unselectable = true;", '\t\t\t\t\tvar expanderText = this.group.expanded ? "-" : "+";', "\t\t\t\t\tthis.expanderTextNode = this.expander.appendChild(document.createTextNode(expanderText));", "\t\t\t\t\t", '\t\t\t\t\tthis.headingDiv.appendChild(document.createTextNode(" " + this.group.name));', "", '\t\t\t\t\tthis.contentDiv = this.mainDiv.appendChild(document.createElement("div"));', '\t\t\t\t\tvar contentCssClass = this.group.expanded ? "expanded" : "collapsed";', '\t\t\t\t\tthis.contentDiv.className = "groupcontent " + contentCssClass;', "", "\t\t\t\t\tthis.expander.onclick = function() {", "\t\t\t\t\t\tif (groupElementContainer.group.expandable) {", "\t\t\t\t\t\t\tgroupElementContainer.group.toggleExpanded();", "\t\t\t\t\t\t}", "\t\t\t\t\t};", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tGroupElementContainer.prototype = new LogItemContainerElement();", "", "\t\t\tcopyProperties(GroupElementContainer.prototype, {", "\t\t\t\ttoggleExpanded: function() {", "\t\t\t\t\tif (!this.isRoot) {", "\t\t\t\t\t\tvar oldCssClass, newCssClass, expanderText;", "\t\t\t\t\t\tif (this.group.expanded) {", '\t\t\t\t\t\t\tnewCssClass = "expanded";', '\t\t\t\t\t\t\toldCssClass = "collapsed";', '\t\t\t\t\t\t\texpanderText = "-";', "\t\t\t\t\t\t} else {", '\t\t\t\t\t\t\tnewCssClass = "collapsed";', '\t\t\t\t\t\t\toldCssClass = "expanded";', '\t\t\t\t\t\t\texpanderText = "+";', "\t\t\t\t\t\t}", "\t\t\t\t\t\treplaceClass(this.contentDiv, newCssClass, oldCssClass);", "\t\t\t\t\t\tthis.expanderTextNode.nodeValue = expanderText;", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tremove: function() {", "\t\t\t\t\tif (!this.isRoot) {", "\t\t\t\t\t\tthis.headingDiv = null;", "\t\t\t\t\t\tthis.expander.onclick = null;", "\t\t\t\t\t\tthis.expander = null;", "\t\t\t\t\t\tthis.expanderTextNode = null;", "\t\t\t\t\t\tthis.contentDiv = null;", "\t\t\t\t\t\tthis.containerDomNode = null;", "\t\t\t\t\t\tthis.mainDiv.parentNode.removeChild(this.mainDiv);", "\t\t\t\t\t\tthis.mainDiv = null;", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\treverseChildren: function() {", "\t\t\t\t\t// Invert the order of the log entries", "\t\t\t\t\tvar node = null;", "", "\t\t\t\t\t// Remove all the log container nodes", "\t\t\t\t\tvar childDomNodes = [];", "\t\t\t\t\twhile ((node = this.contentDiv.firstChild)) {", "\t\t\t\t\t\tthis.contentDiv.removeChild(node);", "\t\t\t\t\t\tchildDomNodes.push(node);", "\t\t\t\t\t}", "", "\t\t\t\t\t// Put them all back in reverse order", "\t\t\t\t\twhile ((node = childDomNodes.pop())) {", "\t\t\t\t\t\tthis.contentDiv.appendChild(node);", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tupdate: function() {", "\t\t\t\t\tif (!this.isRoot) {", "\t\t\t\t\t\tif (this.group.expandable) {", '\t\t\t\t\t\t\tremoveClass(this.expander, "greyedout");', "\t\t\t\t\t\t} else {", '\t\t\t\t\t\t\taddClass(this.expander, "greyedout");', "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tclear: function() {", "\t\t\t\t\tif (this.isRoot) {", '\t\t\t\t\t\tthis.contentDiv.innerHTML = "";', "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t});", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction Group(name, isRoot, initiallyExpanded) {", "\t\t\t\tthis.name = name;", "\t\t\t\tthis.group = null;", "\t\t\t\tthis.isRoot = isRoot;", "\t\t\t\tthis.initiallyExpanded = initiallyExpanded;", "\t\t\t\tthis.elementContainers = [];", "\t\t\t\tthis.children = [];", "\t\t\t\tthis.expanded = initiallyExpanded;", "\t\t\t\tthis.rendered = false;", "\t\t\t\tthis.expandable = false;", "\t\t\t}", "", "\t\t\tGroup.prototype = new LogItem();", "", "\t\t\tcopyProperties(Group.prototype, {", "\t\t\t\taddChild: function(logItem) {", "\t\t\t\t\tthis.children.push(logItem);", "\t\t\t\t\tlogItem.group = this;", "\t\t\t\t},", "", "\t\t\t\trender: function() {", "\t\t\t\t\tif (isIe) {", "\t\t\t\t\t\tvar unwrappedDomContainer, wrappedDomContainer;", "\t\t\t\t\t\tif (this.isRoot) {", "\t\t\t\t\t\t\tunwrappedDomContainer = logMainContainer;", "\t\t\t\t\t\t\twrappedDomContainer = logMainContainer;", "\t\t\t\t\t\t} else {", "\t\t\t\t\t\t\tunwrappedDomContainer = this.getUnwrappedDomContainer();", "\t\t\t\t\t\t\twrappedDomContainer = this.getWrappedDomContainer();", "\t\t\t\t\t\t}", "\t\t\t\t\t\tthis.unwrappedElementContainer = new GroupElementContainer(this, unwrappedDomContainer, this.isRoot, false);", "\t\t\t\t\t\tthis.wrappedElementContainer = new GroupElementContainer(this, wrappedDomContainer, this.isRoot, true);", "\t\t\t\t\t\tthis.elementContainers = [this.unwrappedElementContainer, this.wrappedElementContainer];", "\t\t\t\t\t} else {", "\t\t\t\t\t\tvar mainDomContainer = this.isRoot ? logMainContainer : this.getMainDomContainer();", "\t\t\t\t\t\tthis.mainElementContainer = new GroupElementContainer(this, mainDomContainer, this.isRoot, false);", "\t\t\t\t\t\tthis.elementContainers = [this.mainElementContainer];", "\t\t\t\t\t}", "\t\t\t\t\tthis.rendered = true;", "\t\t\t\t},", "", "\t\t\t\ttoggleExpanded: function() {", "\t\t\t\t\tthis.expanded = !this.expanded;", "\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\tthis.elementContainers[i].toggleExpanded();", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\texpand: function() {", "\t\t\t\t\tif (!this.expanded) {", "\t\t\t\t\t\tthis.toggleExpanded();", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\taccept: function(visitor) {", "\t\t\t\t\tvisitor.visitGroup(this);", "\t\t\t\t},", "", "\t\t\t\treverseChildren: function() {", "\t\t\t\t\tif (this.rendered) {", "\t\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\t\tthis.elementContainers[i].reverseChildren();", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tupdate: function() {", "\t\t\t\t\tvar previouslyExpandable = this.expandable;", "\t\t\t\t\tthis.expandable = (this.children.length !== 0);", "\t\t\t\t\tif (this.expandable !== previouslyExpandable) {", "\t\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\t\tthis.elementContainers[i].update();", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tflatten: function() {", "\t\t\t\t\tvar visitor = new GroupFlattener();", "\t\t\t\t\tthis.accept(visitor);", "\t\t\t\t\treturn visitor.logEntriesAndSeparators;", "\t\t\t\t},", "", "\t\t\t\tremoveChild: function(child, doUpdate) {", "\t\t\t\t\tarray_remove(this.children, child);", "\t\t\t\t\tchild.group = null;", "\t\t\t\t\tif (doUpdate) {", "\t\t\t\t\t\tthis.update();", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tremove: function(doUpdate, removeFromGroup) {", "\t\t\t\t\tfor (var i = 0, len = this.children.length; i < len; i++) {", "\t\t\t\t\t\tthis.children[i].remove(false, false);", "\t\t\t\t\t}", "\t\t\t\t\tthis.children = [];", "\t\t\t\t\tthis.update();", "\t\t\t\t\tif (this === currentGroup) {", "\t\t\t\t\t\tcurrentGroup = this.group;", "\t\t\t\t\t}", "\t\t\t\t\tthis.doRemove(doUpdate, removeFromGroup);", "\t\t\t\t},", "", "\t\t\t\tserialize: function(items) {", "\t\t\t\t\titems.push([LogItem.serializedItemKeys.GROUP_START, this.name]);", "\t\t\t\t\tfor (var i = 0, len = this.children.length; i < len; i++) {", "\t\t\t\t\t\tthis.children[i].serialize(items);", "\t\t\t\t\t}", "\t\t\t\t\tif (this !== currentGroup) {", "\t\t\t\t\t\titems.push([LogItem.serializedItemKeys.GROUP_END]);", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tclear: function() {", "\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\tthis.elementContainers[i].clear();", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t});", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogEntryElementContainer() {", "\t\t\t}", "", "\t\t\tLogEntryElementContainer.prototype = new LogItemContainerElement();", "", "\t\t\tcopyProperties(LogEntryElementContainer.prototype, {", "\t\t\t\tremove: function() {", "\t\t\t\t\tthis.doRemove();", "\t\t\t\t},", "", "\t\t\t\tdoRemove: function() {", "\t\t\t\t\tthis.mainDiv.parentNode.removeChild(this.mainDiv);", "\t\t\t\t\tthis.mainDiv = null;", "\t\t\t\t\tthis.contentElement = null;", "\t\t\t\t\tthis.containerDomNode = null;", "\t\t\t\t},", "", "\t\t\t\tsetContent: function(content, wrappedContent) {", "\t\t\t\t\tif (content === this.formattedMessage) {", '\t\t\t\t\t\tthis.contentElement.innerHTML = "";', "\t\t\t\t\t\tthis.contentElement.appendChild(document.createTextNode(this.formattedMessage));", "\t\t\t\t\t} else {", "\t\t\t\t\t\tthis.contentElement.innerHTML = content;", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tsetSearchMatch: function(isMatch) {", '\t\t\t\t\tvar oldCssClass = isMatch ? "searchnonmatch" : "searchmatch";', '\t\t\t\t\tvar newCssClass = isMatch ? "searchmatch" : "searchnonmatch";', "\t\t\t\t\treplaceClass(this.mainDiv, newCssClass, oldCssClass);", "\t\t\t\t},", "", "\t\t\t\tclearSearch: function() {", '\t\t\t\t\tremoveClass(this.mainDiv, "searchmatch");', '\t\t\t\t\tremoveClass(this.mainDiv, "searchnonmatch");', "\t\t\t\t}", "\t\t\t});", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogEntryWrappedElementContainer(logEntry, containerDomNode) {", "\t\t\t\tthis.logEntry = logEntry;", "\t\t\t\tthis.containerDomNode = containerDomNode;", '\t\t\t\tthis.mainDiv = document.createElement("div");', "\t\t\t\tthis.mainDiv.appendChild(document.createTextNode(this.logEntry.formattedMessage));", '\t\t\t\tthis.mainDiv.className = "logentry wrapped " + this.logEntry.level;', "\t\t\t\tthis.contentElement = this.mainDiv;", "\t\t\t}", "", "\t\t\tLogEntryWrappedElementContainer.prototype = new LogEntryElementContainer();", "", "\t\t\tLogEntryWrappedElementContainer.prototype.setContent = function(content, wrappedContent) {", "\t\t\t\tif (content === this.formattedMessage) {", '\t\t\t\t\tthis.contentElement.innerHTML = "";', "\t\t\t\t\tthis.contentElement.appendChild(document.createTextNode(this.formattedMessage));", "\t\t\t\t} else {", "\t\t\t\t\tthis.contentElement.innerHTML = wrappedContent;", "\t\t\t\t}", "\t\t\t};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogEntryUnwrappedElementContainer(logEntry, containerDomNode) {", "\t\t\t\tthis.logEntry = logEntry;", "\t\t\t\tthis.containerDomNode = containerDomNode;", '\t\t\t\tthis.mainDiv = document.createElement("div");', '\t\t\t\tthis.mainDiv.className = "logentry unwrapped " + this.logEntry.level;', '\t\t\t\tthis.pre = this.mainDiv.appendChild(document.createElement("pre"));', "\t\t\t\tthis.pre.appendChild(document.createTextNode(this.logEntry.formattedMessage));", '\t\t\t\tthis.pre.className = "unwrapped";', "\t\t\t\tthis.contentElement = this.pre;", "\t\t\t}", "", "\t\t\tLogEntryUnwrappedElementContainer.prototype = new LogEntryElementContainer();", "", "\t\t\tLogEntryUnwrappedElementContainer.prototype.remove = function() {", "\t\t\t\tthis.doRemove();", "\t\t\t\tthis.pre = null;", "\t\t\t};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogEntryMainElementContainer(logEntry, containerDomNode) {", "\t\t\t\tthis.logEntry = logEntry;", "\t\t\t\tthis.containerDomNode = containerDomNode;", '\t\t\t\tthis.mainDiv = document.createElement("div");', '\t\t\t\tthis.mainDiv.className = "logentry nonielogentry " + this.logEntry.level;', '\t\t\t\tthis.contentElement = this.mainDiv.appendChild(document.createElement("span"));', "\t\t\t\tthis.contentElement.appendChild(document.createTextNode(this.logEntry.formattedMessage));", "\t\t\t}", "", "\t\t\tLogEntryMainElementContainer.prototype = new LogEntryElementContainer();", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogEntry(level, formattedMessage) {", "\t\t\t\tthis.level = level;", "\t\t\t\tthis.formattedMessage = formattedMessage;", "\t\t\t\tthis.rendered = false;", "\t\t\t}", "", "\t\t\tLogEntry.prototype = new LogItem();", "", "\t\t\tcopyProperties(LogEntry.prototype, {", "\t\t\t\trender: function() {", "\t\t\t\t\tvar logEntry = this;", "\t\t\t\t\tvar containerDomNode = this.group.contentDiv;", "", "\t\t\t\t\t// Support for the CSS attribute white-space in IE for Windows is", "\t\t\t\t\t// non-existent pre version 6 and slightly odd in 6, so instead", "\t\t\t\t\t// use two different HTML elements", "\t\t\t\t\tif (isIe) {", '\t\t\t\t\t\tthis.formattedMessage = this.formattedMessage.replace(/\\r\\n/g, "\\r"); // Workaround for IE\'s treatment of white space', "\t\t\t\t\t\tthis.unwrappedElementContainer = new LogEntryUnwrappedElementContainer(this, this.getUnwrappedDomContainer());", "\t\t\t\t\t\tthis.wrappedElementContainer = new LogEntryWrappedElementContainer(this, this.getWrappedDomContainer());", "\t\t\t\t\t\tthis.elementContainers = [this.unwrappedElementContainer, this.wrappedElementContainer];", "\t\t\t\t\t} else {", "\t\t\t\t\t\tthis.mainElementContainer = new LogEntryMainElementContainer(this, this.getMainDomContainer());", "\t\t\t\t\t\tthis.elementContainers = [this.mainElementContainer];", "\t\t\t\t\t}", "\t\t\t\t\tthis.content = this.formattedMessage;", "\t\t\t\t\tthis.rendered = true;", "\t\t\t\t},", "", "\t\t\t\tsetContent: function(content, wrappedContent) {", "\t\t\t\t\tif (content != this.content) {", "\t\t\t\t\t\tif (isIe && (content !== this.formattedMessage)) {", '\t\t\t\t\t\t\tcontent = content.replace(/\\r\\n/g, "\\r"); // Workaround for IE\'s treatment of white space', "\t\t\t\t\t\t}", "\t\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\t\tthis.elementContainers[i].setContent(content, wrappedContent);", "\t\t\t\t\t\t}", "\t\t\t\t\t\tthis.content = content;", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tgetSearchMatches: function() {", "\t\t\t\t\tvar matches = [];", "\t\t\t\t\tvar i, len;", "\t\t\t\t\tif (isIe) {", '\t\t\t\t\t\tvar unwrappedEls = getElementsByClass(this.unwrappedElementContainer.mainDiv, "searchterm", "span");', '\t\t\t\t\t\tvar wrappedEls = getElementsByClass(this.wrappedElementContainer.mainDiv, "searchterm", "span");', "\t\t\t\t\t\tfor (i = 0, len = unwrappedEls.length; i < len; i++) {", "\t\t\t\t\t\t\tmatches[i] = new Match(this.level, null, unwrappedEls[i], wrappedEls[i]);", "\t\t\t\t\t\t}", "\t\t\t\t\t} else {", '\t\t\t\t\t\tvar els = getElementsByClass(this.mainElementContainer.mainDiv, "searchterm", "span");', "\t\t\t\t\t\tfor (i = 0, len = els.length; i < len; i++) {", "\t\t\t\t\t\t\tmatches[i] = new Match(this.level, els[i]);", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t\treturn matches;", "\t\t\t\t},", "", "\t\t\t\tsetSearchMatch: function(isMatch) {", "\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\tthis.elementContainers[i].setSearchMatch(isMatch);", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tclearSearch: function() {", "\t\t\t\t\tfor (var i = 0, len = this.elementContainers.length; i < len; i++) {", "\t\t\t\t\t\tthis.elementContainers[i].clearSearch();", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\taccept: function(visitor) {", "\t\t\t\t\tvisitor.visitLogEntry(this);", "\t\t\t\t},", "", "\t\t\t\tserialize: function(items) {", "\t\t\t\t\titems.push([LogItem.serializedItemKeys.LOG_ENTRY, this.level, this.formattedMessage]);", "\t\t\t\t}", "\t\t\t});", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogItemVisitor() {", "\t\t\t}", "", "\t\t\tLogItemVisitor.prototype = {", "\t\t\t\tvisit: function(logItem) {", "\t\t\t\t},", "", "\t\t\t\tvisitParent: function(logItem) {", "\t\t\t\t\tif (logItem.group) {", "\t\t\t\t\t\tlogItem.group.accept(this);", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tvisitChildren: function(logItem) {", "\t\t\t\t\tfor (var i = 0, len = logItem.children.length; i < len; i++) {", "\t\t\t\t\t\tlogItem.children[i].accept(this);", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tvisitLogEntry: function(logEntry) {", "\t\t\t\t\tthis.visit(logEntry);", "\t\t\t\t},", "", "\t\t\t\tvisitSeparator: function(separator) {", "\t\t\t\t\tthis.visit(separator);", "\t\t\t\t},", "", "\t\t\t\tvisitGroup: function(group) {", "\t\t\t\t\tthis.visit(group);", "\t\t\t\t}", "\t\t\t};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction GroupFlattener() {", "\t\t\t\tthis.logEntriesAndSeparators = [];", "\t\t\t}", "", "\t\t\tGroupFlattener.prototype = new LogItemVisitor();", "", "\t\t\tGroupFlattener.prototype.visitGroup = function(group) {", "\t\t\t\tthis.visitChildren(group);", "\t\t\t};", "", "\t\t\tGroupFlattener.prototype.visitLogEntry = function(logEntry) {", "\t\t\t\tthis.logEntriesAndSeparators.push(logEntry);", "\t\t\t};", "", "\t\t\tGroupFlattener.prototype.visitSeparator = function(separator) {", "\t\t\t\tthis.logEntriesAndSeparators.push(separator);", "\t\t\t};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\twindow.onload = function() {", "\t\t\t\t// Sort out document.domain", "\t\t\t\tif (location.search) {", '\t\t\t\t\tvar queryBits = unescape(location.search).substr(1).split("&"), nameValueBits;', "\t\t\t\t\tfor (var i = 0, len = queryBits.length; i < len; i++) {", '\t\t\t\t\t\tnameValueBits = queryBits[i].split("=");', '\t\t\t\t\t\tif (nameValueBits[0] == "log4javascript_domain") {', "\t\t\t\t\t\t\tdocument.domain = nameValueBits[1];", "\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t}", "", "\t\t\t\t// Create DOM objects", '\t\t\t\tlogMainContainer = $("log");', "\t\t\t\tif (isIePre7) {", '\t\t\t\t\taddClass(logMainContainer, "oldIe");', "\t\t\t\t}", "", '\t\t\t\trootGroup = new Group("root", true);', "\t\t\t\trootGroup.render();", "\t\t\t\tcurrentGroup = rootGroup;", "\t\t\t\t", "\t\t\t\tsetCommandInputWidth();", "\t\t\t\tsetLogContainerHeight();", "\t\t\t\ttoggleLoggingEnabled();", "\t\t\t\ttoggleSearchEnabled();", "\t\t\t\ttoggleSearchFilter();", "\t\t\t\ttoggleSearchHighlight();", "\t\t\t\tapplyFilters();", "\t\t\t\tcheckAllLevels();", "\t\t\t\ttoggleWrap();", "\t\t\t\ttoggleNewestAtTop();", "\t\t\t\ttoggleScrollToLatest();", "\t\t\t\trenderQueuedLogItems();", "\t\t\t\tloaded = true;", '\t\t\t\t$("command").value = "";', '\t\t\t\t$("command").autocomplete = "off";', '\t\t\t\t$("command").onkeydown = function(evt) {', "\t\t\t\t\tevt = getEvent(evt);", "\t\t\t\t\tif (evt.keyCode == 10 || evt.keyCode == 13) { // Return/Enter", "\t\t\t\t\t\tevalCommandLine();", "\t\t\t\t\t\tstopPropagation(evt);", "\t\t\t\t\t} else if (evt.keyCode == 27) { // Escape", '\t\t\t\t\t\tthis.value = "";', "\t\t\t\t\t\tthis.focus();", "\t\t\t\t\t} else if (evt.keyCode == 38 && commandHistory.length > 0) { // Up", "\t\t\t\t\t\tcurrentCommandIndex = Math.max(0, currentCommandIndex - 1);", "\t\t\t\t\t\tthis.value = commandHistory[currentCommandIndex];", "\t\t\t\t\t\tmoveCaretToEnd(this);", "\t\t\t\t\t} else if (evt.keyCode == 40 && commandHistory.length > 0) { // Down", "\t\t\t\t\t\tcurrentCommandIndex = Math.min(commandHistory.length - 1, currentCommandIndex + 1);", "\t\t\t\t\t\tthis.value = commandHistory[currentCommandIndex];", "\t\t\t\t\t\tmoveCaretToEnd(this);", "\t\t\t\t\t}", "\t\t\t\t};", "", "\t\t\t\t// Prevent the keypress moving the caret in Firefox", '\t\t\t\t$("command").onkeypress = function(evt) {', "\t\t\t\t\tevt = getEvent(evt);", "\t\t\t\t\tif (evt.keyCode == 38 && commandHistory.length > 0 && evt.preventDefault) { // Up", "\t\t\t\t\t\tevt.preventDefault();", "\t\t\t\t\t}", "\t\t\t\t};", "", "\t\t\t\t// Prevent the keyup event blurring the input in Opera", '\t\t\t\t$("command").onkeyup = function(evt) {', "\t\t\t\t\tevt = getEvent(evt);", "\t\t\t\t\tif (evt.keyCode == 27 && evt.preventDefault) { // Up", "\t\t\t\t\t\tevt.preventDefault();", "\t\t\t\t\t\tthis.focus();", "\t\t\t\t\t}", "\t\t\t\t};", "", "\t\t\t\t// Add document keyboard shortcuts", "\t\t\t\tdocument.onkeydown = function keyEventHandler(evt) {", "\t\t\t\t\tevt = getEvent(evt);", "\t\t\t\t\tswitch (evt.keyCode) {", "\t\t\t\t\t\tcase 69: // Ctrl + shift + E: re-execute last command", "\t\t\t\t\t\t\tif (evt.shiftKey && (evt.ctrlKey || evt.metaKey)) {", "\t\t\t\t\t\t\t\tevalLastCommand();", "\t\t\t\t\t\t\t\tcancelKeyEvent(evt);", "\t\t\t\t\t\t\t\treturn false;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t\tcase 75: // Ctrl + shift + K: focus search", "\t\t\t\t\t\t\tif (evt.shiftKey && (evt.ctrlKey || evt.metaKey)) {", "\t\t\t\t\t\t\t\tfocusSearch();", "\t\t\t\t\t\t\t\tcancelKeyEvent(evt);", "\t\t\t\t\t\t\t\treturn false;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t\tcase 40: // Ctrl + shift + down arrow: focus command line", "\t\t\t\t\t\tcase 76: // Ctrl + shift + L: focus command line", "\t\t\t\t\t\t\tif (evt.shiftKey && (evt.ctrlKey || evt.metaKey)) {", "\t\t\t\t\t\t\t\tfocusCommandLine();", "\t\t\t\t\t\t\t\tcancelKeyEvent(evt);", "\t\t\t\t\t\t\t\treturn false;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t}", "\t\t\t\t};", "", "\t\t\t\t// Workaround to make sure log div starts at the correct size", "\t\t\t\tsetTimeout(setLogContainerHeight, 20);", "", "\t\t\t\tsetShowCommandLine(showCommandLine);", "\t\t\t\tdoSearch();", "\t\t\t};", "", "\t\t\twindow.onunload = function() {", "\t\t\t\tif (mainWindowExists()) {", "\t\t\t\t\tappender.unload();", "\t\t\t\t}", "\t\t\t\tappender = null;", "\t\t\t};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction toggleLoggingEnabled() {", '\t\t\t\tsetLoggingEnabled($("enableLogging").checked);', "\t\t\t}", "", "\t\t\tfunction setLoggingEnabled(enable) {", "\t\t\t\tloggingEnabled = enable;", "\t\t\t}", "", "\t\t\tvar appender = null;", "", "\t\t\tfunction setAppender(appenderParam) {", "\t\t\t\tappender = appenderParam;", "\t\t\t}", "", "\t\t\tfunction setShowCloseButton(showCloseButton) {", '\t\t\t\t$("closeButton").style.display = showCloseButton ? "inline" : "none";', "\t\t\t}", "", "\t\t\tfunction setShowHideButton(showHideButton) {", '\t\t\t\t$("hideButton").style.display = showHideButton ? "inline" : "none";', "\t\t\t}", "", "\t\t\tvar newestAtTop = false;", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction LogItemContentReverser() {", "\t\t\t}", "\t\t\t", "\t\t\tLogItemContentReverser.prototype = new LogItemVisitor();", "\t\t\t", "\t\t\tLogItemContentReverser.prototype.visitGroup = function(group) {", "\t\t\t\tgroup.reverseChildren();", "\t\t\t\tthis.visitChildren(group);", "\t\t\t};", "", "\t\t\t/*----------------------------------------------------------------*/", "", "\t\t\tfunction setNewestAtTop(isNewestAtTop) {", "\t\t\t\tvar oldNewestAtTop = newestAtTop;", "\t\t\t\tvar i, iLen, j, jLen;", "\t\t\t\tnewestAtTop = Boolean(isNewestAtTop);", "\t\t\t\tif (oldNewestAtTop != newestAtTop) {", "\t\t\t\t\tvar visitor = new LogItemContentReverser();", "\t\t\t\t\trootGroup.accept(visitor);", "", "\t\t\t\t\t// Reassemble the matches array", "\t\t\t\t\tif (currentSearch) {", "\t\t\t\t\t\tvar currentMatch = currentSearch.matches[currentMatchIndex];", "\t\t\t\t\t\tvar matchIndex = 0;", "\t\t\t\t\t\tvar matches = [];", "\t\t\t\t\t\tvar actOnLogEntry = function(logEntry) {", "\t\t\t\t\t\t\tvar logEntryMatches = logEntry.getSearchMatches();", "\t\t\t\t\t\t\tfor (j = 0, jLen = logEntryMatches.length; j < jLen; j++) {", "\t\t\t\t\t\t\t\tmatches[matchIndex] = logEntryMatches[j];", "\t\t\t\t\t\t\t\tif (currentMatch && logEntryMatches[j].equals(currentMatch)) {", "\t\t\t\t\t\t\t\t\tcurrentMatchIndex = matchIndex;", "\t\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\t\tmatchIndex++;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t};", "\t\t\t\t\t\tif (newestAtTop) {", "\t\t\t\t\t\t\tfor (i = logEntries.length - 1; i >= 0; i--) {", "\t\t\t\t\t\t\t\tactOnLogEntry(logEntries[i]);", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t} else {", "\t\t\t\t\t\t\tfor (i = 0, iLen = logEntries.length; i < iLen; i++) {", "\t\t\t\t\t\t\t\tactOnLogEntry(logEntries[i]);", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t}", "\t\t\t\t\t\tcurrentSearch.matches = matches;", "\t\t\t\t\t\tif (currentMatch) {", "\t\t\t\t\t\t\tcurrentMatch.setCurrent();", "\t\t\t\t\t\t}", "\t\t\t\t\t} else if (scrollToLatest) {", "\t\t\t\t\t\tdoScrollToLatest();", "\t\t\t\t\t}", "\t\t\t\t}", '\t\t\t\t$("newestAtTop").checked = isNewestAtTop;', "\t\t\t}", "", "\t\t\tfunction toggleNewestAtTop() {", '\t\t\t\tvar isNewestAtTop = $("newestAtTop").checked;', "\t\t\t\tsetNewestAtTop(isNewestAtTop);", "\t\t\t}", "", "\t\t\tvar scrollToLatest = true;", "", "\t\t\tfunction setScrollToLatest(isScrollToLatest) {", "\t\t\t\tscrollToLatest = isScrollToLatest;", "\t\t\t\tif (scrollToLatest) {", "\t\t\t\t\tdoScrollToLatest();", "\t\t\t\t}", '\t\t\t\t$("scrollToLatest").checked = isScrollToLatest;', "\t\t\t}", "", "\t\t\tfunction toggleScrollToLatest() {", '\t\t\t\tvar isScrollToLatest = $("scrollToLatest").checked;', "\t\t\t\tsetScrollToLatest(isScrollToLatest);", "\t\t\t}", "", "\t\t\tfunction doScrollToLatest() {", "\t\t\t\tvar l = logMainContainer;", '\t\t\t\tif (typeof l.scrollTop != "undefined") {', "\t\t\t\t\tif (newestAtTop) {", "\t\t\t\t\t\tl.scrollTop = 0;", "\t\t\t\t\t} else {", "\t\t\t\t\t\tvar latestLogEntry = l.lastChild;", "\t\t\t\t\t\tif (latestLogEntry) {", "\t\t\t\t\t\t\tl.scrollTop = l.scrollHeight;", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tvar closeIfOpenerCloses = true;", "", "\t\t\tfunction setCloseIfOpenerCloses(isCloseIfOpenerCloses) {", "\t\t\t\tcloseIfOpenerCloses = isCloseIfOpenerCloses;", "\t\t\t}", "", "\t\t\tvar maxMessages = null;", "", "\t\t\tfunction setMaxMessages(max) {", "\t\t\t\tmaxMessages = max;", "\t\t\t\tpruneLogEntries();", "\t\t\t}", "", "\t\t\tvar showCommandLine = false;", "", "\t\t\tfunction setShowCommandLine(isShowCommandLine) {", "\t\t\t\tshowCommandLine = isShowCommandLine;", "\t\t\t\tif (loaded) {", '\t\t\t\t\t$("commandLine").style.display = showCommandLine ? "block" : "none";', "\t\t\t\t\tsetCommandInputWidth();", "\t\t\t\t\tsetLogContainerHeight();", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction focusCommandLine() {", "\t\t\t\tif (loaded) {", '\t\t\t\t\t$("command").focus();', "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction focusSearch() {", "\t\t\t\tif (loaded) {", '\t\t\t\t\t$("searchBox").focus();', "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction getLogItems() {", "\t\t\t\tvar items = [];", "\t\t\t\tfor (var i = 0, len = logItems.length; i < len; i++) {", "\t\t\t\t\tlogItems[i].serialize(items);", "\t\t\t\t}", "\t\t\t\treturn items;", "\t\t\t}", "", "\t\t\tfunction setLogItems(items) {", "\t\t\t\tvar loggingReallyEnabled = loggingEnabled;", "\t\t\t\t// Temporarily turn logging on", "\t\t\t\tloggingEnabled = true;", "\t\t\t\tfor (var i = 0, len = items.length; i < len; i++) {", "\t\t\t\t\tswitch (items[i][0]) {", "\t\t\t\t\t\tcase LogItem.serializedItemKeys.LOG_ENTRY:", "\t\t\t\t\t\t\tlog(items[i][1], items[i][2]);", "\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t\tcase LogItem.serializedItemKeys.GROUP_START:", "\t\t\t\t\t\t\tgroup(items[i][1]);", "\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t\tcase LogItem.serializedItemKeys.GROUP_END:", "\t\t\t\t\t\t\tgroupEnd();", "\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\tloggingEnabled = loggingReallyEnabled;", "\t\t\t}", "", "\t\t\tfunction log(logLevel, formattedMessage) {", "\t\t\t\tif (loggingEnabled) {", "\t\t\t\t\tvar logEntry = new LogEntry(logLevel, formattedMessage);", "\t\t\t\t\tlogEntries.push(logEntry);", "\t\t\t\t\tlogEntriesAndSeparators.push(logEntry);", "\t\t\t\t\tlogItems.push(logEntry);", "\t\t\t\t\tcurrentGroup.addChild(logEntry);", "\t\t\t\t\tif (loaded) {", "\t\t\t\t\t\tif (logQueuedEventsTimer !== null) {", "\t\t\t\t\t\t\tclearTimeout(logQueuedEventsTimer);", "\t\t\t\t\t\t}", "\t\t\t\t\t\tlogQueuedEventsTimer = setTimeout(renderQueuedLogItems, renderDelay);", "\t\t\t\t\t\tunrenderedLogItemsExist = true;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction renderQueuedLogItems() {", "\t\t\t\tlogQueuedEventsTimer = null;", "\t\t\t\tvar pruned = pruneLogEntries();", "", "\t\t\t\t// Render any unrendered log entries and apply the current search to them", "\t\t\t\tvar initiallyHasMatches = currentSearch ? currentSearch.hasMatches() : false;", "\t\t\t\tfor (var i = 0, len = logItems.length; i < len; i++) {", "\t\t\t\t\tif (!logItems[i].rendered) {", "\t\t\t\t\t\tlogItems[i].render();", "\t\t\t\t\t\tlogItems[i].appendToLog();", "\t\t\t\t\t\tif (currentSearch && (logItems[i] instanceof LogEntry)) {", "\t\t\t\t\t\t\tcurrentSearch.applyTo(logItems[i]);", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\tif (currentSearch) {", "\t\t\t\t\tif (pruned) {", "\t\t\t\t\t\tif (currentSearch.hasVisibleMatches()) {", "\t\t\t\t\t\t\tif (currentMatchIndex === null) {", "\t\t\t\t\t\t\t\tsetCurrentMatchIndex(0);", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\tdisplayMatches();", "\t\t\t\t\t\t} else {", "\t\t\t\t\t\t\tdisplayNoMatches();", "\t\t\t\t\t\t}", "\t\t\t\t\t} else if (!initiallyHasMatches && currentSearch.hasVisibleMatches()) {", "\t\t\t\t\t\tsetCurrentMatchIndex(0);", "\t\t\t\t\t\tdisplayMatches();", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\tif (scrollToLatest) {", "\t\t\t\t\tdoScrollToLatest();", "\t\t\t\t}", "\t\t\t\tunrenderedLogItemsExist = false;", "\t\t\t}", "", "\t\t\tfunction pruneLogEntries() {", "\t\t\t\tif ((maxMessages !== null) && (logEntriesAndSeparators.length > maxMessages)) {", "\t\t\t\t\tvar numberToDelete = logEntriesAndSeparators.length - maxMessages;", "\t\t\t\t\tvar prunedLogEntries = logEntriesAndSeparators.slice(0, numberToDelete);", "\t\t\t\t\tif (currentSearch) {", "\t\t\t\t\t\tcurrentSearch.removeMatches(prunedLogEntries);", "\t\t\t\t\t}", "\t\t\t\t\tvar group;", "\t\t\t\t\tfor (var i = 0; i < numberToDelete; i++) {", "\t\t\t\t\t\tgroup = logEntriesAndSeparators[i].group;", "\t\t\t\t\t\tarray_remove(logItems, logEntriesAndSeparators[i]);", "\t\t\t\t\t\tarray_remove(logEntries, logEntriesAndSeparators[i]);", "\t\t\t\t\t\tlogEntriesAndSeparators[i].remove(true, true);", "\t\t\t\t\t\tif (group.children.length === 0 && group !== currentGroup && group !== rootGroup) {", "\t\t\t\t\t\t\tarray_remove(logItems, group);", "\t\t\t\t\t\t\tgroup.remove(true, true);", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t\tlogEntriesAndSeparators = array_removeFromStart(logEntriesAndSeparators, numberToDelete);", "\t\t\t\t\treturn true;", "\t\t\t\t}", "\t\t\t\treturn false;", "\t\t\t}", "", "\t\t\tfunction group(name, startExpanded) {", "\t\t\t\tif (loggingEnabled) {", '\t\t\t\t\tinitiallyExpanded = (typeof startExpanded === "undefined") ? true : Boolean(startExpanded);', "\t\t\t\t\tvar newGroup = new Group(name, false, initiallyExpanded);", "\t\t\t\t\tcurrentGroup.addChild(newGroup);", "\t\t\t\t\tcurrentGroup = newGroup;", "\t\t\t\t\tlogItems.push(newGroup);", "\t\t\t\t\tif (loaded) {", "\t\t\t\t\t\tif (logQueuedEventsTimer !== null) {", "\t\t\t\t\t\t\tclearTimeout(logQueuedEventsTimer);", "\t\t\t\t\t\t}", "\t\t\t\t\t\tlogQueuedEventsTimer = setTimeout(renderQueuedLogItems, renderDelay);", "\t\t\t\t\t\tunrenderedLogItemsExist = true;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction groupEnd() {", "\t\t\t\tcurrentGroup = (currentGroup === rootGroup) ? rootGroup : currentGroup.group;", "\t\t\t}", "", "\t\t\tfunction mainPageReloaded() {", "\t\t\t\tcurrentGroup = rootGroup;", "\t\t\t\tvar separator = new Separator();", "\t\t\t\tlogEntriesAndSeparators.push(separator);", "\t\t\t\tlogItems.push(separator);", "\t\t\t\tcurrentGroup.addChild(separator);", "\t\t\t}", "", "\t\t\tfunction closeWindow() {", "\t\t\t\tif (appender && mainWindowExists()) {", "\t\t\t\t\tappender.close(true);", "\t\t\t\t} else {", "\t\t\t\t\twindow.close();", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction hide() {", "\t\t\t\tif (appender && mainWindowExists()) {", "\t\t\t\t\tappender.hide();", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tvar mainWindow = window;", '\t\t\tvar windowId = "log4javascriptConsoleWindow_" + new Date().getTime() + "_" + ("" + Math.random()).substr(2);', "", "\t\t\tfunction setMainWindow(win) {", "\t\t\t\tmainWindow = win;", "\t\t\t\tmainWindow[windowId] = window;", "\t\t\t\t// If this is a pop-up, poll the opener to see if it's closed", "\t\t\t\tif (opener && closeIfOpenerCloses) {", "\t\t\t\t\tpollOpener();", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction pollOpener() {", "\t\t\t\tif (closeIfOpenerCloses) {", "\t\t\t\t\tif (mainWindowExists()) {", "\t\t\t\t\t\tsetTimeout(pollOpener, 500);", "\t\t\t\t\t} else {", "\t\t\t\t\t\tcloseWindow();", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction mainWindowExists() {", "\t\t\t\ttry {", "\t\t\t\t\treturn (mainWindow && !mainWindow.closed &&", "\t\t\t\t\t\tmainWindow[windowId] == window);", "\t\t\t\t} catch (ex) {}", "\t\t\t\treturn false;", "\t\t\t}", "", '\t\t\tvar logLevels = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"];', "", "\t\t\tfunction getCheckBox(logLevel) {", '\t\t\t\treturn $("switch_" + logLevel);', "\t\t\t}", "", "\t\t\tfunction getIeWrappedLogContainer() {", '\t\t\t\treturn $("log_wrapped");', "\t\t\t}", "", "\t\t\tfunction getIeUnwrappedLogContainer() {", '\t\t\t\treturn $("log_unwrapped");', "\t\t\t}", "", "\t\t\tfunction applyFilters() {", "\t\t\t\tfor (var i = 0; i < logLevels.length; i++) {", "\t\t\t\t\tif (getCheckBox(logLevels[i]).checked) {", "\t\t\t\t\t\taddClass(logMainContainer, logLevels[i]);", "\t\t\t\t\t} else {", "\t\t\t\t\t\tremoveClass(logMainContainer, logLevels[i]);", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\tupdateSearchFromFilters();", "\t\t\t}", "", "\t\t\tfunction toggleAllLevels() {", '\t\t\t\tvar turnOn = $("switch_ALL").checked;', "\t\t\t\tfor (var i = 0; i < logLevels.length; i++) {", "\t\t\t\t\tgetCheckBox(logLevels[i]).checked = turnOn;", "\t\t\t\t\tif (turnOn) {", "\t\t\t\t\t\taddClass(logMainContainer, logLevels[i]);", "\t\t\t\t\t} else {", "\t\t\t\t\t\tremoveClass(logMainContainer, logLevels[i]);", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction checkAllLevels() {", "\t\t\t\tfor (var i = 0; i < logLevels.length; i++) {", "\t\t\t\t\tif (!getCheckBox(logLevels[i]).checked) {", '\t\t\t\t\t\tgetCheckBox("ALL").checked = false;', "\t\t\t\t\t\treturn;", "\t\t\t\t\t}", "\t\t\t\t}", '\t\t\t\tgetCheckBox("ALL").checked = true;', "\t\t\t}", "", "\t\t\tfunction clearLog() {", "\t\t\t\trootGroup.clear();", "\t\t\t\tcurrentGroup = rootGroup;", "\t\t\t\tlogEntries = [];", "\t\t\t\tlogItems = [];", "\t\t\t\tlogEntriesAndSeparators = [];", " \t\t\t\tdoSearch();", "\t\t\t}", "", "\t\t\tfunction toggleWrap() {", '\t\t\t\tvar enable = $("wrap").checked;', "\t\t\t\tif (enable) {", '\t\t\t\t\taddClass(logMainContainer, "wrap");', "\t\t\t\t} else {", '\t\t\t\t\tremoveClass(logMainContainer, "wrap");', "\t\t\t\t}", "\t\t\t\trefreshCurrentMatch();", "\t\t\t}", "", "\t\t\t/* ------------------------------------------------------------------- */", "", "\t\t\t// Search", "", "\t\t\tvar searchTimer = null;", "", "\t\t\tfunction scheduleSearch() {", "\t\t\t\ttry {", "\t\t\t\t\tclearTimeout(searchTimer);", "\t\t\t\t} catch (ex) {", "\t\t\t\t\t// Do nothing", "\t\t\t\t}", "\t\t\t\tsearchTimer = setTimeout(doSearch, 500);", "\t\t\t}", "", "\t\t\tfunction Search(searchTerm, isRegex, searchRegex, isCaseSensitive) {", "\t\t\t\tthis.searchTerm = searchTerm;", "\t\t\t\tthis.isRegex = isRegex;", "\t\t\t\tthis.searchRegex = searchRegex;", "\t\t\t\tthis.isCaseSensitive = isCaseSensitive;", "\t\t\t\tthis.matches = [];", "\t\t\t}", "", "\t\t\tSearch.prototype = {", "\t\t\t\thasMatches: function() {", "\t\t\t\t\treturn this.matches.length > 0;", "\t\t\t\t},", "", "\t\t\t\thasVisibleMatches: function() {", "\t\t\t\t\tif (this.hasMatches()) {", "\t\t\t\t\t\tfor (var i = 0; i < this.matches.length; i++) {", "\t\t\t\t\t\t\tif (this.matches[i].isVisible()) {", "\t\t\t\t\t\t\t\treturn true;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t\treturn false;", "\t\t\t\t},", "", "\t\t\t\tmatch: function(logEntry) {", "\t\t\t\t\tvar entryText = String(logEntry.formattedMessage);", "\t\t\t\t\tvar matchesSearch = false;", "\t\t\t\t\tif (this.isRegex) {", "\t\t\t\t\t\tmatchesSearch = this.searchRegex.test(entryText);", "\t\t\t\t\t} else if (this.isCaseSensitive) {", "\t\t\t\t\t\tmatchesSearch = (entryText.indexOf(this.searchTerm) > -1);", "\t\t\t\t\t} else {", "\t\t\t\t\t\tmatchesSearch = (entryText.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);", "\t\t\t\t\t}", "\t\t\t\t\treturn matchesSearch;", "\t\t\t\t},", "", "\t\t\t\tgetNextVisibleMatchIndex: function() {", "\t\t\t\t\tfor (var i = currentMatchIndex + 1; i < this.matches.length; i++) {", "\t\t\t\t\t\tif (this.matches[i].isVisible()) {", "\t\t\t\t\t\t\treturn i;", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t\t// Start again from the first match", "\t\t\t\t\tfor (i = 0; i <= currentMatchIndex; i++) {", "\t\t\t\t\t\tif (this.matches[i].isVisible()) {", "\t\t\t\t\t\t\treturn i;", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t\treturn -1;", "\t\t\t\t},", "", "\t\t\t\tgetPreviousVisibleMatchIndex: function() {", "\t\t\t\t\tfor (var i = currentMatchIndex - 1; i >= 0; i--) {", "\t\t\t\t\t\tif (this.matches[i].isVisible()) {", "\t\t\t\t\t\t\treturn i;", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t\t// Start again from the last match", "\t\t\t\t\tfor (var i = this.matches.length - 1; i >= currentMatchIndex; i--) {", "\t\t\t\t\t\tif (this.matches[i].isVisible()) {", "\t\t\t\t\t\t\treturn i;", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "\t\t\t\t\treturn -1;", "\t\t\t\t},", "", "\t\t\t\tapplyTo: function(logEntry) {", "\t\t\t\t\tvar doesMatch = this.match(logEntry);", "\t\t\t\t\tif (doesMatch) {", "\t\t\t\t\t\tlogEntry.group.expand();", "\t\t\t\t\t\tlogEntry.setSearchMatch(true);", "\t\t\t\t\t\tvar logEntryContent;", "\t\t\t\t\t\tvar wrappedLogEntryContent;", '\t\t\t\t\t\tvar searchTermReplacementStartTag = "<span class=\\"searchterm\\">";', '\t\t\t\t\t\tvar searchTermReplacementEndTag = "<" + "/span>";', '\t\t\t\t\t\tvar preTagName = isIe ? "pre" : "span";', '\t\t\t\t\t\tvar preStartTag = "<" + preTagName + " class=\\"pre\\">";', '\t\t\t\t\t\tvar preEndTag = "<" + "/" + preTagName + ">";', "\t\t\t\t\t\tvar startIndex = 0;", "\t\t\t\t\t\tvar searchIndex, matchedText, textBeforeMatch;", "\t\t\t\t\t\tif (this.isRegex) {", '\t\t\t\t\t\t\tvar flags = this.isCaseSensitive ? "g" : "gi";', '\t\t\t\t\t\t\tvar capturingRegex = new RegExp("(" + this.searchRegex.source + ")", flags);', "", "\t\t\t\t\t\t\t// Replace the search term with temporary tokens for the start and end tags", '\t\t\t\t\t\t\tvar rnd = ("" + Math.random()).substr(2);', '\t\t\t\t\t\t\tvar startToken = "%%s" + rnd + "%%";', '\t\t\t\t\t\t\tvar endToken = "%%e" + rnd + "%%";', '\t\t\t\t\t\t\tlogEntryContent = logEntry.formattedMessage.replace(capturingRegex, startToken + "$1" + endToken);', "", "\t\t\t\t\t\t\t// Escape the HTML to get rid of angle brackets", "\t\t\t\t\t\t\tlogEntryContent = escapeHtml(logEntryContent);", "", "\t\t\t\t\t\t\t// Substitute the proper HTML back in for the search match", "\t\t\t\t\t\t\tvar result;", "\t\t\t\t\t\t\tvar searchString = logEntryContent;", '\t\t\t\t\t\t\tlogEntryContent = "";', '\t\t\t\t\t\t\twrappedLogEntryContent = "";', "\t\t\t\t\t\t\twhile ((searchIndex = searchString.indexOf(startToken, startIndex)) > -1) {", "\t\t\t\t\t\t\t\tvar endTokenIndex = searchString.indexOf(endToken, searchIndex);", "\t\t\t\t\t\t\t\tmatchedText = searchString.substring(searchIndex + startToken.length, endTokenIndex);", "\t\t\t\t\t\t\t\ttextBeforeMatch = searchString.substring(startIndex, searchIndex);", "\t\t\t\t\t\t\t\tlogEntryContent += preStartTag + textBeforeMatch + preEndTag;", "\t\t\t\t\t\t\t\tlogEntryContent += searchTermReplacementStartTag + preStartTag + matchedText +", "\t\t\t\t\t\t\t\t\tpreEndTag + searchTermReplacementEndTag;", "\t\t\t\t\t\t\t\tif (isIe) {", "\t\t\t\t\t\t\t\t\twrappedLogEntryContent += textBeforeMatch + searchTermReplacementStartTag +", "\t\t\t\t\t\t\t\t\t\tmatchedText + searchTermReplacementEndTag;", "\t\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\t\tstartIndex = endTokenIndex + endToken.length;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\tlogEntryContent += preStartTag + searchString.substr(startIndex) + preEndTag;", "\t\t\t\t\t\t\tif (isIe) {", "\t\t\t\t\t\t\t\twrappedLogEntryContent += searchString.substr(startIndex);", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t} else {", '\t\t\t\t\t\t\tlogEntryContent = "";', '\t\t\t\t\t\t\twrappedLogEntryContent = "";', "\t\t\t\t\t\t\tvar searchTermReplacementLength = searchTermReplacementStartTag.length +", "\t\t\t\t\t\t\t\tthis.searchTerm.length + searchTermReplacementEndTag.length;", "\t\t\t\t\t\t\tvar searchTermLength = this.searchTerm.length;", "\t\t\t\t\t\t\tvar searchTermLowerCase = this.searchTerm.toLowerCase();", "\t\t\t\t\t\t\tvar logTextLowerCase = logEntry.formattedMessage.toLowerCase();", "\t\t\t\t\t\t\twhile ((searchIndex = logTextLowerCase.indexOf(searchTermLowerCase, startIndex)) > -1) {", "\t\t\t\t\t\t\t\tmatchedText = escapeHtml(logEntry.formattedMessage.substr(searchIndex, this.searchTerm.length));", "\t\t\t\t\t\t\t\ttextBeforeMatch = escapeHtml(logEntry.formattedMessage.substring(startIndex, searchIndex));", "\t\t\t\t\t\t\t\tvar searchTermReplacement = searchTermReplacementStartTag +", "\t\t\t\t\t\t\t\t\tpreStartTag + matchedText + preEndTag + searchTermReplacementEndTag;", "\t\t\t\t\t\t\t\tlogEntryContent += preStartTag + textBeforeMatch + preEndTag + searchTermReplacement;", "\t\t\t\t\t\t\t\tif (isIe) {", "\t\t\t\t\t\t\t\t\twrappedLogEntryContent += textBeforeMatch + searchTermReplacementStartTag +", "\t\t\t\t\t\t\t\t\t\tmatchedText + searchTermReplacementEndTag;", "\t\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\t\tstartIndex = searchIndex + searchTermLength;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\tvar textAfterLastMatch = escapeHtml(logEntry.formattedMessage.substr(startIndex));", "\t\t\t\t\t\t\tlogEntryContent += preStartTag + textAfterLastMatch + preEndTag;", "\t\t\t\t\t\t\tif (isIe) {", "\t\t\t\t\t\t\t\twrappedLogEntryContent += textAfterLastMatch;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t}", "\t\t\t\t\t\tlogEntry.setContent(logEntryContent, wrappedLogEntryContent);", "\t\t\t\t\t\tvar logEntryMatches = logEntry.getSearchMatches();", "\t\t\t\t\t\tthis.matches = this.matches.concat(logEntryMatches);", "\t\t\t\t\t} else {", "\t\t\t\t\t\tlogEntry.setSearchMatch(false);", "\t\t\t\t\t\tlogEntry.setContent(logEntry.formattedMessage, logEntry.formattedMessage);", "\t\t\t\t\t}", "\t\t\t\t\treturn doesMatch;", "\t\t\t\t},", "", "\t\t\t\tremoveMatches: function(logEntries) {", "\t\t\t\t\tvar matchesToRemoveCount = 0;", "\t\t\t\t\tvar currentMatchRemoved = false;", "\t\t\t\t\tvar matchesToRemove = [];", "\t\t\t\t\tvar i, iLen, j, jLen;", "", "\t\t\t\t\t// Establish the list of matches to be removed", "\t\t\t\t\tfor (i = 0, iLen = this.matches.length; i < iLen; i++) {", "\t\t\t\t\t\tfor (j = 0, jLen = logEntries.length; j < jLen; j++) {", "\t\t\t\t\t\t\tif (this.matches[i].belongsTo(logEntries[j])) {", "\t\t\t\t\t\t\t\tmatchesToRemove.push(this.matches[i]);", "\t\t\t\t\t\t\t\tif (i === currentMatchIndex) {", "\t\t\t\t\t\t\t\t\tcurrentMatchRemoved = true;", "\t\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "", "\t\t\t\t\t// Set the new current match index if the current match has been deleted", "\t\t\t\t\t// This will be the first match that appears after the first log entry being", "\t\t\t\t\t// deleted, if one exists; otherwise, it's the first match overall", "\t\t\t\t\tvar newMatch = currentMatchRemoved ? null : this.matches[currentMatchIndex];", "\t\t\t\t\tif (currentMatchRemoved) {", "\t\t\t\t\t\tfor (i = currentMatchIndex, iLen = this.matches.length; i < iLen; i++) {", "\t\t\t\t\t\t\tif (this.matches[i].isVisible() && !array_contains(matchesToRemove, this.matches[i])) {", "\t\t\t\t\t\t\t\tnewMatch = this.matches[i];", "\t\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t}", "\t\t\t\t\t}", "", "\t\t\t\t\t// Remove the matches", "\t\t\t\t\tfor (i = 0, iLen = matchesToRemove.length; i < iLen; i++) {", "\t\t\t\t\t\tarray_remove(this.matches, matchesToRemove[i]);", "\t\t\t\t\t\tmatchesToRemove[i].remove();", "\t\t\t\t\t}", "", "\t\t\t\t\t// Set the new match, if one exists", "\t\t\t\t\tif (this.hasVisibleMatches()) {", "\t\t\t\t\t\tif (newMatch === null) {", "\t\t\t\t\t\t\tsetCurrentMatchIndex(0);", "\t\t\t\t\t\t} else {", "\t\t\t\t\t\t\t// Get the index of the new match", "\t\t\t\t\t\t\tvar newMatchIndex = 0;", "\t\t\t\t\t\t\tfor (i = 0, iLen = this.matches.length; i < iLen; i++) {", "\t\t\t\t\t\t\t\tif (newMatch === this.matches[i]) {", "\t\t\t\t\t\t\t\t\tnewMatchIndex = i;", "\t\t\t\t\t\t\t\t\tbreak;", "\t\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t\tsetCurrentMatchIndex(newMatchIndex);", "\t\t\t\t\t\t}", "\t\t\t\t\t} else {", "\t\t\t\t\t\tcurrentMatchIndex = null;", "\t\t\t\t\t\tdisplayNoMatches();", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t};", "", "\t\t\tfunction getPageOffsetTop(el, container) {", "\t\t\t\tvar currentEl = el;", "\t\t\t\tvar y = 0;", "\t\t\t\twhile (currentEl && currentEl != container) {", "\t\t\t\t\ty += currentEl.offsetTop;", "\t\t\t\t\tcurrentEl = currentEl.offsetParent;", "\t\t\t\t}", "\t\t\t\treturn y;", "\t\t\t}", "", "\t\t\tfunction scrollIntoView(el) {", "\t\t\t\tvar logContainer = logMainContainer;", "\t\t\t\t// Check if the whole width of the element is visible and centre if not", '\t\t\t\tif (!$("wrap").checked) {', "\t\t\t\t\tvar logContainerLeft = logContainer.scrollLeft;", "\t\t\t\t\tvar logContainerRight = logContainerLeft  + logContainer.offsetWidth;", "\t\t\t\t\tvar elLeft = el.offsetLeft;", "\t\t\t\t\tvar elRight = elLeft + el.offsetWidth;", "\t\t\t\t\tif (elLeft < logContainerLeft || elRight > logContainerRight) {", "\t\t\t\t\t\tlogContainer.scrollLeft = elLeft - (logContainer.offsetWidth - el.offsetWidth) / 2;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\t// Check if the whole height of the element is visible and centre if not", "\t\t\t\tvar logContainerTop = logContainer.scrollTop;", "\t\t\t\tvar logContainerBottom = logContainerTop  + logContainer.offsetHeight;", "\t\t\t\tvar elTop = getPageOffsetTop(el) - getToolBarsHeight();", "\t\t\t\tvar elBottom = elTop + el.offsetHeight;", "\t\t\t\tif (elTop < logContainerTop || elBottom > logContainerBottom) {", "\t\t\t\t\tlogContainer.scrollTop = elTop - (logContainer.offsetHeight - el.offsetHeight) / 2;", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction Match(logEntryLevel, spanInMainDiv, spanInUnwrappedPre, spanInWrappedDiv) {", "\t\t\t\tthis.logEntryLevel = logEntryLevel;", "\t\t\t\tthis.spanInMainDiv = spanInMainDiv;", "\t\t\t\tif (isIe) {", "\t\t\t\t\tthis.spanInUnwrappedPre = spanInUnwrappedPre;", "\t\t\t\t\tthis.spanInWrappedDiv = spanInWrappedDiv;", "\t\t\t\t}", "\t\t\t\tthis.mainSpan = isIe ? spanInUnwrappedPre : spanInMainDiv;", "\t\t\t}", "", "\t\t\tMatch.prototype = {", "\t\t\t\tequals: function(match) {", "\t\t\t\t\treturn this.mainSpan === match.mainSpan;", "\t\t\t\t},", "", "\t\t\t\tsetCurrent: function() {", "\t\t\t\t\tif (isIe) {", '\t\t\t\t\t\taddClass(this.spanInUnwrappedPre, "currentmatch");', '\t\t\t\t\t\taddClass(this.spanInWrappedDiv, "currentmatch");', "\t\t\t\t\t\t// Scroll the visible one into view", '\t\t\t\t\t\tvar elementToScroll = $("wrap").checked ? this.spanInWrappedDiv : this.spanInUnwrappedPre;', "\t\t\t\t\t\tscrollIntoView(elementToScroll);", "\t\t\t\t\t} else {", '\t\t\t\t\t\taddClass(this.spanInMainDiv, "currentmatch");', "\t\t\t\t\t\tscrollIntoView(this.spanInMainDiv);", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tbelongsTo: function(logEntry) {", "\t\t\t\t\tif (isIe) {", "\t\t\t\t\t\treturn isDescendant(this.spanInUnwrappedPre, logEntry.unwrappedPre);", "\t\t\t\t\t} else {", "\t\t\t\t\t\treturn isDescendant(this.spanInMainDiv, logEntry.mainDiv);", "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tsetNotCurrent: function() {", "\t\t\t\t\tif (isIe) {", '\t\t\t\t\t\tremoveClass(this.spanInUnwrappedPre, "currentmatch");', '\t\t\t\t\t\tremoveClass(this.spanInWrappedDiv, "currentmatch");', "\t\t\t\t\t} else {", '\t\t\t\t\t\tremoveClass(this.spanInMainDiv, "currentmatch");', "\t\t\t\t\t}", "\t\t\t\t},", "", "\t\t\t\tisOrphan: function() {", "\t\t\t\t\treturn isOrphan(this.mainSpan);", "\t\t\t\t},", "", "\t\t\t\tisVisible: function() {", "\t\t\t\t\treturn getCheckBox(this.logEntryLevel).checked;", "\t\t\t\t},", "", "\t\t\t\tremove: function() {", "\t\t\t\t\tif (isIe) {", "\t\t\t\t\t\tthis.spanInUnwrappedPre = null;", "\t\t\t\t\t\tthis.spanInWrappedDiv = null;", "\t\t\t\t\t} else {", "\t\t\t\t\t\tthis.spanInMainDiv = null;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t};", "", "\t\t\tvar currentSearch = null;", "\t\t\tvar currentMatchIndex = null;", "", "\t\t\tfunction doSearch() {", '\t\t\t\tvar searchBox = $("searchBox");', "\t\t\t\tvar searchTerm = searchBox.value;", '\t\t\t\tvar isRegex = $("searchRegex").checked;', '\t\t\t\tvar isCaseSensitive = $("searchCaseSensitive").checked;', "\t\t\t\tvar i;", "", '\t\t\t\tif (searchTerm === "") {', '\t\t\t\t\t$("searchReset").disabled = true;', '\t\t\t\t\t$("searchNav").style.display = "none";', '\t\t\t\t\tremoveClass(document.body, "searching");', '\t\t\t\t\tremoveClass(searchBox, "hasmatches");', '\t\t\t\t\tremoveClass(searchBox, "nomatches");', "\t\t\t\t\tfor (i = 0; i < logEntries.length; i++) {", "\t\t\t\t\t\tlogEntries[i].clearSearch();", "\t\t\t\t\t\tlogEntries[i].setContent(logEntries[i].formattedMessage, logEntries[i].formattedMessage);", "\t\t\t\t\t}", "\t\t\t\t\tcurrentSearch = null;", "\t\t\t\t\tsetLogContainerHeight();", "\t\t\t\t} else {", '\t\t\t\t\t$("searchReset").disabled = false;', '\t\t\t\t\t$("searchNav").style.display = "block";', "\t\t\t\t\tvar searchRegex;", "\t\t\t\t\tvar regexValid;", "\t\t\t\t\tif (isRegex) {", "\t\t\t\t\t\ttry {", '\t\t\t\t\t\t\tsearchRegex = isCaseSensitive ? new RegExp(searchTerm, "g") : new RegExp(searchTerm, "gi");', "\t\t\t\t\t\t\tregexValid = true;", '\t\t\t\t\t\t\treplaceClass(searchBox, "validregex", "invalidregex");', '\t\t\t\t\t\t\tsearchBox.title = "Valid regex";', "\t\t\t\t\t\t} catch (ex) {", "\t\t\t\t\t\t\tregexValid = false;", '\t\t\t\t\t\t\treplaceClass(searchBox, "invalidregex", "validregex");', '\t\t\t\t\t\t\tsearchBox.title = "Invalid regex: " + (ex.message ? ex.message : (ex.description ? ex.description : "unknown error"));', "\t\t\t\t\t\t\treturn;", "\t\t\t\t\t\t}", "\t\t\t\t\t} else {", '\t\t\t\t\t\tsearchBox.title = "";', '\t\t\t\t\t\tremoveClass(searchBox, "validregex");', '\t\t\t\t\t\tremoveClass(searchBox, "invalidregex");', "\t\t\t\t\t}", '\t\t\t\t\taddClass(document.body, "searching");', "\t\t\t\t\tcurrentSearch = new Search(searchTerm, isRegex, searchRegex, isCaseSensitive);", "\t\t\t\t\tfor (i = 0; i < logEntries.length; i++) {", "\t\t\t\t\t\tcurrentSearch.applyTo(logEntries[i]);", "\t\t\t\t\t}", "\t\t\t\t\tsetLogContainerHeight();", "", "\t\t\t\t\t// Highlight the first search match", "\t\t\t\t\tif (currentSearch.hasVisibleMatches()) {", "\t\t\t\t\t\tsetCurrentMatchIndex(0);", "\t\t\t\t\t\tdisplayMatches();", "\t\t\t\t\t} else {", "\t\t\t\t\t\tdisplayNoMatches();", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction updateSearchFromFilters() {", "\t\t\t\tif (currentSearch) {", "\t\t\t\t\tif (currentSearch.hasMatches()) {", "\t\t\t\t\t\tif (currentMatchIndex === null) {", "\t\t\t\t\t\t\tcurrentMatchIndex = 0;", "\t\t\t\t\t\t}", "\t\t\t\t\t\tvar currentMatch = currentSearch.matches[currentMatchIndex];", "\t\t\t\t\t\tif (currentMatch.isVisible()) {", "\t\t\t\t\t\t\tdisplayMatches();", "\t\t\t\t\t\t\tsetCurrentMatchIndex(currentMatchIndex);", "\t\t\t\t\t\t} else {", "\t\t\t\t\t\t\tcurrentMatch.setNotCurrent();", "\t\t\t\t\t\t\t// Find the next visible match, if one exists", "\t\t\t\t\t\t\tvar nextVisibleMatchIndex = currentSearch.getNextVisibleMatchIndex();", "\t\t\t\t\t\t\tif (nextVisibleMatchIndex > -1) {", "\t\t\t\t\t\t\t\tsetCurrentMatchIndex(nextVisibleMatchIndex);", "\t\t\t\t\t\t\t\tdisplayMatches();", "\t\t\t\t\t\t\t} else {", "\t\t\t\t\t\t\t\tdisplayNoMatches();", "\t\t\t\t\t\t\t}", "\t\t\t\t\t\t}", "\t\t\t\t\t} else {", "\t\t\t\t\t\tdisplayNoMatches();", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction refreshCurrentMatch() {", "\t\t\t\tif (currentSearch && currentSearch.hasVisibleMatches()) {", "\t\t\t\t\tsetCurrentMatchIndex(currentMatchIndex);", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction displayMatches() {", '\t\t\t\treplaceClass($("searchBox"), "hasmatches", "nomatches");', '\t\t\t\t$("searchBox").title = "" + currentSearch.matches.length + " matches found";', '\t\t\t\t$("searchNav").style.display = "block";', "\t\t\t\tsetLogContainerHeight();", "\t\t\t}", "", "\t\t\tfunction displayNoMatches() {", '\t\t\t\treplaceClass($("searchBox"), "nomatches", "hasmatches");', '\t\t\t\t$("searchBox").title = "No matches found";', '\t\t\t\t$("searchNav").style.display = "none";', "\t\t\t\tsetLogContainerHeight();", "\t\t\t}", "", "\t\t\tfunction toggleSearchEnabled(enable) {", '\t\t\t\tenable = (typeof enable == "undefined") ? !$("searchDisable").checked : enable;', '\t\t\t\t$("searchBox").disabled = !enable;', '\t\t\t\t$("searchReset").disabled = !enable;', '\t\t\t\t$("searchRegex").disabled = !enable;', '\t\t\t\t$("searchNext").disabled = !enable;', '\t\t\t\t$("searchPrevious").disabled = !enable;', '\t\t\t\t$("searchCaseSensitive").disabled = !enable;', '\t\t\t\t$("searchNav").style.display = (enable && ($("searchBox").value !== "") &&', "\t\t\t\t\t\tcurrentSearch && currentSearch.hasVisibleMatches()) ?", '\t\t\t\t\t"block" : "none";', "\t\t\t\tif (enable) {", '\t\t\t\t\tremoveClass($("search"), "greyedout");', '\t\t\t\t\taddClass(document.body, "searching");', '\t\t\t\t\tif ($("searchHighlight").checked) {', '\t\t\t\t\t\taddClass(logMainContainer, "searchhighlight");', "\t\t\t\t\t} else {", '\t\t\t\t\t\tremoveClass(logMainContainer, "searchhighlight");', "\t\t\t\t\t}", '\t\t\t\t\tif ($("searchFilter").checked) {', '\t\t\t\t\t\taddClass(logMainContainer, "searchfilter");', "\t\t\t\t\t} else {", '\t\t\t\t\t\tremoveClass(logMainContainer, "searchfilter");', "\t\t\t\t\t}", '\t\t\t\t\t$("searchDisable").checked = !enable;', "\t\t\t\t} else {", '\t\t\t\t\taddClass($("search"), "greyedout");', '\t\t\t\t\tremoveClass(document.body, "searching");', '\t\t\t\t\tremoveClass(logMainContainer, "searchhighlight");', '\t\t\t\t\tremoveClass(logMainContainer, "searchfilter");', "\t\t\t\t}", "\t\t\t\tsetLogContainerHeight();", "\t\t\t}", "", "\t\t\tfunction toggleSearchFilter() {", '\t\t\t\tvar enable = $("searchFilter").checked;', "\t\t\t\tif (enable) {", '\t\t\t\t\taddClass(logMainContainer, "searchfilter");', "\t\t\t\t} else {", '\t\t\t\t\tremoveClass(logMainContainer, "searchfilter");', "\t\t\t\t}", "\t\t\t\trefreshCurrentMatch();", "\t\t\t}", "", "\t\t\tfunction toggleSearchHighlight() {", '\t\t\t\tvar enable = $("searchHighlight").checked;', "\t\t\t\tif (enable) {", '\t\t\t\t\taddClass(logMainContainer, "searchhighlight");', "\t\t\t\t} else {", '\t\t\t\t\tremoveClass(logMainContainer, "searchhighlight");', "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction clearSearch() {", '\t\t\t\t$("searchBox").value = "";', "\t\t\t\tdoSearch();", "\t\t\t}", "", "\t\t\tfunction searchNext() {", "\t\t\t\tif (currentSearch !== null && currentMatchIndex !== null) {", "\t\t\t\t\tcurrentSearch.matches[currentMatchIndex].setNotCurrent();", "\t\t\t\t\tvar nextMatchIndex = currentSearch.getNextVisibleMatchIndex();", '\t\t\t\t\tif (nextMatchIndex > currentMatchIndex || confirm("Reached the end of the page. Start from the top?")) {', "\t\t\t\t\t\tsetCurrentMatchIndex(nextMatchIndex);", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction searchPrevious() {", "\t\t\t\tif (currentSearch !== null && currentMatchIndex !== null) {", "\t\t\t\t\tcurrentSearch.matches[currentMatchIndex].setNotCurrent();", "\t\t\t\t\tvar previousMatchIndex = currentSearch.getPreviousVisibleMatchIndex();", '\t\t\t\t\tif (previousMatchIndex < currentMatchIndex || confirm("Reached the start of the page. Continue from the bottom?")) {', "\t\t\t\t\t\tsetCurrentMatchIndex(previousMatchIndex);", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction setCurrentMatchIndex(index) {", "\t\t\t\tcurrentMatchIndex = index;", "\t\t\t\tcurrentSearch.matches[currentMatchIndex].setCurrent();", "\t\t\t}", "", "\t\t\t/* ------------------------------------------------------------------------- */", "", "\t\t\t// CSS Utilities", "", "\t\t\tfunction addClass(el, cssClass) {", "\t\t\t\tif (!hasClass(el, cssClass)) {", "\t\t\t\t\tif (el.className) {", '\t\t\t\t\t\tel.className += " " + cssClass;', "\t\t\t\t\t} else {", "\t\t\t\t\t\tel.className = cssClass;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction hasClass(el, cssClass) {", "\t\t\t\tif (el.className) {", '\t\t\t\t\tvar classNames = el.className.split(" ");', "\t\t\t\t\treturn array_contains(classNames, cssClass);", "\t\t\t\t}", "\t\t\t\treturn false;", "\t\t\t}", "", "\t\t\tfunction removeClass(el, cssClass) {", "\t\t\t\tif (hasClass(el, cssClass)) {", "\t\t\t\t\t// Rebuild the className property", '\t\t\t\t\tvar existingClasses = el.className.split(" ");', "\t\t\t\t\tvar newClasses = [];", "\t\t\t\t\tfor (var i = 0, len = existingClasses.length; i < len; i++) {", "\t\t\t\t\t\tif (existingClasses[i] != cssClass) {", "\t\t\t\t\t\t\tnewClasses[newClasses.length] = existingClasses[i];", "\t\t\t\t\t\t}", "\t\t\t\t\t}", '\t\t\t\t\tel.className = newClasses.join(" ");', "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction replaceClass(el, newCssClass, oldCssClass) {", "\t\t\t\tremoveClass(el, oldCssClass);", "\t\t\t\taddClass(el, newCssClass);", "\t\t\t}", "", "\t\t\t/* ------------------------------------------------------------------------- */", "", "\t\t\t// Other utility functions", "", "\t\t\tfunction getElementsByClass(el, cssClass, tagName) {", "\t\t\t\tvar elements = el.getElementsByTagName(tagName);", "\t\t\t\tvar matches = [];", "\t\t\t\tfor (var i = 0, len = elements.length; i < len; i++) {", "\t\t\t\t\tif (hasClass(elements[i], cssClass)) {", "\t\t\t\t\t\tmatches.push(elements[i]);", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\treturn matches;", "\t\t\t}", "", "\t\t\t// Syntax borrowed from Prototype library", "\t\t\tfunction $(id) {", "\t\t\t\treturn document.getElementById(id);", "\t\t\t}", "", "\t\t\tfunction isDescendant(node, ancestorNode) {", "\t\t\t\twhile (node != null) {", "\t\t\t\t\tif (node === ancestorNode) {", "\t\t\t\t\t\treturn true;", "\t\t\t\t\t}", "\t\t\t\t\tnode = node.parentNode;", "\t\t\t\t}", "\t\t\t\treturn false;", "\t\t\t}", "", "\t\t\tfunction isOrphan(node) {", "\t\t\t\tvar currentNode = node;", "\t\t\t\twhile (currentNode) {", "\t\t\t\t\tif (currentNode == document.body) {", "\t\t\t\t\t\treturn false;", "\t\t\t\t\t}", "\t\t\t\t\tcurrentNode = currentNode.parentNode;", "\t\t\t\t}", "\t\t\t\treturn true;", "\t\t\t}", "", "\t\t\tfunction escapeHtml(str) {", '\t\t\t\treturn str.replace(/&/g, "&amp;").replace(/[<]/g, "&lt;").replace(/>/g, "&gt;");', "\t\t\t}", "", "\t\t\tfunction getWindowWidth() {", "\t\t\t\tif (window.innerWidth) {", "\t\t\t\t\treturn window.innerWidth;", "\t\t\t\t} else if (document.documentElement && document.documentElement.clientWidth) {", "\t\t\t\t\treturn document.documentElement.clientWidth;", "\t\t\t\t} else if (document.body) {", "\t\t\t\t\treturn document.body.clientWidth;", "\t\t\t\t}", "\t\t\t\treturn 0;", "\t\t\t}", "", "\t\t\tfunction getWindowHeight() {", "\t\t\t\tif (window.innerHeight) {", "\t\t\t\t\treturn window.innerHeight;", "\t\t\t\t} else if (document.documentElement && document.documentElement.clientHeight) {", "\t\t\t\t\treturn document.documentElement.clientHeight;", "\t\t\t\t} else if (document.body) {", "\t\t\t\t\treturn document.body.clientHeight;", "\t\t\t\t}", "\t\t\t\treturn 0;", "\t\t\t}", "", "\t\t\tfunction getToolBarsHeight() {", '\t\t\t\treturn $("switches").offsetHeight;', "\t\t\t}", "", "\t\t\tfunction getChromeHeight() {", "\t\t\t\tvar height = getToolBarsHeight();", "\t\t\t\tif (showCommandLine) {", '\t\t\t\t\theight += $("commandLine").offsetHeight;', "\t\t\t\t}", "\t\t\t\treturn height;", "\t\t\t}", "", "\t\t\tfunction setLogContainerHeight() {", "\t\t\t\tif (logMainContainer) {", "\t\t\t\t\tvar windowHeight = getWindowHeight();", '\t\t\t\t\t$("body").style.height = getWindowHeight() + "px";', '\t\t\t\t\tlogMainContainer.style.height = "" +', '\t\t\t\t\t\tMath.max(0, windowHeight - getChromeHeight()) + "px";', "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction setCommandInputWidth() {", "\t\t\t\tif (showCommandLine) {", '\t\t\t\t\t$("command").style.width = "" + Math.max(0, $("commandLineContainer").offsetWidth -', '\t\t\t\t\t\t($("evaluateButton").offsetWidth + 13)) + "px";', "\t\t\t\t}", "\t\t\t}", "", "\t\t\twindow.onresize = function() {", "\t\t\t\tsetCommandInputWidth();", "\t\t\t\tsetLogContainerHeight();", "\t\t\t};", "", "\t\t\tif (!Array.prototype.push) {", "\t\t\t\tArray.prototype.push = function() {", "\t\t\t        for (var i = 0, len = arguments.length; i < len; i++){", "\t\t\t            this[this.length] = arguments[i];", "\t\t\t        }", "\t\t\t        return this.length;", "\t\t\t\t};", "\t\t\t}", "", "\t\t\tif (!Array.prototype.pop) {", "\t\t\t\tArray.prototype.pop = function() {", "\t\t\t\t\tif (this.length > 0) {", "\t\t\t\t\t\tvar val = this[this.length - 1];", "\t\t\t\t\t\tthis.length = this.length - 1;", "\t\t\t\t\t\treturn val;", "\t\t\t\t\t}", "\t\t\t\t};", "\t\t\t}", "", "\t\t\tif (!Array.prototype.shift) {", "\t\t\t\tArray.prototype.shift = function() {", "\t\t\t\t\tif (this.length > 0) {", "\t\t\t\t\t\tvar firstItem = this[0];", "\t\t\t\t\t\tfor (var i = 0, len = this.length - 1; i < len; i++) {", "\t\t\t\t\t\t\tthis[i] = this[i + 1];", "\t\t\t\t\t\t}", "\t\t\t\t\t\tthis.length = this.length - 1;", "\t\t\t\t\t\treturn firstItem;", "\t\t\t\t\t}", "\t\t\t\t};", "\t\t\t}", "", "\t\t\tif (!Array.prototype.splice) {", "\t\t\t\tArray.prototype.splice = function(startIndex, deleteCount) {", "\t\t\t\t\tvar itemsAfterDeleted = this.slice(startIndex + deleteCount);", "\t\t\t\t\tvar itemsDeleted = this.slice(startIndex, startIndex + deleteCount);", "\t\t\t\t\tthis.length = startIndex;", "\t\t\t\t\t// Copy the arguments into a proper Array object", "\t\t\t\t\tvar argumentsArray = [];", "\t\t\t\t\tfor (var i = 0, len = arguments.length; i < len; i++) {", "\t\t\t\t\t\targumentsArray[i] = arguments[i];", "\t\t\t\t\t}", "\t\t\t\t\tvar itemsToAppend = (argumentsArray.length > 2) ?", "\t\t\t\t\t\titemsAfterDeleted = argumentsArray.slice(2).concat(itemsAfterDeleted) : itemsAfterDeleted;", "\t\t\t\t\tfor (i = 0, len = itemsToAppend.length; i < len; i++) {", "\t\t\t\t\t\tthis.push(itemsToAppend[i]);", "\t\t\t\t\t}", "\t\t\t\t\treturn itemsDeleted;", "\t\t\t\t};", "\t\t\t}", "", "\t\t\tfunction array_remove(arr, val) {", "\t\t\t\tvar index = -1;", "\t\t\t\tfor (var i = 0, len = arr.length; i < len; i++) {", "\t\t\t\t\tif (arr[i] === val) {", "\t\t\t\t\t\tindex = i;", "\t\t\t\t\t\tbreak;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\tif (index >= 0) {", "\t\t\t\t\tarr.splice(index, 1);", "\t\t\t\t\treturn index;", "\t\t\t\t} else {", "\t\t\t\t\treturn false;", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction array_removeFromStart(array, numberToRemove) {", "\t\t\t\tif (Array.prototype.splice) {", "\t\t\t\t\tarray.splice(0, numberToRemove);", "\t\t\t\t} else {", "\t\t\t\t\tfor (var i = numberToRemove, len = array.length; i < len; i++) {", "\t\t\t\t\t\tarray[i - numberToRemove] = array[i];", "\t\t\t\t\t}", "\t\t\t\t\tarray.length = array.length - numberToRemove;", "\t\t\t\t}", "\t\t\t\treturn array;", "\t\t\t}", "", "\t\t\tfunction array_contains(arr, val) {", "\t\t\t\tfor (var i = 0, len = arr.length; i < len; i++) {", "\t\t\t\t\tif (arr[i] == val) {", "\t\t\t\t\t\treturn true;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\treturn false;", "\t\t\t}", "", "\t\t\tfunction getErrorMessage(ex) {", "\t\t\t\tif (ex.message) {", "\t\t\t\t\treturn ex.message;", "\t\t\t\t} else if (ex.description) {", "\t\t\t\t\treturn ex.description;", "\t\t\t\t}", '\t\t\t\treturn "" + ex;', "\t\t\t}", "", "\t\t\tfunction moveCaretToEnd(input) {", "\t\t\t\tif (input.setSelectionRange) {", "\t\t\t\t\tinput.focus();", "\t\t\t\t\tvar length = input.value.length;", "\t\t\t\t\tinput.setSelectionRange(length, length);", "\t\t\t\t} else if (input.createTextRange) {", "\t\t\t\t\tvar range = input.createTextRange();", "\t\t\t\t\trange.collapse(false);", "\t\t\t\t\trange.select();", "\t\t\t\t}", "\t\t\t\tinput.focus();", "\t\t\t}", "", "\t\t\tfunction stopPropagation(evt) {", "\t\t\t\tif (evt.stopPropagation) {", "\t\t\t\t\tevt.stopPropagation();", '\t\t\t\t} else if (typeof evt.cancelBubble != "undefined") {', "\t\t\t\t\tevt.cancelBubble = true;", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction getEvent(evt) {", "\t\t\t\treturn evt ? evt : event;", "\t\t\t}", "", "\t\t\tfunction getTarget(evt) {", "\t\t\t\treturn evt.target ? evt.target : evt.srcElement;", "\t\t\t}", "", "\t\t\tfunction getRelatedTarget(evt) {", "\t\t\t\tif (evt.relatedTarget) {", "\t\t\t\t\treturn evt.relatedTarget;", "\t\t\t\t} else if (evt.srcElement) {", "\t\t\t\t\tswitch(evt.type) {", '\t\t\t\t\t\tcase "mouseover":', "\t\t\t\t\t\t\treturn evt.fromElement;", '\t\t\t\t\t\tcase "mouseout":', "\t\t\t\t\t\t\treturn evt.toElement;", "\t\t\t\t\t\tdefault:", "\t\t\t\t\t\t\treturn evt.srcElement;", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tfunction cancelKeyEvent(evt) {", "\t\t\t\tevt.returnValue = false;", "\t\t\t\tstopPropagation(evt);", "\t\t\t}", "", "\t\t\tfunction evalCommandLine() {", '\t\t\t\tvar expr = $("command").value;', "\t\t\t\tevalCommand(expr);", '\t\t\t\t$("command").value = "";', "\t\t\t}", "", "\t\t\tfunction evalLastCommand() {", "\t\t\t\tif (lastCommand != null) {", "\t\t\t\t\tevalCommand(lastCommand);", "\t\t\t\t}", "\t\t\t}", "", "\t\t\tvar lastCommand = null;", "\t\t\tvar commandHistory = [];", "\t\t\tvar currentCommandIndex = 0;", "", "\t\t\tfunction evalCommand(expr) {", "\t\t\t\tif (appender) {", "\t\t\t\t\tappender.evalCommandAndAppend(expr);", "\t\t\t\t} else {", '\t\t\t\t\tvar prefix = ">>> " + expr + "\\r\\n";', "\t\t\t\t\ttry {", '\t\t\t\t\t\tlog("INFO", prefix + eval(expr));', "\t\t\t\t\t} catch (ex) {", '\t\t\t\t\t\tlog("ERROR", prefix + "Error: " + getErrorMessage(ex));', "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\t// Update command history", "\t\t\t\tif (expr != commandHistory[commandHistory.length - 1]) {", "\t\t\t\t\tcommandHistory.push(expr);", "\t\t\t\t\t// Update the appender", "\t\t\t\t\tif (appender) {", "\t\t\t\t\t\tappender.storeCommandHistory(commandHistory);", "\t\t\t\t\t}", "\t\t\t\t}", "\t\t\t\tcurrentCommandIndex = (expr == commandHistory[currentCommandIndex]) ? currentCommandIndex + 1 : commandHistory.length;", "\t\t\t\tlastCommand = expr;", "\t\t\t}", "\t\t\t//]]>", "\t\t</script>", '\t\t<style type="text/css">', "\t\t\tbody {", "\t\t\t\tbackground-color: white;", "\t\t\t\tcolor: black;", "\t\t\t\tpadding: 0;", "\t\t\t\tmargin: 0;", "\t\t\t\tfont-family: tahoma, verdana, arial, helvetica, sans-serif;", "\t\t\t\toverflow: hidden;", "\t\t\t}", "", "\t\t\tdiv#switchesContainer input {", "\t\t\t\tmargin-bottom: 0;", "\t\t\t}", "", "\t\t\tdiv.toolbar {", "\t\t\t\tborder-top: solid #ffffff 1px;", "\t\t\t\tborder-bottom: solid #aca899 1px;", "\t\t\t\tbackground-color: #f1efe7;", "\t\t\t\tpadding: 3px 5px;", "\t\t\t\tfont-size: 68.75%;", "\t\t\t}", "", "\t\t\tdiv.toolbar, div#search input {", "\t\t\t\tfont-family: tahoma, verdana, arial, helvetica, sans-serif;", "\t\t\t}", "", "\t\t\tdiv.toolbar input.button {", "\t\t\t\tpadding: 0 5px;", "\t\t\t\tfont-size: 100%;", "\t\t\t}", "", "\t\t\tdiv.toolbar input.hidden {", "\t\t\t\tdisplay: none;", "\t\t\t}", "", "\t\t\tdiv#switches input#clearButton {", "\t\t\t\tmargin-left: 20px;", "\t\t\t}", "", "\t\t\tdiv#levels label {", "\t\t\t\tfont-weight: bold;", "\t\t\t}", "", "\t\t\tdiv#levels label, div#options label {", "\t\t\t\tmargin-right: 5px;", "\t\t\t}", "", "\t\t\tdiv#levels label#wrapLabel {", "\t\t\t\tfont-weight: normal;", "\t\t\t}", "", "\t\t\tdiv#search label {", "\t\t\t\tmargin-right: 10px;", "\t\t\t}", "", "\t\t\tdiv#search label.searchboxlabel {", "\t\t\t\tmargin-right: 0;", "\t\t\t}", "", "\t\t\tdiv#search input {", "\t\t\t\tfont-size: 100%;", "\t\t\t}", "", "\t\t\tdiv#search input.validregex {", "\t\t\t\tcolor: green;", "\t\t\t}", "", "\t\t\tdiv#search input.invalidregex {", "\t\t\t\tcolor: red;", "\t\t\t}", "", "\t\t\tdiv#search input.nomatches {", "\t\t\t\tcolor: white;", "\t\t\t\tbackground-color: #ff6666;", "\t\t\t}", "", "\t\t\tdiv#search input.nomatches {", "\t\t\t\tcolor: white;", "\t\t\t\tbackground-color: #ff6666;", "\t\t\t}", "", "\t\t\tdiv#searchNav {", "\t\t\t\tdisplay: none;", "\t\t\t}", "", "\t\t\tdiv#commandLine {", "\t\t\t\tdisplay: none;", "\t\t\t}", "", "\t\t\tdiv#commandLine input#command {", "\t\t\t\tfont-size: 100%;", "\t\t\t\tfont-family: Courier New, Courier;", "\t\t\t}", "", "\t\t\tdiv#commandLine input#evaluateButton {", "\t\t\t}", "", "\t\t\t*.greyedout {", "\t\t\t\tcolor: gray !important;", "\t\t\t\tborder-color: gray !important;", "\t\t\t}", "", "\t\t\t*.greyedout *.alwaysenabled { color: black; }", "", "\t\t\t*.unselectable {", "\t\t\t\t-khtml-user-select: none;", "\t\t\t\t-moz-user-select: none;", "\t\t\t\tuser-select: none;", "\t\t\t}", "", "\t\t\tdiv#log {", "\t\t\t\tfont-family: Courier New, Courier;", "\t\t\t\tfont-size: 75%;", "\t\t\t\twidth: 100%;", "\t\t\t\toverflow: auto;", "\t\t\t\tclear: both;", "\t\t\t\tposition: relative;", "\t\t\t}", "", "\t\t\tdiv.group {", "\t\t\t\tborder-color: #cccccc;", "\t\t\t\tborder-style: solid;", "\t\t\t\tborder-width: 1px 0 1px 1px;", "\t\t\t\toverflow: visible;", "\t\t\t}", "", "\t\t\tdiv.oldIe div.group, div.oldIe div.group *, div.oldIe *.logentry {", "\t\t\t\theight: 1%;", "\t\t\t}", "", "\t\t\tdiv.group div.groupheading span.expander {", "\t\t\t\tborder: solid black 1px;", "\t\t\t\tfont-family: Courier New, Courier;", "\t\t\t\tfont-size: 0.833em;", "\t\t\t\tbackground-color: #eeeeee;", "\t\t\t\tposition: relative;", "\t\t\t\ttop: -1px;", "\t\t\t\tcolor: black;", "\t\t\t\tpadding: 0 2px;", "\t\t\t\tcursor: pointer;", "\t\t\t\tcursor: hand;", "\t\t\t\theight: 1%;", "\t\t\t}", "", "\t\t\tdiv.group div.groupcontent {", "\t\t\t\tmargin-left: 10px;", "\t\t\t\tpadding-bottom: 2px;", "\t\t\t\toverflow: visible;", "\t\t\t}", "", "\t\t\tdiv.group div.expanded {", "\t\t\t\tdisplay: block;", "\t\t\t}", "", "\t\t\tdiv.group div.collapsed {", "\t\t\t\tdisplay: none;", "\t\t\t}", "", "\t\t\t*.logentry {", "\t\t\t\toverflow: visible;", "\t\t\t\tdisplay: none;", "\t\t\t\twhite-space: pre;", "\t\t\t}", "", "\t\t\tspan.pre {", "\t\t\t\twhite-space: pre;", "\t\t\t}", "\t\t\t", "\t\t\tpre.unwrapped {", "\t\t\t\tdisplay: inline !important;", "\t\t\t}", "", "\t\t\tpre.unwrapped pre.pre, div.wrapped pre.pre {", "\t\t\t\tdisplay: inline;", "\t\t\t}", "", "\t\t\tdiv.wrapped pre.pre {", "\t\t\t\twhite-space: normal;", "\t\t\t}", "", "\t\t\tdiv.wrapped {", "\t\t\t\tdisplay: none;", "\t\t\t}", "", "\t\t\tbody.searching *.logentry span.currentmatch {", "\t\t\t\tcolor: white !important;", "\t\t\t\tbackground-color: green !important;", "\t\t\t}", "", "\t\t\tbody.searching div.searchhighlight *.logentry span.searchterm {", "\t\t\t\tcolor: black;", "\t\t\t\tbackground-color: yellow;", "\t\t\t}", "", "\t\t\tdiv.wrap *.logentry {", "\t\t\t\twhite-space: normal !important;", "\t\t\t\tborder-width: 0 0 1px 0;", "\t\t\t\tborder-color: #dddddd;", "\t\t\t\tborder-style: dotted;", "\t\t\t}", "", "\t\t\tdiv.wrap #log_wrapped, #log_unwrapped {", "\t\t\t\tdisplay: block;", "\t\t\t}", "", "\t\t\tdiv.wrap #log_unwrapped, #log_wrapped {", "\t\t\t\tdisplay: none;", "\t\t\t}", "", "\t\t\tdiv.wrap *.logentry span.pre {", "\t\t\t\toverflow: visible;", "\t\t\t\twhite-space: normal;", "\t\t\t}", "", "\t\t\tdiv.wrap *.logentry pre.unwrapped {", "\t\t\t\tdisplay: none;", "\t\t\t}", "", "\t\t\tdiv.wrap *.logentry span.wrapped {", "\t\t\t\tdisplay: inline;", "\t\t\t}", "", "\t\t\tdiv.searchfilter *.searchnonmatch {", "\t\t\t\tdisplay: none !important;", "\t\t\t}", "", "\t\t\tdiv#log *.TRACE, label#label_TRACE {", "\t\t\t\tcolor: #666666;", "\t\t\t}", "", "\t\t\tdiv#log *.DEBUG, label#label_DEBUG {", "\t\t\t\tcolor: green;", "\t\t\t}", "", "\t\t\tdiv#log *.INFO, label#label_INFO {", "\t\t\t\tcolor: #000099;", "\t\t\t}", "", "\t\t\tdiv#log *.WARN, label#label_WARN {", "\t\t\t\tcolor: #999900;", "\t\t\t}", "", "\t\t\tdiv#log *.ERROR, label#label_ERROR {", "\t\t\t\tcolor: red;", "\t\t\t}", "", "\t\t\tdiv#log *.FATAL, label#label_FATAL {", "\t\t\t\tcolor: #660066;", "\t\t\t}", "", "\t\t\tdiv.TRACE#log *.TRACE,", "\t\t\tdiv.DEBUG#log *.DEBUG,", "\t\t\tdiv.INFO#log *.INFO,", "\t\t\tdiv.WARN#log *.WARN,", "\t\t\tdiv.ERROR#log *.ERROR,", "\t\t\tdiv.FATAL#log *.FATAL {", "\t\t\t\tdisplay: block;", "\t\t\t}", "", "\t\t\tdiv#log div.separator {", "\t\t\t\tbackground-color: #cccccc;", "\t\t\t\tmargin: 5px 0;", "\t\t\t\tline-height: 1px;", "\t\t\t}", "\t\t</style>", "\t</head>", "", '\t<body id="body">', '\t\t<div id="switchesContainer">', '\t\t\t<div id="switches">', '\t\t\t\t<div id="levels" class="toolbar">', "\t\t\t\t\tFilters:", '\t\t\t\t\t<input type="checkbox" id="switch_TRACE" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide trace messages" /><label for="switch_TRACE" id="label_TRACE">trace</label>', '\t\t\t\t\t<input type="checkbox" id="switch_DEBUG" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide debug messages" /><label for="switch_DEBUG" id="label_DEBUG">debug</label>', '\t\t\t\t\t<input type="checkbox" id="switch_INFO" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide info messages" /><label for="switch_INFO" id="label_INFO">info</label>', '\t\t\t\t\t<input type="checkbox" id="switch_WARN" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide warn messages" /><label for="switch_WARN" id="label_WARN">warn</label>', '\t\t\t\t\t<input type="checkbox" id="switch_ERROR" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide error messages" /><label for="switch_ERROR" id="label_ERROR">error</label>', '\t\t\t\t\t<input type="checkbox" id="switch_FATAL" onclick="applyFilters(); checkAllLevels()" checked="checked" title="Show/hide fatal messages" /><label for="switch_FATAL" id="label_FATAL">fatal</label>', '\t\t\t\t\t<input type="checkbox" id="switch_ALL" onclick="toggleAllLevels(); applyFilters()" checked="checked" title="Show/hide all messages" /><label for="switch_ALL" id="label_ALL">all</label>', "\t\t\t\t</div>", '\t\t\t\t<div id="search" class="toolbar">', '\t\t\t\t\t<label for="searchBox" class="searchboxlabel">Search:</label> <input type="text" id="searchBox" onclick="toggleSearchEnabled(true)" onkeyup="scheduleSearch()" size="20" />', '\t\t\t\t\t<input type="button" id="searchReset" disabled="disabled" value="Reset" onclick="clearSearch()" class="button" title="Reset the search" />', '\t\t\t\t\t<input type="checkbox" id="searchRegex" onclick="doSearch()" title="If checked, search is treated as a regular expression" /><label for="searchRegex">Regex</label>', '\t\t\t\t\t<input type="checkbox" id="searchCaseSensitive" onclick="doSearch()" title="If checked, search is case sensitive" /><label for="searchCaseSensitive">Match case</label>', '\t\t\t\t\t<input type="checkbox" id="searchDisable" onclick="toggleSearchEnabled()" title="Enable/disable search" /><label for="searchDisable" class="alwaysenabled">Disable</label>', '\t\t\t\t\t<div id="searchNav">', '\t\t\t\t\t\t<input type="button" id="searchNext" disabled="disabled" value="Next" onclick="searchNext()" class="button" title="Go to the next matching log entry" />', '\t\t\t\t\t\t<input type="button" id="searchPrevious" disabled="disabled" value="Previous" onclick="searchPrevious()" class="button" title="Go to the previous matching log entry" />', '\t\t\t\t\t\t<input type="checkbox" id="searchFilter" onclick="toggleSearchFilter()" title="If checked, non-matching log entries are filtered out" /><label for="searchFilter">Filter</label>', '\t\t\t\t\t\t<input type="checkbox" id="searchHighlight" onclick="toggleSearchHighlight()" title="Highlight matched search terms" /><label for="searchHighlight" class="alwaysenabled">Highlight all</label>', "\t\t\t\t\t</div>", "\t\t\t\t</div>", '\t\t\t\t<div id="options" class="toolbar">', "\t\t\t\t\tOptions:", '\t\t\t\t\t<input type="checkbox" id="enableLogging" onclick="toggleLoggingEnabled()" checked="checked" title="Enable/disable logging" /><label for="enableLogging" id="enableLoggingLabel">Log</label>', '\t\t\t\t\t<input type="checkbox" id="wrap" onclick="toggleWrap()" title="Enable / disable word wrap" /><label for="wrap" id="wrapLabel">Wrap</label>', '\t\t\t\t\t<input type="checkbox" id="newestAtTop" onclick="toggleNewestAtTop()" title="If checked, causes newest messages to appear at the top" /><label for="newestAtTop" id="newestAtTopLabel">Newest at the top</label>', '\t\t\t\t\t<input type="checkbox" id="scrollToLatest" onclick="toggleScrollToLatest()" checked="checked" title="If checked, window automatically scrolls to a new message when it is added" /><label for="scrollToLatest" id="scrollToLatestLabel">Scroll to latest</label>', '\t\t\t\t\t<input type="button" id="clearButton" value="Clear" onclick="clearLog()" class="button" title="Clear all log messages"  />', '\t\t\t\t\t<input type="button" id="hideButton" value="Hide" onclick="hide()" class="hidden button" title="Hide the console" />', '\t\t\t\t\t<input type="button" id="closeButton" value="Close" onclick="closeWindow()" class="hidden button" title="Close the window" />', "\t\t\t\t</div>", "\t\t\t</div>", "\t\t</div>", '\t\t<div id="log" class="TRACE DEBUG INFO WARN ERROR FATAL"></div>', '\t\t<div id="commandLine" class="toolbar">', '\t\t\t<div id="commandLineContainer">', '\t\t\t\t<input type="text" id="command" title="Enter a JavaScript command here and hit return or press \'Evaluate\'" />', '\t\t\t\t<input type="button" id="evaluateButton" value="Evaluate" class="button" title="Evaluate the command" onclick="evalCommandLine()" />', "\t\t\t</div>", "\t\t</div>", "\t</body>", "</html>", ""];
			},
			d = [];
		ConsoleAppender = function() {};
		var e = 1;
		ConsoleAppender.prototype = new Appender, ConsoleAppender.prototype.create = function(a, b, f, g, h, i, j, k) {
			function l(a, b) {
				this.loggingEvent = a, this.levelName = a.level.name, this.formattedMessage = b
			}
			function m(a, b) {
				this.name = a, this.initiallyExpanded = b
			}
			function n() {}
			var o = this,
				p = !1,
				q = !1,
				r = !1,
				s = !1,
				t = [],
				u = !0,
				v = e++;
			g = extractBooleanFromParam(g, this.defaults.initiallyMinimized), f = extractBooleanFromParam(f, this.defaults.lazyInit), h = extractBooleanFromParam(h, this.defaults.useDocumentWrite);
			var w = this.defaults.newestMessageAtTop,
				x = this.defaults.scrollToLatestMessage;
			i = i ? i : this.defaults.width, j = j ? j : this.defaults.height;
			var y = this.defaults.maxMessages,
				z = this.defaults.showCommandLine,
				A = this.defaults.commandLineObjectExpansionDepth,
				B = this.defaults.showHideButton,
				C = this.defaults.showCloseButton;
			this.setLayout(this.defaults.layout);
			var D, E, F, G, H, I = a ? "InPageAppender" : "PopUpAppender",
				J = function(a) {
					return !q || (handleError(I + ": configuration option '" + a + "' may not be set after the appender has been initialized"), !1)
				},
				K = function() {
					return r && u && !s
				};
			this.isNewestMessageAtTop = function() {
				return w
			}, this.setNewestMessageAtTop = function(a) {
				w = bool(a), K() && G().setNewestAtTop(w)
			}, this.isScrollToLatestMessage = function() {
				return x
			}, this.setScrollToLatestMessage = function(a) {
				x = bool(a), K() && G().setScrollToLatest(x)
			}, this.getWidth = function() {
				return i
			}, this.setWidth = function(a) {
				J("width") && (i = extractStringFromParam(a, i))
			}, this.getHeight = function() {
				return j
			}, this.setHeight = function(a) {
				J("height") && (j = extractStringFromParam(a, j))
			}, this.getMaxMessages = function() {
				return y
			}, this.setMaxMessages = function(a) {
				y = extractIntFromParam(a, y), K() && G().setMaxMessages(y)
			}, this.isShowCommandLine = function() {
				return z
			}, this.setShowCommandLine = function(a) {
				z = bool(a), K() && G().setShowCommandLine(z)
			}, this.isShowHideButton = function() {
				return B
			}, this.setShowHideButton = function(a) {
				B = bool(a), K() && G().setShowHideButton(B)
			}, this.isShowCloseButton = function() {
				return C
			}, this.setShowCloseButton = function(a) {
				C = bool(a), K() && G().setShowCloseButton(C)
			}, this.getCommandLineObjectExpansionDepth = function() {
				return A
			}, this.setCommandLineObjectExpansionDepth = function(a) {
				A = extractIntFromParam(a, A)
			};
			var L = g;
			this.isInitiallyMinimized = function() {
				return g
			}, this.setInitiallyMinimized = function(a) {
				J("initiallyMinimized") && (g = bool(a), L = g)
			}, this.isUseDocumentWrite = function() {
				return h
			}, this.setUseDocumentWrite = function(a) {
				J("useDocumentWrite") && (h = bool(a))
			}, l.prototype.append = function() {
				G().log(this.levelName, this.formattedMessage)
			}, m.prototype.append = function() {
				G().group(this.name, this.initiallyExpanded)
			}, n.prototype.append = function() {
				G().groupEnd()
			};
			var M = function() {
					F(), p ? s && ba && E() : D(), F() && N()
				};
			this.append = function(a) {
				if (u) {
					var b = o.getLayout().formatWithException(a);
					t.push(new l(a, b)), M()
				}
			}, this.group = function(a, b) {
				u && (t.push(new m(a, b)), M())
			}, this.groupEnd = function() {
				u && (t.push(new n), M())
			};
			var N = function() {
					for (; t.length > 0;) t.shift().append();
					k && G().focus()
				};
			this.setAddedToLogger = function(a) {
				this.loggers.push(a), enabled && !f && D()
			}, this.clear = function() {
				K() && G().clearLog(), t.length = 0
			}, this.focus = function() {
				K() && G().focus()
			}, this.focusCommandLine = function() {
				K() && G().focusCommandLine()
			}, this.focusSearch = function() {
				K() && G().focusSearch()
			};
			var O = window;
			this.getCommandWindow = function() {
				return O
			}, this.setCommandWindow = function(a) {
				O = a
			}, this.executeLastCommand = function() {
				K() && G().evalLastCommand()
			};
			var P = new PatternLayout("%m");
			this.getCommandLayout = function() {
				return P
			}, this.setCommandLayout = function(a) {
				P = a
			}, this.evalCommandAndAppend = function(a) {
				var b = {
					appendResult: !0,
					isError: !1
				},
					c = "";
				try {
					var d, e;
					!O.eval && O.execScript && O.execScript("null");
					var f = {};
					for (e = 0, len = Q.length; e < len; e++) f[Q[e][0]] = Q[e][1];
					var g = [],
						h = function(a) {
							g.push([a, O[a]])
						};
					h("appender"), O.appender = o, h("commandReturnValue"), O.commandReturnValue = b, h("commandLineFunctionsHash"), O.commandLineFunctionsHash = f;
					var i = function(a) {
							h(a), O[a] = function() {
								return this.commandLineFunctionsHash[a](o, arguments, b)
							}
						};
					for (e = 0, len = Q.length; e < len; e++) i(Q[e][0]);
					for (O === window && O.execScript ? (h("evalExpr"), h("result"), window.evalExpr = a, O.execScript("window.result=eval(window.evalExpr);"), d = window.result) : d = O.eval(a), c = isUndefined(d) ? d : formatObjectExpansion(d, A), e = 0, len = g.length; e < len; e++) O[g[e][0]] = g[e][1]
				} catch (a) {
					c = "Error evaluating command: " + getExceptionStringRep(a), b.isError = !0
				}
				if (b.appendResult) {
					var j = ">>> " + a;
					isUndefined(c) || (j += newLine + c);
					var k = b.isError ? Level.ERROR : Level.INFO,
						l = new LoggingEvent(null, new Date, k, [j], null),
						m = this.getLayout();
					this.setLayout(P), this.append(l), this.setLayout(m)
				}
			};
			var Q = d.concat([]);
			this.addCommandLineFunction = function(a, b) {
				Q.push([a, b])
			};
			var R = "log4javascriptCommandHistory";
			this.storeCommandHistory = function(a) {
				setCookie(R, a.join(","))
			};
			var S = function(a) {
					var b = c();
					a.open();
					for (var d = 0, e = b.length; d < e; d++) a.writeln(b[d]);
					a.close()
				};
			this.setEventTypes(["load", "unload"]);
			var T = function() {
					var a = G();
					a.setAppender(o), a.setNewestAtTop(w), a.setScrollToLatest(x), a.setMaxMessages(y), a.setShowCommandLine(z), a.setShowHideButton(B), a.setShowCloseButton(C), a.setMainWindow(window);
					var b = getCookie(R);
					b && (a.commandHistory = b.split(","), a.currentCommandIndex = a.commandHistory.length), o.dispatchEvent("load", {
						win: a
					})
				};
			this.unload = function() {
				logLog.debug("unload " + this + ", caller: " + this.unload.caller), s || (logLog.debug("really doing unload " + this), s = !0, r = !1, q = !1, o.dispatchEvent("unload", {}))
			};
			var U = function(a, b, c, d) {
					function e() {
						try {
							s && clearInterval(f), a(G()) && (clearInterval(f), c())
						} catch (a) {
							clearInterval(f), u = !1, handleError(d, a)
						}
					}
					var f = setInterval(e, b)
				},
				V = function() {
					var a = document.domain != location.hostname;
					return h ? "" : getBaseUrl() + "console_uncompressed.html" + (a ? "?log4javascript_domain=" + escape(document.domain) : "")
				};
			if (a) {
				var W = null,
					X = [];
				this.addCssProperty = function(a, b) {
					J("cssProperties") && X.push([a, b])
				};
				var Y, Z = !1,
					$ = uniqueId + "_InPageAppender_" + v;
				this.hide = function() {
					p && q && (K() && G().$("command").blur(), Y.style.display = "none", L = !0)
				}, this.show = function() {
					p && (q ? (Y.style.display = "block", this.setShowCommandLine(z), L = !1) : Z || E(!0))
				}, this.isVisible = function() {
					return !L && !s
				}, this.close = function(a) {
					s || a && !confirm("This will permanently remove the console from the page. No more messages will be logged. Do you wish to continue?") || (Y.parentNode.removeChild(Y), this.unload())
				}, H = function() {
					function a() {
						try {
							g || o.show(), T(), r = !0, N()
						} catch (a) {
							u = !1, handleError(c, a)
						}
					}
					function b() {
						try {
							var b = function(a) {
									return isLoaded(a)
								};
							h && S(G().document), b(G()) ? a() : U(b, 100, a, c)
						} catch (a) {
							u = !1, handleError(c, a)
						}
					}
					var c = "InPageAppender.open: unable to create console iframe";
					L = !1, Y = W.appendChild(document.createElement("div")), Y.style.width = i, Y.style.height = j, Y.style.border = "solid gray 1px";
					for (var d = 0, e = X.length; d < e; d++) Y.style[X[d][0]] = X[d][1];
					var f = h ? "" : " src='" + V() + "'";
					Y.innerHTML = "<iframe id='" + $ + "' name='" + $ + "' width='100%' height='100%' frameborder='0'" + f + " scrolling='no'></iframe>", s = !1;
					var k = function(a) {
							try {
								return bool(a) && bool(a.document)
							} catch (a) {
								return !1
							}
						};
					k(G()) ? b() : U(k, 100, b, c), q = !0
				}, E = function(a) {
					if (a || !g) {
						var c = function() {
								if (b) try {
									var a = document.getElementById(b);
									1 == a.nodeType && (W = a), H()
								} catch (a) {
									handleError("InPageAppender.init: invalid container element '" + b + "' supplied", a)
								} else W = document.createElement("div"), W.style.position = "fixed", W.style.left = "0", W.style.right = "0", W.style.bottom = "0", document.body.appendChild(W), o.addCssProperty("borderWidth", "1px 0 0 0"), o.addCssProperty("zIndex", 1e6), H()
							};
						pageLoaded && b && b.appendChild ? (W = b, H()) : pageLoaded ? c() : log4javascript.addEventListener("load", c), Z = !0
					}
				}, D = function() {
					E(), p = !0
				}, G = function() {
					var a = window.frames[$];
					if (a) return a
				}, F = function() {
					return !(!u || s) && (q && !r && G() && isLoaded(G()) && (r = !0), r)
				}
			} else {
				var _ = o.defaults.useOldPopUp,
					aa = o.defaults.complainAboutPopUpBlocking,
					ba = this.defaults.reopenWhenClosed;
				this.isUseOldPopUp = function() {
					return _
				}, this.setUseOldPopUp = function(a) {
					J("useOldPopUp") && (_ = bool(a))
				}, this.isComplainAboutPopUpBlocking = function() {
					return aa
				}, this.setComplainAboutPopUpBlocking = function(a) {
					J("complainAboutPopUpBlocking") && (aa = bool(a))
				}, this.isFocusPopUp = function() {
					return k
				}, this.setFocusPopUp = function(a) {
					k = bool(a)
				}, this.isReopenWhenClosed = function() {
					return ba
				}, this.setReopenWhenClosed = function(a) {
					ba = bool(a)
				}, this.close = function() {
					logLog.debug("close " + this);
					try {
						ca.close(), this.unload()
					} catch (a) {}
				}, this.hide = function() {
					logLog.debug("hide " + this), K() && this.close()
				}, this.show = function() {
					logLog.debug("show " + this), q || H()
				}, this.isVisible = function() {
					return F()
				};
				var ca;
				H = function() {
					function a() {
						G().setCloseIfOpenerCloses(!_ || !h), T(), r = !0, N(), U(f, 500, g, "PopUpAppender.checkPopUpClosed: error checking pop-up window")
					}
					var b = "width=" + i + ",height=" + j + ",status,resizable",
						c = "";
					try {
						var d = window.frameElement;
						d && (c = "_" + d.tagName + "_" + (d.name || d.id || ""))
					} catch (a) {
						c = "_inaccessibleParentFrame"
					}
					var e = "PopUp_" + location.host.replace(/[^a-z0-9]/gi, "_") + "_" + v + c;
					_ && h || (e = e + "_" + uniqueId);
					var f = function(a) {
							if (s) return !0;
							try {
								return bool(a) && a.closed
							} catch (a) {}
							return !1
						},
						g = function() {
							s || o.unload()
						};
					try {
						if (ca = window.open(V(), e, b), s = !1, q = !0, ca && ca.document) if (h && _ && isLoaded(ca)) ca.mainPageReloaded(), a();
						else {
							h && S(ca.document);
							var k = function(a) {
									return bool(a) && isLoaded(a)
								};
							isLoaded(ca) ? a() : U(k, 100, a, "PopUpAppender.init: unable to create console window")
						} else u = !1, logLog.warn("PopUpAppender.init: pop-ups blocked, please unblock to use PopUpAppender"), aa && handleError("log4javascript: pop-up windows appear to be blocked. Please unblock them to use pop-up logging.")
					} catch (a) {
						handleError("PopUpAppender.init: error creating pop-up", a)
					}
				}, E = function() {
					g || H()
				}, D = function() {
					E(), p = !0
				}, G = function() {
					return ca
				}, F = function() {
					if (u && !isUndefined(ca) && !s) {
						if (ca.closed || r && isUndefined(ca.closed)) return o.unload(), logLog.debug("PopUpAppender: pop-up closed"), !1;
						!r && isLoaded(ca) && (r = !0)
					}
					return u && r && !s
				}
			}
			this.getConsoleWindow = G
		}, ConsoleAppender.addGlobalCommandLineFunction = function(a, b) {
			d.push([a, b])
		}, a.prototype = new ConsoleAppender, a.prototype.defaults = {
			layout: new PatternLayout("%d{HH:mm:ss} %-5p - %m{1}%n"),
			initiallyMinimized: !1,
			focusPopUp: !1,
			lazyInit: !0,
			useOldPopUp: !0,
			complainAboutPopUpBlocking: !0,
			newestMessageAtTop: !1,
			scrollToLatestMessage: !0,
			width: "600",
			height: "400",
			reopenWhenClosed: !1,
			maxMessages: null,
			showCommandLine: !0,
			commandLineObjectExpansionDepth: 1,
			showHideButton: !1,
			showCloseButton: !0,
			useDocumentWrite: !0
		}, a.prototype.toString = function() {
			return "PopUpAppender"
		}, log4javascript.PopUpAppender = a, b.prototype = new ConsoleAppender, b.prototype.defaults = {
			layout: new PatternLayout("%d{HH:mm:ss} %-5p - %m{1}%n"),
			initiallyMinimized: !1,
			lazyInit: !0,
			newestMessageAtTop: !1,
			scrollToLatestMessage: !0,
			width: "100%",
			height: "220px",
			maxMessages: null,
			showCommandLine: !0,
			commandLineObjectExpansionDepth: 1,
			showHideButton: !1,
			showCloseButton: !1,
			showLogEntryDeleteButtons: !0,
			useDocumentWrite: !0
		}, b.prototype.toString = function() {
			return "InPageAppender"
		}, log4javascript.InPageAppender = b, log4javascript.InlineAppender = b
	}(), function() {
		function a(a) {
			var b = 0;
			for (var c in a) b = Math.max(toStr(c).length, b);
			var d = [];
			for (c in a) {
				var e, f = "  " + padWithSpaces(toStr(c), b + 2);
				try {
					e = splitIntoLines(toStr(a[c])).join(padWithSpaces(newLine, b + 6))
				} catch (a) {
					e = "[Error obtaining property. Details: " + getExceptionMessage(a) + "]"
				}
				d.push(f + e)
			}
			return d.join(newLine)
		}
		function b(a, c, d, i, j) {
			function k(a) {
				return a.nodeType == e.TEXT_NODE && /^[ \t\r\n]*$/.test(a.nodeValue)
			}
			function l(a) {
				return a.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
			}
			function m(a) {
				for (var b = a.style.cssText.split(";"), c = "", d = 0, e = b.length; d < e; d++) {
					var f = b[d].split(":"),
						g = [];
					/^\s*$/.test(f[0]) || g.push(trim(f[0]).toLowerCase() + ":" + trim(f[1])), c = g.join(";")
				}
				return c
			}
			function n(a) {
				if (a.prefix) return a.prefix;
				if (a.outerHTML) {
					var b = new RegExp("<([^:]+):" + a.tagName + "[^>]*>", "i");
					if (b.test(a.outerHTML)) return RegExp.$1.toLowerCase()
				}
				return ""
			}
			c = "undefined" == typeof c || !! c, "string" != typeof d && (d = ""), i = !! i, j = !! j;
			var o, p, q, r = "<",
				s = ">";
			if (!c || a.nodeType == e.DOCUMENT_FRAGMENT_NODE) {
				for (o = "", p = 0, q = a.childNodes.length; p < q; p++) o += b(a.childNodes[p], !0, d + h);
				return o
			}
			switch (a.nodeType) {
			case e.ELEMENT_NODE:
				var t = a.tagName.toLowerCase();
				o = i ? newLine + d : "", o += r;
				var u = n(a),
					v = !! u;
				for (v && (o += u + ":"), o += t, p = 0, q = a.attributes.length; p < q; p++) {
					var w = a.attributes[p];
					w.specified && null !== w.nodeValue && "style" !== w.nodeName.toLowerCase() && "string" == typeof w.nodeValue && 0 !== w.nodeName.indexOf("_moz") && (o += " " + w.nodeName.toLowerCase() + '="', o += l(w.nodeValue), o += '"')
				}
				if (a.style.cssText) {
					var x = m(a);
					"" !== x && (o += ' style="' + m(a) + '"')
				}
				if (array_contains(g, t) || v && !a.hasChildNodes()) o += "/" + s;
				else {
					o += s;
					var y = !(1 === a.childNodes.length && a.childNodes[0].nodeType === e.TEXT_NODE),
						z = array_contains(f, t);
					for (p = 0, q = a.childNodes.length; p < q; p++) o += b(a.childNodes[p], !0, d + h, y, z);
					var A = r + "/" + t + s;
					o += y ? newLine + d + A : A
				}
				return o;
			case e.TEXT_NODE:
				if (k(a)) o = "";
				else {
					if (j) o = a.nodeValue;
					else {
						var B = splitIntoLines(trim(a.nodeValue)),
							C = [];
						for (p = 0, q = B.length; p < q; p++) C[p] = trim(B[p]);
						o = C.join(newLine + d)
					}
					i && (o = newLine + d + o)
				}
				return o;
			case e.CDATA_SECTION_NODE:
				return "<![CDATA[" + a.nodeValue + "]]>" + newLine;
			case e.DOCUMENT_NODE:
				for (o = "", p = 0, q = a.childNodes.length; p < q; p++) o += b(a.childNodes[p], !0, d);
				return o;
			default:
				return ""
			}
		}
		function c() {
			ConsoleAppender.addGlobalCommandLineFunction("$", function(a, b, c) {
				return document.getElementById(b[0])
			}), ConsoleAppender.addGlobalCommandLineFunction("dir", function(b, c, d) {
				for (var e = [], f = 0, g = c.length; f < g; f++) e[f] = a(c[f]);
				return e.join(newLine + newLine)
			}), ConsoleAppender.addGlobalCommandLineFunction("dirxml", function(a, c, d) {
				for (var e = [], f = 0, g = c.length; f < g; f++) e[f] = b(c[f]);
				return e.join(newLine + newLine)
			}), ConsoleAppender.addGlobalCommandLineFunction("cd", function(a, b, c) {
				var d, e;
				return 0 === b.length || "" === b[0] ? (d = window, e = "Command line set to run in main window") : b[0].window == b[0] ? (d = b[0], e = "Command line set to run in frame '" + b[0].name + "'") : (d = window.frames[b[0]], d ? e = "Command line set to run in frame '" + b[0] + "'" : (c.isError = !0, e = "Frame '" + b[0] + "' does not exist", d = a.getCommandWindow())), a.setCommandWindow(d), e
			}), ConsoleAppender.addGlobalCommandLineFunction("clear", function(a, b, c) {
				c.appendResult = !1, a.clear()
			}), ConsoleAppender.addGlobalCommandLineFunction("keys", function(a, b, c) {
				var d = [];
				for (var e in b[0]) d.push(e);
				return d
			}), ConsoleAppender.addGlobalCommandLineFunction("values", function(a, b, c) {
				var d = [];
				for (var e in b[0]) try {
					d.push(b[0][e])
				} catch (a) {
					logLog.warn("values(): Unable to obtain value for key " + e + ". Details: " + getExceptionMessage(a))
				}
				return d
			}), ConsoleAppender.addGlobalCommandLineFunction("expansionDepth", function(a, b, c) {
				var d = parseInt(b[0], 10);
				return isNaN(d) || d < 0 ? (c.isError = !0, "" + b[0] + " is not a valid expansion depth") : (a.setCommandLineObjectExpansionDepth(d), "Object expansion depth set to " + d)
			})
		}
		function d() {
			c()
		}
		var e = {
			ELEMENT_NODE: 1,
			ATTRIBUTE_NODE: 2,
			TEXT_NODE: 3,
			CDATA_SECTION_NODE: 4,
			ENTITY_REFERENCE_NODE: 5,
			ENTITY_NODE: 6,
			PROCESSING_INSTRUCTION_NODE: 7,
			COMMENT_NODE: 8,
			DOCUMENT_NODE: 9,
			DOCUMENT_TYPE_NODE: 10,
			DOCUMENT_FRAGMENT_NODE: 11,
			NOTATION_NODE: 12
		},
			f = ["script", "pre"],
			g = ["br", "img", "hr", "param", "link", "area", "input", "col", "base", "meta"],
			h = "  ";
		d()
	}(), log4javascript.setDocumentReady = function() {
		pageLoaded = !0, log4javascript.dispatchEvent("load", {})
	}, window.addEventListener) window.addEventListener("load", log4javascript.setDocumentReady, !1);
	else if (window.attachEvent) window.attachEvent("onload", log4javascript.setDocumentReady);
	else {
		var oldOnload = window.onload;
		"function" != typeof window.onload ? window.onload = log4javascript.setDocumentReady : window.onload = function(a) {
			oldOnload && oldOnload(a), log4javascript.setDocumentReady()
		}
	}
	return log4javascript
}, this), function(a, b) {
	"function" == typeof define && define.amd ? define(["bytebuffer"], b) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = b(require("bytebuffer"), !0) : (a.dcodeIO = a.dcodeIO || {}).ProtoBuf = b(a.dcodeIO.ByteBuffer)
}(this, function(a, b) {
	"use strict";
	var c = {};
	return c.ByteBuffer = a, c.Long = a.Long || null, c.VERSION = "5.0.1", c.WIRE_TYPES = {}, c.WIRE_TYPES.VARINT = 0, c.WIRE_TYPES.BITS64 = 1, c.WIRE_TYPES.LDELIM = 2, c.WIRE_TYPES.STARTGROUP = 3, c.WIRE_TYPES.ENDGROUP = 4, c.WIRE_TYPES.BITS32 = 5, c.PACKABLE_WIRE_TYPES = [c.WIRE_TYPES.VARINT, c.WIRE_TYPES.BITS64, c.WIRE_TYPES.BITS32], c.TYPES = {
		int32: {
			name: "int32",
			wireType: c.WIRE_TYPES.VARINT,
			defaultValue: 0
		},
		uint32: {
			name: "uint32",
			wireType: c.WIRE_TYPES.VARINT,
			defaultValue: 0
		},
		sint32: {
			name: "sint32",
			wireType: c.WIRE_TYPES.VARINT,
			defaultValue: 0
		},
		int64: {
			name: "int64",
			wireType: c.WIRE_TYPES.VARINT,
			defaultValue: c.Long ? c.Long.ZERO : void 0
		},
		uint64: {
			name: "uint64",
			wireType: c.WIRE_TYPES.VARINT,
			defaultValue: c.Long ? c.Long.UZERO : void 0
		},
		sint64: {
			name: "sint64",
			wireType: c.WIRE_TYPES.VARINT,
			defaultValue: c.Long ? c.Long.ZERO : void 0
		},
		bool: {
			name: "bool",
			wireType: c.WIRE_TYPES.VARINT,
			defaultValue: !1
		},
		double: {
			name: "double",
			wireType: c.WIRE_TYPES.BITS64,
			defaultValue: 0
		},
		string: {
			name: "string",
			wireType: c.WIRE_TYPES.LDELIM,
			defaultValue: ""
		},
		bytes: {
			name: "bytes",
			wireType: c.WIRE_TYPES.LDELIM,
			defaultValue: null
		},
		fixed32: {
			name: "fixed32",
			wireType: c.WIRE_TYPES.BITS32,
			defaultValue: 0
		},
		sfixed32: {
			name: "sfixed32",
			wireType: c.WIRE_TYPES.BITS32,
			defaultValue: 0
		},
		fixed64: {
			name: "fixed64",
			wireType: c.WIRE_TYPES.BITS64,
			defaultValue: c.Long ? c.Long.UZERO : void 0
		},
		sfixed64: {
			name: "sfixed64",
			wireType: c.WIRE_TYPES.BITS64,
			defaultValue: c.Long ? c.Long.ZERO : void 0
		},
		float: {
			name: "float",
			wireType: c.WIRE_TYPES.BITS32,
			defaultValue: 0
		},
		enum: {
			name: "enum",
			wireType: c.WIRE_TYPES.VARINT,
			defaultValue: 0
		},
		message: {
			name: "message",
			wireType: c.WIRE_TYPES.LDELIM,
			defaultValue: null
		},
		group: {
			name: "group",
			wireType: c.WIRE_TYPES.STARTGROUP,
			defaultValue: null
		}
	}, c.MAP_KEY_TYPES = [c.TYPES.int32, c.TYPES.sint32, c.TYPES.sfixed32, c.TYPES.uint32, c.TYPES.fixed32, c.TYPES.int64, c.TYPES.sint64, c.TYPES.sfixed64, c.TYPES.uint64, c.TYPES.fixed64, c.TYPES.bool, c.TYPES.string, c.TYPES.bytes], c.ID_MIN = 1, c.ID_MAX = 536870911, c.convertFieldsToCamelCase = !1, c.populateAccessors = !0, c.populateDefaults = !0, c.Util = function() {
		var a = {};
		return a.IS_NODE = !("object" != typeof process || process + "" != "[object process]" || process.browser), a.XHR = function() {
			for (var a = [function() {
				return new XMLHttpRequest
			}, function() {
				return new ActiveXObject("Msxml2.XMLHTTP")
			}, function() {
				return new ActiveXObject("Msxml3.XMLHTTP")
			}, function() {
				return new ActiveXObject("Microsoft.XMLHTTP")
			}], b = null, c = 0; c < a.length; c++) {
				try {
					b = a[c]()
				} catch (a) {
					continue
				}
				break
			}
			if (!b) throw Error("XMLHttpRequest is not supported");
			return b
		}, a.fetch = function(b, c) {
			if (c && "function" != typeof c && (c = null), a.IS_NODE) {
				var d = require("fs");
				if (c) d.readFile(b, function(a, b) {
					c(a ? null : "" + b)
				});
				else try {
					return d.readFileSync(b)
				} catch (a) {
					return null
				}
			} else {
				var e = a.XHR();
				if (e.open("GET", b, !! c), e.setRequestHeader("Accept", "text/plain"), "function" == typeof e.overrideMimeType && e.overrideMimeType("text/plain"), !c) return e.send(null), 200 == e.status || 0 == e.status && "string" == typeof e.responseText ? e.responseText : null;
				if (e.onreadystatechange = function() {
					4 == e.readyState && c(200 == e.status || 0 == e.status && "string" == typeof e.responseText ? e.responseText : null)
				}, 4 == e.readyState) return;
				e.send(null)
			}
		}, a.toCamelCase = function(a) {
			return a.replace(/_([a-zA-Z])/g, function(a, b) {
				return b.toUpperCase()
			})
		}, a
	}(), c.Lang = {
		DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
		RULE: /^(?:required|optional|repeated|map)$/,
		TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
		NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
		TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
		TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
		FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
		NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
		NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
		NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
		NUMBER_OCT: /^0[0-7]+$/,
		NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
		BOOL: /^(?:true|false)$/i,
		ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
		NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
		WHITESPACE: /\s/,
		STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
		STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
		STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
	}, c.DotProto = function(a, b) {
		function c(a, c) {
			var d = -1,
				e = 1;
			if ("-" == a.charAt(0) && (e = -1, a = a.substring(1)), b.NUMBER_DEC.test(a)) d = parseInt(a);
			else if (b.NUMBER_HEX.test(a)) d = parseInt(a.substring(2), 16);
			else {
				if (!b.NUMBER_OCT.test(a)) throw Error("illegal id value: " + (e < 0 ? "-" : "") + a);
				d = parseInt(a.substring(1), 8)
			}
			if (d = e * d | 0, !c && d < 0) throw Error("illegal id value: " + (e < 0 ? "-" : "") + a);
			return d
		}
		function d(a) {
			var c = 1;
			if ("-" == a.charAt(0) && (c = -1, a = a.substring(1)), b.NUMBER_DEC.test(a)) return c * parseInt(a, 10);
			if (b.NUMBER_HEX.test(a)) return c * parseInt(a.substring(2), 16);
			if (b.NUMBER_OCT.test(a)) return c * parseInt(a.substring(1), 8);
			if ("inf" === a) return c * (1 / 0);
			if ("nan" === a) return NaN;
			if (b.NUMBER_FLT.test(a)) return c * parseFloat(a);
			throw Error("illegal number value: " + (c < 0 ? "-" : "") + a)
		}
		function e(a, b, c) {
			"undefined" == typeof a[b] ? a[b] = c : (Array.isArray(a[b]) || (a[b] = [a[b]]), a[b].push(c))
		}
		var f = {},
			g = function(a) {
				this.source = a + "", this.index = 0, this.line = 1, this.stack = [], this._stringOpen = null
			},
			h = g.prototype;
		h._readString = function() {
			var a = '"' === this._stringOpen ? b.STRING_DQ : b.STRING_SQ;
			a.lastIndex = this.index - 1;
			var c = a.exec(this.source);
			if (!c) throw Error("unterminated string");
			return this.index = a.lastIndex, this.stack.push(this._stringOpen), this._stringOpen = null, c[1]
		}, h.next = function() {
			if (this.stack.length > 0) return this.stack.shift();
			if (this.index >= this.source.length) return null;
			if (null !== this._stringOpen) return this._readString();
			var a, c, d;
			do {
				for (a = !1; b.WHITESPACE.test(d = this.source.charAt(this.index));) if ("\n" === d && ++this.line, ++this.index === this.source.length) return null;
				if ("/" === this.source.charAt(this.index)) if (++this.index, "/" === this.source.charAt(this.index)) {
					for (;
					"\n" !== this.source.charAt(++this.index);) if (this.index == this.source.length) return null;
					++this.index, ++this.line, a = !0
				} else {
					if ("*" !== (d = this.source.charAt(this.index))) return "/";
					do {
						if ("\n" === d && ++this.line, ++this.index === this.source.length) return null;
						c = d, d = this.source.charAt(this.index)
					} while ("*" !== c || "/" !== d);
					++this.index, a = !0
				}
			} while (a);
			if (this.index === this.source.length) return null;
			var e = this.index;
			b.DELIM.lastIndex = 0;
			var f = b.DELIM.test(this.source.charAt(e++));
			if (!f) for (; e < this.source.length && !b.DELIM.test(this.source.charAt(e));)++e;
			var g = this.source.substring(this.index, this.index = e);
			return '"' !== g && "'" !== g || (this._stringOpen = g), g
		}, h.peek = function() {
			if (0 === this.stack.length) {
				var a = this.next();
				if (null === a) return null;
				this.stack.push(a)
			}
			return this.stack[0]
		}, h.skip = function(a) {
			var b = this.next();
			if (b !== a) throw Error("illegal '" + b + "', '" + a + "' expected")
		}, h.omit = function(a) {
			return this.peek() === a && (this.next(), !0)
		}, h.toString = function() {
			return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")"
		}, f.Tokenizer = g;
		var i = function(a) {
				this.tn = new g(a), this.proto3 = !1
			},
			j = i.prototype;
		return j.parse = function() {
			var a, c, d = {
				name: "[ROOT]",
				package: null,
				messages: [],
				enums: [],
				imports: [],
				options: {},
				services: []
			},
				e = !0;
			try {
				for (; a = this.tn.next();) switch (a) {
				case "package":
					if (!e || null !== d.package) throw Error("unexpected 'package'");
					if (a = this.tn.next(), !b.TYPEREF.test(a)) throw Error("illegal package name: " + a);
					this.tn.skip(";"), d.package = a;
					break;
				case "import":
					if (!e) throw Error("unexpected 'import'");
					a = this.tn.peek(), ("public" === a || (c = "weak" === a)) && this.tn.next(), a = this._readString(), this.tn.skip(";"), c || d.imports.push(a);
					break;
				case "syntax":
					if (!e) throw Error("unexpected 'syntax'");
					this.tn.skip("="), "proto3" === (d.syntax = this._readString()) && (this.proto3 = !0), this.tn.skip(";");
					break;
				case "message":
					this._parseMessage(d, null), e = !1;
					break;
				case "enum":
					this._parseEnum(d), e = !1;
					break;
				case "option":
					this._parseOption(d);
					break;
				case "service":
					this._parseService(d);
					break;
				case "extend":
					this._parseExtend(d);
					break;
				default:
					throw Error("unexpected '" + a + "'")
				}
			} catch (a) {
				throw a.message = "Parse error at line " + this.tn.line + ": " + a.message, a
			}
			return delete d.name, d
		}, i.parse = function(a) {
			return new i(a).parse()
		}, j._readString = function() {
			var a, b, c = "";
			do {
				if (b = this.tn.next(), "'" !== b && '"' !== b) throw Error("illegal string delimiter: " + b);
				c += this.tn.next(), this.tn.skip(b), a = this.tn.peek()
			} while ('"' === a || '"' === a);
			return c
		}, j._readValue = function(a) {
			var c = this.tn.peek();
			if ('"' === c || "'" === c) return this._readString();
			if (this.tn.next(), b.NUMBER.test(c)) return d(c);
			if (b.BOOL.test(c)) return "true" === c.toLowerCase();
			if (a && b.TYPEREF.test(c)) return c;
			throw Error("illegal value: " + c)
		}, j._parseOption = function(a, c) {
			var d = this.tn.next(),
				e = !1;
			if ("(" === d && (e = !0, d = this.tn.next()), !b.TYPEREF.test(d)) throw Error("illegal option name: " + d);
			var f = d;
			e && (this.tn.skip(")"), f = "(" + f + ")", d = this.tn.peek(), b.FQTYPEREF.test(d) && (f += d, this.tn.next())), this.tn.skip("="), this._parseOptionValue(a, f), c || this.tn.skip(";")
		}, j._parseOptionValue = function(a, c) {
			var d = this.tn.peek();
			if ("{" !== d) e(a.options, c, this._readValue(!0));
			else for (this.tn.skip("{");
			"}" !== (d = this.tn.next());) {
				if (!b.NAME.test(d)) throw Error("illegal option name: " + c + "." + d);
				this.tn.omit(":") ? e(a.options, c + "." + d, this._readValue(!0)) : this._parseOptionValue(a, c + "." + d)
			}
		}, j._parseService = function(a) {
			var c = this.tn.next();
			if (!b.NAME.test(c)) throw Error("illegal service name at line " + this.tn.line + ": " + c);
			var d = c,
				e = {
					name: d,
					rpc: {},
					options: {}
				};
			for (this.tn.skip("{");
			"}" !== (c = this.tn.next());) if ("option" === c) this._parseOption(e);
			else {
				if ("rpc" !== c) throw Error("illegal service token: " + c);
				this._parseServiceRPC(e)
			}
			this.tn.omit(";"), a.services.push(e)
		}, j._parseServiceRPC = function(a) {
			var c = "rpc",
				d = this.tn.next();
			if (!b.NAME.test(d)) throw Error("illegal rpc service method name: " + d);
			var e = d,
				f = {
					request: null,
					response: null,
					request_stream: !1,
					response_stream: !1,
					options: {}
				};
			if (this.tn.skip("("), d = this.tn.next(), "stream" === d.toLowerCase() && (f.request_stream = !0, d = this.tn.next()), !b.TYPEREF.test(d)) throw Error("illegal rpc service request type: " + d);
			if (f.request = d, this.tn.skip(")"), d = this.tn.next(), "returns" !== d.toLowerCase()) throw Error("illegal rpc service request type delimiter: " + d);
			if (this.tn.skip("("), d = this.tn.next(), "stream" === d.toLowerCase() && (f.response_stream = !0, d = this.tn.next()), f.response = d, this.tn.skip(")"), d = this.tn.peek(), "{" === d) {
				for (this.tn.next();
				"}" !== (d = this.tn.next());) {
					if ("option" !== d) throw Error("illegal rpc service token: " + d);
					this._parseOption(f)
				}
				this.tn.omit(";")
			} else this.tn.skip(";");
			"undefined" == typeof a[c] && (a[c] = {}), a[c][e] = f
		}, j._parseMessage = function(a, d) {
			var e = !! d,
				f = this.tn.next(),
				g = {
					name: "",
					fields: [],
					enums: [],
					messages: [],
					options: {},
					services: [],
					oneofs: {}
				};
			if (!b.NAME.test(f)) throw Error("illegal " + (e ? "group" : "message") + " name: " + f);
			for (g.name = f, e && (this.tn.skip("="), d.id = c(this.tn.next()), g.isGroup = !0), f = this.tn.peek(), "[" === f && d && this._parseFieldOptions(d), this.tn.skip("{");
			"}" !== (f = this.tn.next());) if (b.RULE.test(f)) this._parseMessageField(g, f);
			else if ("oneof" === f) this._parseMessageOneOf(g);
			else if ("enum" === f) this._parseEnum(g);
			else if ("message" === f) this._parseMessage(g);
			else if ("option" === f) this._parseOption(g);
			else if ("service" === f) this._parseService(g);
			else if ("extensions" === f) g.extensions = this._parseExtensionRanges();
			else if ("reserved" === f) this._parseIgnored();
			else if ("extend" === f) this._parseExtend(g);
			else {
				if (!b.TYPEREF.test(f)) throw Error("illegal message token: " + f);
				if (!this.proto3) throw Error("illegal field rule: " + f);
				this._parseMessageField(g, "optional", f)
			}
			return this.tn.omit(";"), a.messages.push(g), g
		}, j._parseIgnored = function() {
			for (;
			";" !== this.tn.peek();) this.tn.next();
			this.tn.skip(";")
		}, j._parseMessageField = function(a, d, e) {
			if (!b.RULE.test(d)) throw Error("illegal message field rule: " + d);
			var f, g = {
				rule: d,
				type: "",
				name: "",
				options: {},
				id: 0
			};
			if ("map" === d) {
				if (e) throw Error("illegal type: " + e);
				if (this.tn.skip("<"), f = this.tn.next(), !b.TYPE.test(f) && !b.TYPEREF.test(f)) throw Error("illegal message field type: " + f);
				if (g.keytype = f, this.tn.skip(","), f = this.tn.next(), !b.TYPE.test(f) && !b.TYPEREF.test(f)) throw Error("illegal message field: " + f);
				if (g.type = f, this.tn.skip(">"), f = this.tn.next(), !b.NAME.test(f)) throw Error("illegal message field name: " + f);
				g.name = f, this.tn.skip("="), g.id = c(this.tn.next()), f = this.tn.peek(), "[" === f && this._parseFieldOptions(g), this.tn.skip(";")
			} else if (e = "undefined" != typeof e ? e : this.tn.next(), "group" === e) {
				var h = this._parseMessage(a, g);
				if (!/^[A-Z]/.test(h.name)) throw Error("illegal group name: " + h.name);
				g.type = h.name, g.name = h.name.toLowerCase(), this.tn.omit(";")
			} else {
				if (!b.TYPE.test(e) && !b.TYPEREF.test(e)) throw Error("illegal message field type: " + e);
				if (g.type = e, f = this.tn.next(), !b.NAME.test(f)) throw Error("illegal message field name: " + f);
				g.name = f, this.tn.skip("="), g.id = c(this.tn.next()), f = this.tn.peek(), "[" === f && this._parseFieldOptions(g), this.tn.skip(";")
			}
			return a.fields.push(g), g
		}, j._parseMessageOneOf = function(a) {
			var c = this.tn.next();
			if (!b.NAME.test(c)) throw Error("illegal oneof name: " + c);
			var d, e = c,
				f = [];
			for (this.tn.skip("{");
			"}" !== (c = this.tn.next());) d = this._parseMessageField(a, "optional", c), d.oneof = e, f.push(d.id);
			this.tn.omit(";"), a.oneofs[e] = f
		}, j._parseFieldOptions = function(a) {
			this.tn.skip("[");
			for (var b, c = !0;
			"]" !== (b = this.tn.peek());) c || this.tn.skip(","), this._parseOption(a, !0), c = !1;
			this.tn.next()
		}, j._parseEnum = function(a) {
			var d = {
				name: "",
				values: [],
				options: {}
			},
				e = this.tn.next();
			if (!b.NAME.test(e)) throw Error("illegal name: " + e);
			for (d.name = e, this.tn.skip("{");
			"}" !== (e = this.tn.next());) if ("option" === e) this._parseOption(d);
			else {
				if (!b.NAME.test(e)) throw Error("illegal name: " + e);
				this.tn.skip("=");
				var f = {
					name: e,
					id: c(this.tn.next(), !0)
				};
				e = this.tn.peek(), "[" === e && this._parseFieldOptions({
					options: {}
				}), this.tn.skip(";"), d.values.push(f)
			}
			this.tn.omit(";"), a.enums.push(d)
		}, j._parseExtensionRanges = function() {
			var b, c, e, f = [];
			do {
				for (c = [];;) {
					switch (b = this.tn.next()) {
					case "min":
						e = a.ID_MIN;
						break;
					case "max":
						e = a.ID_MAX;
						break;
					default:
						e = d(b)
					}
					if (c.push(e), 2 === c.length) break;
					if ("to" !== this.tn.peek()) {
						c.push(e);
						break
					}
					this.tn.next()
				}
				f.push(c)
			} while (this.tn.omit(","));
			return this.tn.skip(";"), f
		}, j._parseExtend = function(a) {
			var c = this.tn.next();
			if (!b.TYPEREF.test(c)) throw Error("illegal extend reference: " + c);
			var d = {
				ref: c,
				fields: []
			};
			for (this.tn.skip("{");
			"}" !== (c = this.tn.next());) if (b.RULE.test(c)) this._parseMessageField(d, c);
			else {
				if (!b.TYPEREF.test(c)) throw Error("illegal extend token: " + c);
				if (!this.proto3) throw Error("illegal field rule: " + c);
				this._parseMessageField(d, "optional", c)
			}
			return this.tn.omit(";"), a.messages.push(d), d
		}, j.toString = function() {
			return "Parser at line " + this.tn.line
		}, f.Parser = i, f
	}(c, c.Lang), c.Reflect = function(b) {
		function c(c) {
			if ("string" == typeof c && (c = b.TYPES[c]), "undefined" == typeof c.defaultValue) throw Error("default value for type " + c.name + " is not supported");
			return c == b.TYPES.bytes ? new a(0) : c.defaultValue
		}
		function d(a, c) {
			if (a && "number" == typeof a.low && "number" == typeof a.high && "boolean" == typeof a.unsigned && a.low === a.low && a.high === a.high) return new b.Long(a.low, a.high, "undefined" == typeof c ? a.unsigned : c);
			if ("string" == typeof a) return b.Long.fromString(a, c || !1, 10);
			if ("number" == typeof a) return b.Long.fromNumber(a, c || !1);
			throw Error("not convertible to Long")
		}
		function e(a, c) {
			var d = c.readVarint32(),
				f = 7 & d,
				g = d >>> 3;
			switch (f) {
			case b.WIRE_TYPES.VARINT:
				do d = c.readUint8();
				while (128 === (128 & d));
				break;
			case b.WIRE_TYPES.BITS64:
				c.offset += 8;
				break;
			case b.WIRE_TYPES.LDELIM:
				d = c.readVarint32(), c.offset += d;
				break;
			case b.WIRE_TYPES.STARTGROUP:
				e(g, c);
				break;
			case b.WIRE_TYPES.ENDGROUP:
				if (g === a) return !1;
				throw Error("Illegal GROUPEND after unknown group: " + g + " (" + a + " expected)");
			case b.WIRE_TYPES.BITS32:
				c.offset += 4;
				break;
			default:
				throw Error("Illegal wire type in unknown group " + a + ": " + f)
			}
			return !0
		}
		var f = {},
			g = function(a, b, c) {
				this.builder = a, this.parent = b, this.name = c, this.className
			},
			h = g.prototype;
		h.fqn = function() {
			for (var a = this.name, b = this;;) {
				if (b = b.parent, null == b) break;
				a = b.name + "." + a
			}
			return a
		}, h.toString = function(a) {
			return (a ? this.className + " " : "") + this.fqn()
		}, h.build = function() {
			throw Error(this.toString(!0) + " cannot be built directly")
		}, f.T = g;
		var i = function(a, b, c, d, e) {
				g.call(this, a, b, c), this.className = "Namespace", this.children = [], this.options = d || {}, this.syntax = e || "proto2"
			};
		try {
			var j = i.prototype = Object.create(g.prototype)
		} catch (a) {
			var j = ""
		}
		j.getChildren = function(a) {
			if (a = a || null, null == a) return this.children.slice();
			for (var b = [], c = 0, d = this.children.length; c < d; ++c) this.children[c] instanceof a && b.push(this.children[c]);
			return b
		}, j.addChild = function(a) {
			var b;
			if (b = this.getChild(a.name)) if (b instanceof m.Field && b.name !== b.originalName && null === this.getChild(b.originalName)) b.name = b.originalName;
			else {
				if (!(a instanceof m.Field && a.name !== a.originalName && null === this.getChild(a.originalName))) throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + a.name);
				a.name = a.originalName
			}
			this.children.push(a)
		}, j.getChild = function(a) {
			for (var b = "number" == typeof a ? "id" : "name", c = 0, d = this.children.length; c < d; ++c) if (this.children[c][b] === a) return this.children[c];
			return null
		}, j.resolve = function(a, b) {
			var c = "string" == typeof a ? a.split(".") : a,
				d = this,
				e = 0;
			if ("" === c[e]) {
				for (; null !== d.parent;) d = d.parent;
				e++
			}
			var g;
			do {
				do {
					if (!(d instanceof f.Namespace)) {
						d = null;
						break
					}
					if (g = d.getChild(c[e]), !g || !(g instanceof f.T) || b && !(g instanceof f.Namespace)) {
						d = null;
						break
					}
					d = g, e++
				} while (e < c.length);
				if (null != d) break;
				if (null !== this.parent) return this.parent.resolve(a, b)
			} while (null != d);
			return d
		}, j.qn = function(a) {
			var b = [],
				c = a;
			do b.unshift(c.name), c = c.parent;
			while (null !== c);
			for (var d = 1; d <= b.length; d++) {
				var e = b.slice(b.length - d);
				if (a === this.resolve(e, a instanceof f.Namespace)) return e.join(".")
			}
			return a.fqn()
		}, j.build = function() {
			for (var a, b = {}, c = this.children, d = 0, e = c.length; d < e; ++d) a = c[d], a instanceof i && (b[a.name] = a.build());
			return Object.defineProperty && Object.defineProperty(b, "$options", {
				value: this.buildOpt()
			}), b
		}, j.buildOpt = function() {
			for (var a = {}, b = Object.keys(this.options), c = 0, d = b.length; c < d; ++c) {
				var e = b[c],
					f = this.options[b[c]];
				a[e] = f
			}
			return a
		}, j.getOption = function(a) {
			return "undefined" == typeof a ? this.options : "undefined" != typeof this.options[a] ? this.options[a] : null
		}, f.Namespace = i;
		var k = function(a, c, d, e) {
				if (this.type = a, this.resolvedType = c, this.isMapKey = d, this.syntax = e, d && b.MAP_KEY_TYPES.indexOf(a) < 0) throw Error("Invalid map key type: " + a.name)
			},
			l = k.prototype;
		k.defaultFieldValue = c, l.verifyValue = function(c) {
			function e(a, b) {
				throw Error("Illegal value for " + f.toString(!0) + " of type " + f.type.name + ": " + a + " (" + b + ")")
			}
			var f = this;
			switch (this.type) {
			case b.TYPES.int32:
			case b.TYPES.sint32:
			case b.TYPES.sfixed32:
				return ("number" != typeof c || c === c && c % 1 !== 0) && e(typeof c, "not an integer"), c > 4294967295 ? 0 | c : c;
			case b.TYPES.uint32:
			case b.TYPES.fixed32:
				return ("number" != typeof c || c === c && c % 1 !== 0) && e(typeof c, "not an integer"), c < 0 ? c >>> 0 : c;
			case b.TYPES.int64:
			case b.TYPES.sint64:
			case b.TYPES.sfixed64:
				if (b.Long) try {
					return d(c, !1)
				} catch (a) {
					e(typeof c, a.message)
				} else e(typeof c, "requires Long.js");
			case b.TYPES.uint64:
			case b.TYPES.fixed64:
				if (b.Long) try {
					return d(c, !0)
				} catch (a) {
					e(typeof c, a.message)
				} else e(typeof c, "requires Long.js");
			case b.TYPES.bool:
				return "boolean" != typeof c && e(typeof c, "not a boolean"), c;
			case b.TYPES.float:
			case b.TYPES.double:
				return "number" != typeof c && e(typeof c, "not a number"), c;
			case b.TYPES.string:
				return "string" == typeof c || c && c instanceof String || e(typeof c, "not a string"), "" + c;
			case b.TYPES.bytes:
				return a.isByteBuffer(c) ? c : a.wrap(c, "base64");
			case b.TYPES.enum:
				var g = this.resolvedType.getChildren(b.Reflect.Enum.Value);
				for (i = 0; i < g.length; i++) {
					if (g[i].name == c) return g[i].id;
					if (g[i].id == c) return g[i].id
				}
				if ("proto3" === this.syntax) return ("number" != typeof c || c === c && c % 1 !== 0) && e(typeof c, "not an integer"), (c > 4294967295 || c < 0) && e(typeof c, "not in range for uint32"), c;
				e(c, "not a valid enum value");
			case b.TYPES.group:
			case b.TYPES.message:
				if (c && "object" == typeof c || e(typeof c, "object expected"), c instanceof this.resolvedType.clazz) return c;
				if (c instanceof b.Builder.Message) {
					var h = {};
					for (var i in c) c.hasOwnProperty(i) && (h[i] = c[i]);
					c = h
				}
				return new this.resolvedType.clazz(c)
			}
			throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + c + " (undefined type " + this.type + ")")
		}, l.calculateLength = function(c, d) {
			if (null === d) return 0;
			var e;
			switch (this.type) {
			case b.TYPES.int32:
				return d < 0 ? a.calculateVarint64(d) : a.calculateVarint32(d);
			case b.TYPES.uint32:
				return a.calculateVarint32(d);
			case b.TYPES.sint32:
				return a.calculateVarint32(a.zigZagEncode32(d));
			case b.TYPES.fixed32:
			case b.TYPES.sfixed32:
			case b.TYPES.float:
				return 4;
			case b.TYPES.int64:
			case b.TYPES.uint64:
				return a.calculateVarint64(d);
			case b.TYPES.sint64:
				return a.calculateVarint64(a.zigZagEncode64(d));
			case b.TYPES.fixed64:
			case b.TYPES.sfixed64:
				return 8;
			case b.TYPES.bool:
				return 1;
			case b.TYPES.enum:
				return a.calculateVarint32(d);
			case b.TYPES.double:
				return 8;
			case b.TYPES.string:
				return e = a.calculateUTF8Bytes(d), a.calculateVarint32(e) + e;
			case b.TYPES.bytes:
				if (d.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + d.remaining() + " bytes remaining");
				return a.calculateVarint32(d.remaining()) + d.remaining();
			case b.TYPES.message:
				return e = this.resolvedType.calculate(d), a.calculateVarint32(e) + e;
			case b.TYPES.group:
				return e = this.resolvedType.calculate(d), e + a.calculateVarint32(c << 3 | b.WIRE_TYPES.ENDGROUP)
			}
			throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + d + " (unknown type)")
		}, l.encodeValue = function(c, d, e) {
			if (null === d) return e;
			switch (this.type) {
			case b.TYPES.int32:
				d < 0 ? e.writeVarint64(d) : e.writeVarint32(d);
				break;
			case b.TYPES.uint32:
				e.writeVarint32(d);
				break;
			case b.TYPES.sint32:
				e.writeVarint32ZigZag(d);
				break;
			case b.TYPES.fixed32:
				e.writeUint32(d);
				break;
			case b.TYPES.sfixed32:
				e.writeInt32(d);
				break;
			case b.TYPES.int64:
			case b.TYPES.uint64:
				e.writeVarint64(d);
				break;
			case b.TYPES.sint64:
				e.writeVarint64ZigZag(d);
				break;
			case b.TYPES.fixed64:
				e.writeUint64(d);
				break;
			case b.TYPES.sfixed64:
				e.writeInt64(d);
				break;
			case b.TYPES.bool:
				"string" == typeof d ? e.writeVarint32("false" === d.toLowerCase() ? 0 : !! d) : e.writeVarint32(d ? 1 : 0);
				break;
			case b.TYPES.enum:
				e.writeVarint32(d);
				break;
			case b.TYPES.float:
				e.writeFloat32(d);
				break;
			case b.TYPES.double:
				e.writeFloat64(d);
				break;
			case b.TYPES.string:
				e.writeVString(d);
				break;
			case b.TYPES.bytes:
				if (d.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + d.remaining() + " bytes remaining");
				var f = d.offset;
				e.writeVarint32(d.remaining()), e.append(d), d.offset = f;
				break;
			case b.TYPES.message:
				var g = (new a).LE();
				this.resolvedType.encode(d, g), e.writeVarint32(g.offset), e.append(g.flip());
				break;
			case b.TYPES.group:
				this.resolvedType.encode(d, e), e.writeVarint32(c << 3 | b.WIRE_TYPES.ENDGROUP);
				break;
			default:
				throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + d + " (unknown type)")
			}
			return e
		}, l.decode = function(a, c, d) {
			if (c != this.type.wireType) throw Error("Unexpected wire type for element");
			var e, f;
			switch (this.type) {
			case b.TYPES.int32:
				return 0 | a.readVarint32();
			case b.TYPES.uint32:
				return a.readVarint32() >>> 0;
			case b.TYPES.sint32:
				return 0 | a.readVarint32ZigZag();
			case b.TYPES.fixed32:
				return a.readUint32() >>> 0;
			case b.TYPES.sfixed32:
				return 0 | a.readInt32();
			case b.TYPES.int64:
				return a.readVarint64();
			case b.TYPES.uint64:
				return a.readVarint64().toUnsigned();
			case b.TYPES.sint64:
				return a.readVarint64ZigZag();
			case b.TYPES.fixed64:
				return a.readUint64();
			case b.TYPES.sfixed64:
				return a.readInt64();
			case b.TYPES.bool:
				return !!a.readVarint32();
			case b.TYPES.enum:
				return a.readVarint32();
			case b.TYPES.float:
				return a.readFloat();
			case b.TYPES.double:
				return a.readDouble();
			case b.TYPES.string:
				return a.readVString();
			case b.TYPES.bytes:
				if (f = a.readVarint32(), a.remaining() < f) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + f + " required but got only " + a.remaining());
				return e = a.clone(), e.limit = e.offset + f, a.offset += f, e;
			case b.TYPES.message:
				return f = a.readVarint32(), this.resolvedType.decode(a, f);
			case b.TYPES.group:
				return this.resolvedType.decode(a, -1, d)
			}
			throw Error("[INTERNAL] Illegal decode type")
		}, l.valueFromString = function(c) {
			if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
			switch (this.type) {
			case b.TYPES.int32:
			case b.TYPES.sint32:
			case b.TYPES.sfixed32:
			case b.TYPES.uint32:
			case b.TYPES.fixed32:
				return this.verifyValue(parseInt(c));
			case b.TYPES.int64:
			case b.TYPES.sint64:
			case b.TYPES.sfixed64:
			case b.TYPES.uint64:
			case b.TYPES.fixed64:
				return this.verifyValue(c);
			case b.TYPES.bool:
				return "true" === c;
			case b.TYPES.string:
				return this.verifyValue(c);
			case b.TYPES.bytes:
				return a.fromBinary(c)
			}
		}, l.valueToString = function(a) {
			if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
			return this.type === b.TYPES.bytes ? a.toString("binary") : a.toString()
		}, f.Element = k;
		var m = function(a, b, c, d, e, f) {
				i.call(this, a, b, c, d, f), this.className = "Message", this.extensions = void 0, this.clazz = null, this.isGroup = !! e, this._fields = null, this._fieldsById = null, this._fieldsByName = null
			};
		try {
			var n = m.prototype = Object.create(i.prototype)
		} catch (a) {
			var n = ""
		}
		n.build = function(c) {
			if (this.clazz && !c) return this.clazz;
			var d = function(b, c) {
					function d(c, e, f, g) {
						if (null === c || "object" != typeof c) {
							if (g && g instanceof b.Reflect.Enum) {
								var h = b.Reflect.Enum.getName(g.object, c);
								if (null !== h) return h
							}
							return c
						}
						if (a.isByteBuffer(c)) return e ? c.toBase64() : c.toBuffer();
						if (b.Long.isLong(c)) return f ? c.toString() : b.Long.fromValue(c);
						var i;
						if (Array.isArray(c)) return i = [], c.forEach(function(a, b) {
							i[b] = d(a, e, f, g)
						}), i;
						if (i = {}, c instanceof b.Map) {
							for (var j = c.entries(), k = j.next(); !k.done; k = j.next()) i[c.keyElem.valueToString(k.value[0])] = d(k.value[1], e, f, c.valueElem.resolvedType);
							return i
						}
						var l = c.$type,
							m = void 0;
						for (var n in c) c.hasOwnProperty(n) && (l && (m = l.getChild(n)) ? i[n] = d(c[n], e, f, m.resolvedType) : i[n] = d(c[n], e, f));
						return i
					}
					var e = c.getChildren(b.Reflect.Message.Field),
						f = c.getChildren(b.Reflect.Message.OneOf),
						g = function(d, h) {
							b.Builder.Message.call(this);
							for (var i = 0, j = f.length; i < j; ++i) this[f[i].name] = null;
							for (i = 0, j = e.length; i < j; ++i) {
								var k = e[i];
								this[k.name] = k.repeated ? [] : k.map ? new b.Map(k) : null, !k.required && "proto3" !== c.syntax || null === k.defaultValue || (this[k.name] = k.defaultValue)
							}
							if (arguments.length > 0) {
								var l;
								if (1 !== arguments.length || null === d || "object" != typeof d || !("function" != typeof d.encode || d instanceof g) || Array.isArray(d) || d instanceof b.Map || a.isByteBuffer(d) || d instanceof ArrayBuffer || b.Long && d instanceof b.Long) for (i = 0, j = arguments.length; i < j; ++i)"undefined" != typeof(l = arguments[i]) && this.$set(e[i].name, l);
								else this.$set(d)
							}
						};
					try {
						var h = g.prototype = Object.create(b.Builder.Message.prototype)
					} catch (a) {
						var h = ""
					}
					h.add = function(a, d, e) {
						var f = c._fieldsByName[a];
						if (!e) {
							if (!f) throw Error(this + "#" + a + " is undefined");
							if (!(f instanceof b.Reflect.Message.Field)) throw Error(this + "#" + a + " is not a field: " + f.toString(!0));
							if (!f.repeated) throw Error(this + "#" + a + " is not a repeated field");
							d = f.verifyValue(d, !0)
						}
						return null === this[a] && (this[a] = []), this[a].push(d), this
					}, h.$add = h.add, h.set = function(a, d, e) {
						if (a && "object" == typeof a) {
							e = d;
							for (var f in a) a.hasOwnProperty(f) && "undefined" != typeof(d = a[f]) && this.$set(f, d, e);
							return this
						}
						var g = c._fieldsByName[a];
						if (e) this[a] = d;
						else {
							if (!g) throw Error(this + "#" + a + " is not a field: undefined");
							if (!(g instanceof b.Reflect.Message.Field)) throw Error(this + "#" + a + " is not a field: " + g.toString(!0));
							this[g.name] = d = g.verifyValue(d)
						}
						if (g && g.oneof) {
							var h = this[g.oneof.name];
							null !== d ? (null !== h && h !== g.name && (this[h] = null), this[g.oneof.name] = g.name) : h === a && (this[g.oneof.name] = null)
						}
						return this
					}, h.$set = h.set, h.get = function(a, d) {
						if (d) return this[a];
						var e = c._fieldsByName[a];
						if (!(e && e instanceof b.Reflect.Message.Field)) throw Error(this + "#" + a + " is not a field: undefined");
						if (!(e instanceof b.Reflect.Message.Field)) throw Error(this + "#" + a + " is not a field: " + e.toString(!0));
						return this[e.name]
					}, h.$get = h.get;
					for (var i = 0; i < e.length; i++) {
						var j = e[i];
						j instanceof b.Reflect.Message.ExtensionField || c.builder.options.populateAccessors &&
						function(a) {
							var b = a.originalName.replace(/(_[a-zA-Z])/g, function(a) {
								return a.toUpperCase().replace("_", "")
							});
							b = b.substring(0, 1).toUpperCase() + b.substring(1);
							var d = a.originalName.replace(/([A-Z])/g, function(a) {
								return "_" + a
							}),
								e = function(b, c) {
									return this[a.name] = c ? b : a.verifyValue(b), this
								},
								f = function() {
									return this[a.name]
								};
							null === c.getChild("set" + b) && (h["set" + b] = e), null === c.getChild("set_" + d) && (h["set_" + d] = e), null === c.getChild("get" + b) && (h["get" + b] = f), null === c.getChild("get_" + d) && (h["get_" + d] = f)
						}(j)
					}
					h.encode = function(b, d) {
						"boolean" == typeof b && (d = b, b = void 0);
						var e = !1;
						b || (b = new a, e = !0);
						var f = b.littleEndian;
						try {
							return c.encode(this, b.LE(), d), (e ? b.flip() : b).LE(f)
						} catch (a) {
							throw b.LE(f), a
						}
					}, g.encode = function(a, b, c) {
						return new g(a).encode(b, c)
					}, h.calculate = function() {
						return c.calculate(this)
					}, h.encodeDelimited = function(b, d) {
						var e = !1;
						b || (b = new a, e = !0);
						var f = (new a).LE();
						return c.encode(this, f, d).flip(), b.writeVarint32(f.remaining()), b.append(f), e ? b.flip() : b
					}, h.encodeAB = function() {
						try {
							return this.encode().toArrayBuffer()
						} catch (a) {
							throw a.encoded && (a.encoded = a.encoded.toArrayBuffer()), a
						}
					}, h.toArrayBuffer = h.encodeAB, h.encodeNB = function() {
						try {
							return this.encode().toBuffer()
						} catch (a) {
							throw a.encoded && (a.encoded = a.encoded.toBuffer()), a
						}
					}, h.toBuffer = h.encodeNB, h.encode64 = function() {
						try {
							return this.encode().toBase64()
						} catch (a) {
							throw a.encoded && (a.encoded = a.encoded.toBase64()), a
						}
					}, h.toBase64 = h.encode64, h.encodeHex = function() {
						try {
							return this.encode().toHex()
						} catch (a) {
							throw a.encoded && (a.encoded = a.encoded.toHex()), a
						}
					}, h.toHex = h.encodeHex, h.toRaw = function(a, b) {
						return d(this, !! a, !! b, this.$type)
					}, h.encodeJSON = function() {
						return JSON.stringify(d(this, !0, !0, this.$type))
					}, g.decode = function(b, d, e) {
						"string" == typeof d && (e = d, d = -1), "string" == typeof b && (b = a.wrap(b, e ? e : "base64")), b = a.isByteBuffer(b) ? b : a.wrap(b);
						var f = b.littleEndian;
						try {
							var g = c.decode(b.LE());
							return b.LE(f), g
						} catch (a) {
							throw b.LE(f), a
						}
					}, g.decodeDelimited = function(b, d) {
						if ("string" == typeof b && (b = a.wrap(b, d ? d : "base64")), b = a.isByteBuffer(b) ? b : a.wrap(b), b.remaining() < 1) return null;
						var e = b.offset,
							f = b.readVarint32();
						if (b.remaining() < f) return b.offset = e, null;
						try {
							var g = c.decode(b.slice(b.offset, b.offset + f).LE());
							return b.offset += f, g
						} catch (a) {
							throw b.offset += f, a
						}
					}, g.decode64 = function(a) {
						return g.decode(a, "base64")
					}, g.decodeHex = function(a) {
						return g.decode(a, "hex")
					}, g.decodeJSON = function(a) {
						return new g(JSON.parse(a))
					}, h.toString = function() {
						return c.toString()
					};
					return Object.defineProperty && (Object.defineProperty(g, "$options", {
						value: c.buildOpt()
					}), Object.defineProperty(h, "$options", {
						value: g.$options
					}), Object.defineProperty(g, "$type", {
						value: c
					}), Object.defineProperty(h, "$type", {
						value: c
					})), g
				}(b, this);
			this._fields = [], this._fieldsById = {}, this._fieldsByName = {};
			for (var e, f = 0, g = this.children.length; f < g; f++) if (e = this.children[f], e instanceof s || e instanceof m || e instanceof w) {
				if (d.hasOwnProperty(e.name)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + e.toString(!0) + " cannot override static property '" + e.name + "'");
				d[e.name] = e.build()
			} else if (e instanceof m.Field) e.build(), this._fields.push(e), this._fieldsById[e.id] = e, this._fieldsByName[e.name] = e;
			else if (!(e instanceof m.OneOf || e instanceof v)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[f].toString(!0));
			return this.clazz = d
		}, n.encode = function(a, b, c) {
			for (var d, e, f = null, g = 0, h = this._fields.length; g < h; ++g) d = this._fields[g], e = a[d.name], d.required && null === e ? null === f && (f = d) : d.encode(c ? e : d.verifyValue(e), b, a);
			if (null !== f) {
				var i = Error("Missing at least one required field for " + this.toString(!0) + ": " + f);
				throw i.encoded = b, i
			}
			return b
		}, n.calculate = function(a) {
			for (var b, c, d = 0, e = 0, f = this._fields.length; e < f; ++e) {
				if (b = this._fields[e], c = a[b.name], b.required && null === c) throw Error("Missing at least one required field for " + this.toString(!0) + ": " + b);
				d += b.calculate(c, a)
			}
			return d
		}, n.decode = function(a, c, d) {
			c = "number" == typeof c ? c : -1;
			for (var f, g, h, i, j = a.offset, k = new this.clazz; a.offset < j + c || c === -1 && a.remaining() > 0;) {
				if (f = a.readVarint32(), g = 7 & f, h = f >>> 3, g === b.WIRE_TYPES.ENDGROUP) {
					if (h !== d) throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + h + " (" + (d ? d + " expected" : "not a group") + ")");
					break
				}
				if (i = this._fieldsById[h]) {
					if (i.repeated && !i.options.packed) k[i.name].push(i.decode(g, a));
					else if (i.map) {
						var l = i.decode(g, a);
						k[i.name].set(l[0], l[1])
					} else if (k[i.name] = i.decode(g, a), i.oneof) {
						var m = k[i.oneof.name];
						null !== m && m !== i.name && (k[m] = null), k[i.oneof.name] = i.name
					}
				} else switch (g) {
				case b.WIRE_TYPES.VARINT:
					a.readVarint32();
					break;
				case b.WIRE_TYPES.BITS32:
					a.offset += 4;
					break;
				case b.WIRE_TYPES.BITS64:
					a.offset += 8;
					break;
				case b.WIRE_TYPES.LDELIM:
					var n = a.readVarint32();
					a.offset += n;
					break;
				case b.WIRE_TYPES.STARTGROUP:
					for (; e(h, a););
					break;
				default:
					throw Error("Illegal wire type for unknown field " + h + " in " + this.toString(!0) + "#decode: " + g)
				}
			}
			for (var o = 0, p = this._fields.length; o < p; ++o) if (i = this._fields[o], null === k[i.name]) if ("proto3" === this.syntax) k[i.name] = i.defaultValue;
			else {
				if (i.required) {
					var q = Error("Missing at least one required field for " + this.toString(!0) + ": " + i.name);
					throw q.decoded = k, q
				}
				b.populateDefaults && null !== i.defaultValue && (k[i.name] = i.defaultValue)
			}
			return k
		}, f.Message = m;
		var o = function(a, c, d, e, f, h, i, j, k, l) {
				g.call(this, a, c, h), this.className = "Message.Field", this.required = "required" === d, this.repeated = "repeated" === d, this.map = "map" === d, this.keyType = e || null, this.type = f, this.resolvedType = null, this.id = i, this.options = j || {}, this.defaultValue = null, this.oneof = k || null, this.syntax = l || "proto2", this.originalName = this.name, this.element = null, this.keyElement = null, !this.builder.options.convertFieldsToCamelCase || this instanceof m.ExtensionField || (this.name = b.Util.toCamelCase(this.name))
			};
		try {
			var p = o.prototype = Object.create(g.prototype)
		} catch (a) {
			var p = ""
		}
		p.build = function() {
			this.element = new k(this.type, this.resolvedType, !1, this.syntax), this.map && (this.keyElement = new k(this.keyType, void 0, !0, this.syntax)), "proto3" !== this.syntax || this.repeated || this.map ? "undefined" != typeof this.options.
		default &&(this.defaultValue = this.verifyValue(this.options.
		default)):
			this.defaultValue = k.defaultFieldValue(this.type)
		}, p.verifyValue = function(a, c) {
			function d(a, b) {
				throw Error("Illegal value for " + e.toString(!0) + " of type " + e.type.name + ": " + a + " (" + b + ")")
			}
			c = c || !1;
			var e = this;
			if (null === a) return this.required && d(typeof a, "required"), "proto3" === this.syntax && this.type !== b.TYPES.message && d(typeof a, "proto3 field without field presence cannot be null"), null;
			var f;
			if (this.repeated && !c) {
				Array.isArray(a) || (a = [a]);
				var g = [];
				for (f = 0; f < a.length; f++) g.push(this.element.verifyValue(a[f]));
				return g
			}
			return this.map && !c ? a instanceof b.Map ? a : (a instanceof Object || d(typeof a, "expected ProtoBuf.Map or raw object for map field"), new b.Map(this, a)) : (!this.repeated && Array.isArray(a) && d(typeof a, "no array expected"), this.element.verifyValue(a))
		}, p.hasWirePresence = function(a, c) {
			if ("proto3" !== this.syntax) return null !== a;
			if (this.oneof && c[this.oneof.name] === this.name) return !0;
			switch (this.type) {
			case b.TYPES.int32:
			case b.TYPES.sint32:
			case b.TYPES.sfixed32:
			case b.TYPES.uint32:
			case b.TYPES.fixed32:
				return 0 !== a;
			case b.TYPES.int64:
			case b.TYPES.sint64:
			case b.TYPES.sfixed64:
			case b.TYPES.uint64:
			case b.TYPES.fixed64:
				return 0 !== a.low || 0 !== a.high;
			case b.TYPES.bool:
				return a;
			case b.TYPES.float:
			case b.TYPES.double:
				return 0 !== a;
			case b.TYPES.string:
				return a.length > 0;
			case b.TYPES.bytes:
				return a.remaining() > 0;
			case b.TYPES.enum:
				return 0 !== a;
			case b.TYPES.message:
				return null !== a;
			default:
				return !0
			}
		}, p.encode = function(c, d, e) {
			if (null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
			if (null === c || this.repeated && 0 == c.length) return d;
			try {
				if (this.repeated) {
					var f;
					if (this.options.packed && b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
						d.writeVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM), d.ensureCapacity(d.offset += 1);
						var g = d.offset;
						for (f = 0; f < c.length; f++) this.element.encodeValue(this.id, c[f], d);
						var h = d.offset - g,
							i = a.calculateVarint32(h);
						if (i > 1) {
							var j = d.slice(g, d.offset);
							g += i - 1, d.offset = g, d.append(j)
						}
						d.writeVarint32(h, g - i)
					} else for (f = 0; f < c.length; f++) d.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, c[f], d)
				} else this.map ? c.forEach(function(c, e, f) {
					var g = a.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, e) + a.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, c);
					d.writeVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM), d.writeVarint32(g), d.writeVarint32(8 | this.keyType.wireType), this.keyElement.encodeValue(1, e, d), d.writeVarint32(16 | this.type.wireType), this.element.encodeValue(2, c, d)
				}, this) : this.hasWirePresence(c, e) && (d.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, c, d))
			} catch (a) {
				throw Error("Illegal value for " + this.toString(!0) + ": " + c + " (" + a + ")")
			}
			return d
		}, p.calculate = function(c, d) {
			if (c = this.verifyValue(c), null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
			if (null === c || this.repeated && 0 == c.length) return 0;
			var e = 0;
			try {
				if (this.repeated) {
					var f, g;
					if (this.options.packed && b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
						for (e += a.calculateVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM), g = 0, f = 0; f < c.length; f++) g += this.element.calculateLength(this.id, c[f]);
						e += a.calculateVarint32(g), e += g
					} else for (f = 0; f < c.length; f++) e += a.calculateVarint32(this.id << 3 | this.type.wireType), e += this.element.calculateLength(this.id, c[f])
				} else this.map ? c.forEach(function(c, d, f) {
					var g = a.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, d) + a.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, c);
					e += a.calculateVarint32(this.id << 3 | b.WIRE_TYPES.LDELIM), e += a.calculateVarint32(g), e += g
				}, this) : this.hasWirePresence(c, d) && (e += a.calculateVarint32(this.id << 3 | this.type.wireType), e += this.element.calculateLength(this.id, c))
			} catch (a) {
				throw Error("Illegal value for " + this.toString(!0) + ": " + c + " (" + a + ")")
			}
			return e
		}, p.decode = function(a, c, d) {
			var e, f, g = !this.map && a == this.type.wireType || !d && this.repeated && this.options.packed && a == b.WIRE_TYPES.LDELIM || this.map && a == b.WIRE_TYPES.LDELIM;
			if (!g) throw Error("Illegal wire type for field " + this.toString(!0) + ": " + a + " (" + this.type.wireType + " expected)");
			if (a == b.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && b.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !d) {
				f = c.readVarint32(), f = c.offset + f;
				for (var h = []; c.offset < f;) h.push(this.decode(this.type.wireType, c, !0));
				return h
			}
			if (this.map) {
				var i = k.defaultFieldValue(this.keyType);
				if (e = k.defaultFieldValue(this.type), f = c.readVarint32(), c.remaining() < f) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + f + " required but got only " + c.remaining());
				var j = c.clone();
				for (j.limit = j.offset + f, c.offset += f; j.remaining() > 0;) {
					var l = j.readVarint32();
					a = 7 & l;
					var m = l >>> 3;
					if (1 === m) i = this.keyElement.decode(j, a, m);
					else {
						if (2 !== m) throw Error("Unexpected tag in map field key/value submessage");
						e = this.element.decode(j, a, m)
					}
				}
				return [i, e]
			}
			return this.element.decode(c, a, this.id)
		}, f.Message.Field = o;
		var q = function(a, b, c, d, e, f, g) {
				o.call(this, a, b, c, null, d, e, f, g), this.extension
			};
		try {
			q.prototype = Object.create(o.prototype)
		} catch (a) {
			q.prototype = null
		}
		f.Message.ExtensionField = q;
		var r = function(a, b, c) {
				g.call(this, a, b, c), this.fields = []
			};
		f.Message.OneOf = r;
		var s = function(a, b, c, d, e) {
				i.call(this, a, b, c, d, e), this.className = "Enum", this.object = null
			};
		s.getName = function(a, b) {
			for (var c, d = Object.keys(a), e = 0; e < d.length; ++e) if (a[c = d[e]] === b) return c;
			return null
		};
		try {
			var t = s.prototype = Object.create(i.prototype)
		} catch (a) {
			var t = s.prototype = null
		}
		t && (t.build = function(a) {
			if (this.object && !a) return this.object;
			for (var c = new b.Builder.Enum, d = this.getChildren(s.Value), e = 0, f = d.length; e < f; ++e) c[d[e].name] = d[e].id;
			return Object.defineProperty && Object.defineProperty(c, "$options", {
				value: this.buildOpt(),
				enumerable: !1
			}), this.object = c
		}), f.Enum = s;
		var u = function(a, b, c, d) {
				g.call(this, a, b, c), this.className = "Enum.Value", this.id = d
			};
		try {
			u.prototype = Object.create(g.prototype)
		} catch (a) {
			u.prototype = null
		}
		f.Enum.Value = u;
		var v = function(a, b, c, d) {
				g.call(this, a, b, c), this.field = d
			};
		try {
			v.prototype = Object.create(g.prototype)
		} catch (a) {
			v.prototype = null
		}
		f.Extension = v;
		var w = function(a, b, c, d) {
				i.call(this, a, b, c, d), this.className = "Service", this.clazz = null
			};
		try {
			var x = w.prototype = Object.create(i.prototype)
		} catch (a) {
			var x = null
		}
		x && (x.build = function(c) {
			return this.clazz && !c ? this.clazz : this.clazz = function(b, c) {
				for (var d = function(a) {
						b.Builder.Service.call(this), this.rpcImpl = a ||
						function(a, b, c) {
							setTimeout(c.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0)
						}
					}, e = d.prototype = Object.create(b.Builder.Service.prototype), f = c.getChildren(b.Reflect.Service.RPCMethod), g = 0; g < f.length; g++)!
				function(b) {
					e[b.name] = function(d, e) {
						try {
							try {
								d = b.resolvedRequestType.clazz.decode(a.wrap(d))
							} catch (a) {
								if (!(a instanceof TypeError)) throw a
							}
							if (null === d || "object" != typeof d) throw Error("Illegal arguments");
							d instanceof b.resolvedRequestType.clazz || (d = new b.resolvedRequestType.clazz(d)), this.rpcImpl(b.fqn(), d, function(a, d) {
								if (a) return void e(a);
								null === d && (d = "");
								try {
									d = b.resolvedResponseType.clazz.decode(d)
								} catch (a) {}
								return d && d instanceof b.resolvedResponseType.clazz ? void e(null, d) : void e(Error("Illegal response type received in service method " + c.name + "#" + b.name))
							})
						} catch (a) {
							setTimeout(e.bind(this, a), 0)
						}
					}, d[b.name] = function(a, c, e) {
						new d(a)[b.name](c, e)
					}, Object.defineProperty && (Object.defineProperty(d[b.name], "$options", {
						value: b.buildOpt()
					}), Object.defineProperty(e[b.name], "$options", {
						value: d[b.name].$options
					}))
				}(f[g]);
				return Object.defineProperty && (Object.defineProperty(d, "$options", {
					value: c.buildOpt()
				}), Object.defineProperty(e, "$options", {
					value: d.$options
				}), Object.defineProperty(d, "$type", {
					value: c
				}), Object.defineProperty(e, "$type", {
					value: c
				})), d
			}(b, this)
		}), f.Service = w;
		var y = function(a, b, c, d) {
				g.call(this, a, b, c), this.className = "Service.Method", this.options = d || {}
			};
		try {
			var z = y.prototype = Object.create(g.prototype)
		} catch (a) {
			var z = null
		}
		z && (z.buildOpt = j.buildOpt), f.Service.Method = y;
		var A = function(a, b, c, d, e, f, g, h) {
				y.call(this, a, b, c, h), this.className = "Service.RPCMethod", this.requestName = d, this.responseName = e, this.requestStream = f, this.responseStream = g, this.resolvedRequestType = null, this.resolvedResponseType = null
			};
		try {
			A.prototype = Object.create(y.prototype)
		} catch (a) {
			A.prototype = null
		}
		return f.Service.RPCMethod = A, f
	}(c), c.Builder = function(a, b, c) {
		function d(a) {
			a.messages && a.messages.forEach(function(b) {
				b.syntax = a.syntax, d(b)
			}), a.enums && a.enums.forEach(function(b) {
				b.syntax = a.syntax
			})
		}
		var e = function(a) {
				this.ns = new c.Namespace(this, null, ""), this.ptr = this.ns, this.resolved = !1, this.result = null, this.files = {}, this.importRoot = null, this.options = a || {}
			},
			f = e.prototype;
		return e.isMessage = function(a) {
			return "string" == typeof a.name && ("undefined" == typeof a.values && "undefined" == typeof a.rpc)
		}, e.isMessageField = function(a) {
			return "string" == typeof a.rule && "string" == typeof a.name && "string" == typeof a.type && "undefined" != typeof a.id
		}, e.isEnum = function(a) {
			return "string" == typeof a.name && !("undefined" == typeof a.values || !Array.isArray(a.values) || 0 === a.values.length)
		}, e.isService = function(a) {
			return !("string" != typeof a.name || "object" != typeof a.rpc || !a.rpc)
		}, e.isExtend = function(a) {
			return "string" == typeof a.ref
		}, f.reset = function() {
			return this.ptr = this.ns, this
		}, f.define = function(a) {
			if ("string" != typeof a || !b.TYPEREF.test(a)) throw Error("illegal namespace: " + a);
			return a.split(".").forEach(function(a) {
				var b = this.ptr.getChild(a);
				null === b && this.ptr.addChild(b = new c.Namespace(this, this.ptr, a)), this.ptr = b
			}, this), this
		}, f.create = function(b) {
			if (!b) return this;
			if (Array.isArray(b)) {
				if (0 === b.length) return this;
				b = b.slice()
			} else b = [b];
			for (var d = [b]; d.length > 0;) {
				if (b = d.pop(), !Array.isArray(b)) throw Error("not a valid namespace: " + JSON.stringify(b));
				for (; b.length > 0;) {
					var f = b.shift();
					if (e.isMessage(f)) {
						var g = new c.Message(this, this.ptr, f.name, f.options, f.isGroup, f.syntax),
							h = {};
						f.oneofs && Object.keys(f.oneofs).forEach(function(a) {
							g.addChild(h[a] = new c.Message.OneOf(this, g, a))
						}, this), f.fields && f.fields.forEach(function(a) {
							if (null !== g.getChild(0 | a.id)) throw Error("duplicate or invalid field id in " + g.name + ": " + a.id);
							if (a.options && "object" != typeof a.options) throw Error("illegal field options in " + g.name + "#" + a.name);
							var b = null;
							if ("string" == typeof a.oneof && !(b = h[a.oneof])) throw Error("illegal oneof in " + g.name + "#" + a.name + ": " + a.oneof);
							a = new c.Message.Field(this, g, a.rule, a.keytype, a.type, a.name, a.id, a.options, b, f.syntax), b && b.fields.push(a), g.addChild(a)
						}, this);
						var i = [];
						if (f.enums && f.enums.forEach(function(a) {
							i.push(a)
						}), f.messages && f.messages.forEach(function(a) {
							i.push(a)
						}), f.services && f.services.forEach(function(a) {
							i.push(a)
						}), f.extensions && ("number" == typeof f.extensions[0] ? g.extensions = [f.extensions] : g.extensions = f.extensions), this.ptr.addChild(g), i.length > 0) {
							d.push(b), b = i, i = null, this.ptr = g, g = null;
							continue
						}
						i = null
					} else if (e.isEnum(f)) g = new c.Enum(this, this.ptr, f.name, f.options, f.syntax), f.values.forEach(function(a) {
						g.addChild(new c.Enum.Value(this, g, a.name, a.id))
					}, this), this.ptr.addChild(g);
					else if (e.isService(f)) g = new c.Service(this, this.ptr, f.name, f.options), Object.keys(f.rpc).forEach(function(a) {
						var b = f.rpc[a];
						g.addChild(new c.Service.RPCMethod(this, g, a, b.request, b.response, !! b.request_stream, !! b.response_stream, b.options))
					}, this), this.ptr.addChild(g);
					else {
						if (!e.isExtend(f)) throw Error("not a valid definition: " + JSON.stringify(f));
						if (g = this.ptr.resolve(f.ref, !0)) f.fields.forEach(function(b) {
							if (null !== g.getChild(0 | b.id)) throw Error("duplicate extended field id in " + g.name + ": " + b.id);
							if (g.extensions) {
								var d = !1;
								if (g.extensions.forEach(function(a) {
									b.id >= a[0] && b.id <= a[1] && (d = !0)
								}), !d) throw Error("illegal extended field id in " + g.name + ": " + b.id + " (not within valid ranges)")
							}
							var e = b.name;
							this.options.convertFieldsToCamelCase && (e = a.Util.toCamelCase(e));
							var f = new c.Message.ExtensionField(this, g, b.rule, b.type, this.ptr.fqn() + "." + e, b.id, b.options),
								h = new c.Extension(this, this.ptr, b.name, f);
							f.extension = h, this.ptr.addChild(h), g.addChild(f)
						}, this);
						else if (!/\.?google\.protobuf\./.test(f.ref)) throw Error("extended message " + f.ref + " is not defined")
					}
					f = null, g = null
				}
				b = null, this.ptr = this.ptr.parent
			}
			return this.resolved = !1, this.result = null, this
		}, f.import = function(b, c) {
			var e = "/";
			if ("string" == typeof c) {
				if (a.Util.IS_NODE && (c = require("path").resolve(c)), this.files[c] === !0) return this.reset();
				this.files[c] = !0
			} else if ("object" == typeof c) {
				var f = c.root;
				a.Util.IS_NODE && (f = require("path").resolve(f)), (f.indexOf("\\") >= 0 || c.file.indexOf("\\") >= 0) && (e = "\\");
				var g = f + e + c.file;
				if (this.files[g] === !0) return this.reset();
				this.files[g] = !0
			}
			if (b.imports && b.imports.length > 0) {
				var h, i = !1;
				"object" == typeof c ? (this.importRoot = c.root, i = !0, h = this.importRoot, c = c.file, (h.indexOf("\\") >= 0 || c.indexOf("\\") >= 0) && (e = "\\")) : "string" == typeof c ? this.importRoot ? h = this.importRoot : c.indexOf("/") >= 0 ? (h = c.replace(/\/[^\/]*$/, ""), "" === h && (h = "/")) : c.indexOf("\\") >= 0 ? (h = c.replace(/\\[^\\]*$/, ""), e = "\\") : h = "." : h = null;
				for (var j = 0; j < b.imports.length; j++) if ("string" == typeof b.imports[j]) {
					if (!h) throw Error("cannot determine import root");
					var k = b.imports[j];
					if ("google/protobuf/descriptor.proto" === k) continue;
					if (k = h + e + k, this.files[k] === !0) continue;
					/\.proto$/i.test(k) && !a.DotProto && (k = k.replace(/\.proto$/, ".json"));
					var l = a.Util.fetch(k);
					if (null === l) throw Error("failed to import '" + k + "' in '" + c + "': file not found");
					/\.json$/i.test(k) ? this.import(JSON.parse(l + ""), k) : this.import(a.DotProto.Parser.parse(l), k)
				} else c ? /\.(\w+)$/.test(c) ? this.import(b.imports[j], c.replace(/^(.+)\.(\w+)$/, function(a, b, c) {
					return b + "_import" + j + "." + c
				})) : this.import(b.imports[j], c + "_import" + j) : this.import(b.imports[j]);
				i && (this.importRoot = null)
			}
			b.package && this.define(b.package), b.syntax && d(b);
			var m = this.ptr;
			return b.options && Object.keys(b.options).forEach(function(a) {
				m.options[a] = b.options[a]
			}), b.messages && (this.create(b.messages), this.ptr = m), b.enums && (this.create(b.enums), this.ptr = m), b.services && (this.create(b.services), this.ptr = m), b.extends && this.create(b.extends), this.reset()
		}, f.resolveAll = function() {
			var d;
			if (null == this.ptr || "object" == typeof this.ptr.type) return this;
			if (this.ptr instanceof c.Namespace) this.ptr.children.forEach(function(a) {
				this.ptr = a, this.resolveAll()
			}, this);
			else if (this.ptr instanceof c.Message.Field) {
				if (b.TYPE.test(this.ptr.type)) this.ptr.type = a.TYPES[this.ptr.type];
				else {
					if (!b.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
					if (d = (this.ptr instanceof c.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0), !d) throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
					if (this.ptr.resolvedType = d, d instanceof c.Enum) {
						if (this.ptr.type = a.TYPES.enum, "proto3" === this.ptr.syntax && "proto3" !== d.syntax) throw Error("proto3 message cannot reference proto2 enum")
					} else {
						if (!(d instanceof c.Message)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
						this.ptr.type = d.isGroup ? a.TYPES.group : a.TYPES.message
					}
				}
				if (this.ptr.map) {
					if (!b.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);
					this.ptr.keyType = a.TYPES[this.ptr.keyType]
				}
			} else if (this.ptr instanceof a.Reflect.Service.Method) {
				if (!(this.ptr instanceof a.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(!0));
				if (d = this.ptr.parent.resolve(this.ptr.requestName, !0), !(d && d instanceof a.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
				if (this.ptr.resolvedRequestType = d, d = this.ptr.parent.resolve(this.ptr.responseName, !0), !(d && d instanceof a.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
				this.ptr.resolvedResponseType = d
			} else if (!(this.ptr instanceof a.Reflect.Message.OneOf || this.ptr instanceof a.Reflect.Extension || this.ptr instanceof a.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);
			return this.reset()
		}, f.build = function(a) {
			if (this.reset(), this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null), null === this.result && (this.result = this.ns.build()), !a) return this.result;
			for (var b = "string" == typeof a ? a.split(".") : a, c = this.result, d = 0; d < b.length; d++) {
				if (!c[b[d]]) {
					c = null;
					break
				}
				c = c[b[d]]
			}
			return c
		}, f.lookup = function(a, b) {
			return a ? this.ns.resolve(a, b) : this.ns
		}, f.toString = function() {
			return "Builder"
		}, e.Message = function() {}, e.Enum = function() {}, e.Service = function() {}, e
	}(c, c.Lang, c.Reflect), c.Map = function(a, b) {
		function c(a) {
			var b = 0;
			return {
				next: function() {
					return b < a.length ? {
						done: !1,
						value: a[b++]
					} : {
						done: !0
					}
				}
			}
		}
		var d = function(a, c) {
				if (!a.map) throw Error("field is not a map");
				if (this.field = a, this.keyElem = new b.Element(a.keyType, null, !0, a.syntax), this.valueElem = new b.Element(a.type, a.resolvedType, !1, a.syntax), this.map = {}, Object.defineProperty(this, "size", {
					get: function() {
						return Object.keys(this.map).length
					}
				}), c) for (var d = Object.keys(c), e = 0; e < d.length; e++) {
					var f = this.keyElem.valueFromString(d[e]),
						g = this.valueElem.verifyValue(c[d[e]]);
					this.map[this.keyElem.valueToString(f)] = {
						key: f,
						value: g
					}
				}
			},
			e = d.prototype;
		return e.clear = function() {
			this.map = {}
		}, e.delete = function(a) {
			var b = this.keyElem.valueToString(this.keyElem.verifyValue(a)),
				c = b in this.map;
			return delete this.map[b], c
		}, e.entries = function() {
			for (var a, b = [], d = Object.keys(this.map), e = 0; e < d.length; e++) b.push([(a = this.map[d[e]]).key, a.value]);
			return c(b)
		}, e.keys = function() {
			for (var a = [], b = Object.keys(this.map), d = 0; d < b.length; d++) a.push(this.map[b[d]].key);
			return c(a)
		}, e.values = function() {
			for (var a = [], b = Object.keys(this.map), d = 0; d < b.length; d++) a.push(this.map[b[d]].value);
			return c(a)
		}, e.forEach = function(a, b) {
			for (var c, d = Object.keys(this.map), e = 0; e < d.length; e++) a.call(b, (c = this.map[d[e]]).value, c.key, this)
		}, e.set = function(a, b) {
			var c = this.keyElem.verifyValue(a),
				d = this.valueElem.verifyValue(b);
			return this.map[this.keyElem.valueToString(c)] = {
				key: c,
				value: d
			}, this
		}, e.get = function(a) {
			var b = this.keyElem.valueToString(this.keyElem.verifyValue(a));
			if (b in this.map) return this.map[b].value
		}, e.has = function(a) {
			var b = this.keyElem.valueToString(this.keyElem.verifyValue(a));
			return b in this.map
		}, d
	}(c, c.Reflect), c.loadProto = function(a, b, d) {
		return ("string" == typeof b || b && "string" == typeof b.file && "string" == typeof b.root) && (d = b, b = void 0), c.loadJson(c.DotProto.Parser.parse(a), b, d)
	}, c.protoFromString = c.loadProto, c.loadProtoFile = function(a, b, d) {
		if (b && "object" == typeof b ? (d = b, b = null) : b && "function" == typeof b || (b = null), b) return c.Util.fetch("string" == typeof a ? a : a.root + "/" + a.file, function(e) {
			if (null === e) return void b(Error("Failed to fetch file"));
			try {
				b(null, c.loadProto(e, d, a))
			} catch (a) {
				b(a)
			}
		});
		var e = c.Util.fetch("object" == typeof a ? a.root + "/" + a.file : a);
		return null === e ? null : c.loadProto(e, d, a)
	}, c.protoFromFile = c.loadProtoFile, c.newBuilder = function(a) {
		return a = a || {}, "undefined" == typeof a.convertFieldsToCamelCase && (a.convertFieldsToCamelCase = c.convertFieldsToCamelCase), "undefined" == typeof a.populateAccessors && (a.populateAccessors = c.populateAccessors), new c.Builder(a)
	}, c.loadJson = function(a, b, d) {
		return ("string" == typeof b || b && "string" == typeof b.file && "string" == typeof b.root) && (d = b, b = null), b && "object" == typeof b || (b = c.newBuilder()), "string" == typeof a && (a = JSON.parse(a)), b.import(a, d), b.resolveAll(), b
	}, c.loadJsonFile = function(a, b, d) {
		if (b && "object" == typeof b ? (d = b, b = null) : b && "function" == typeof b || (b = null), b) return c.Util.fetch("string" == typeof a ? a : a.root + "/" + a.file, function(e) {
			if (null === e) return void b(Error("Failed to fetch file"));
			try {
				b(null, c.loadJson(JSON.parse(e), d, a))
			} catch (a) {
				b(a)
			}
		});
		var e = c.Util.fetch("object" == typeof a ? a.root + "/" + a.file : a);
		return null === e ? null : c.loadJson(JSON.parse(e), d, a)
	}, c
});
var RTCPeerConnection = null,
	getUserMedia = null,
	attachMediaStream = null,
	drawImage = null,
	reattachMediaStream = null,
	webrtcDetectedBrowser = null,
	webrtcDetectedVersion = null;
window.performance = window.performance || {}, window.performance.now = window.performance.now ||
function() {
	var a = Date.now();
	return function() {
		return Date.now() - a
	}
}(), window.URL = window.URL || window.webkitURL;
var WebRTCPlugin = WebRTCPlugin || {};
if (WebRTCPlugin.pluginInfo = {
	prefix: "object_",
	plugName: "avd-plugin",
	classId: "CLSID:7FD49E23-C8D7-4C4F-93A1-F7EACFA1EC53",
	pluginId: "plugin0",
	type: "application/avd-plugin",
	portalLink: "http://3tee.cn/dl.htm",
	downloadLink: null,
	companyName: null
}, "undefined" != typeof IEPluginDownloadLink ? WebRTCPlugin.pluginInfo.downloadLink = IEPluginDownloadLink : navigator.platform.match(/^Mac/i) ? WebRTCPlugin.pluginInfo.downloadLink = "http://3tee.cn/download/avd-plugin-safari.exe" : navigator.platform.match(/^Win/i) && (WebRTCPlugin.pluginInfo.downloadLink = "http://3tee.cn/download/avd-plugin-ie.exe"), "undefined" != typeof pluginCompanyName ? WebRTCPlugin.pluginInfo.companyName = pluginCompanyName : WebRTCPlugin.pluginInfo.companyName = "3Tee", WebRTCPlugin.TEXT = {
	PLUGIN: {
		REQUIRE_INSTALLATION: "本产品要求您安装一个插件,使在这个浏览器中支持WebRTC功能。",
		NOT_SUPPORTED: "您的浏览器不支持WebRTC.",
		BUTTON: "现在安装"
	},
	REFRESH: {
		REQUIRE_REFRESH: "插件已安装，请刷新页面。",
		BUTTON: "刷新页面"
	}
}, WebRTCPlugin.PLUGIN_STATES = {
	NONE: 0,
	READY: 4
}, WebRTCPlugin.isPluginInstalled = null, WebRTCPlugin.pluginState = WebRTCPlugin.PLUGIN_STATES.NONE, WebRTCPlugin.callWhenPluginReady = function(a, b) {
	if ("complete" === document.readyState && WebRTCPlugin.pluginState === WebRTCPlugin.PLUGIN_STATES.READY) a();
	else {
		console.log("readyState = " + document.readyState + ", delaying " + b + "...");
		var c = setInterval(function() {
			"complete" === document.readyState && WebRTCPlugin.pluginState === WebRTCPlugin.PLUGIN_STATES.READY && (clearInterval(c), a())
		}, 100)
	}
}, WebRTCPlugin.renderNotificationBar = function(a, b, c, d, e) {
	var f = "pluginNotificationBar",
		g = document.getElementById(f);
	if (g) return !1;
	var h = window,
		i = document.createElement("iframe");
	i.id = "pluginNotificationBar", i.name = "pluginNotificationBar", i.style.position = "fixed", i.style.top = "-41px", i.style.left = 0, i.style.right = 0, i.style.width = "100%", i.style.height = "40px", i.style.backgroundColor = "#ffffe1", i.style.border = "none", i.style.borderBottom = "1px solid #888888", i.style.zIndex = "9999999", "string" == typeof i.style.webkitTransition ? i.style.webkitTransition = "all .5s ease-out" : "string" == typeof i.style.transition && (i.style.transition = "all .5s ease-out"), document.body.appendChild(i);
	var j = i.contentWindow ? i.contentWindow : i.contentDocument.document ? i.contentDocument.document : i.contentDocument;
	if (j.document.open(), j.document.write('<span style="display: inline-block; font-family: Helvetica, Arial,sans-serif; font-size: .9rem; padding: 4px; vertical-align: middle; cursor: default;">' + a + "</span>"), b && c) {
		j.document.write('<button id="okay">' + b + '</button><button id="cancel">取消</button>'), j.document.close();
		var k;
		attachEventListener(j.document.getElementById("okay"), "click", function(a) {
			window.open(c, d ? "_blank" : "_top"), a.preventDefault();
			try {
				a.cancelBubble = !0
			} catch (a) {}
			k = setInterval(function() {
				WebRTCPlugin.pluginState == WebRTCPlugin.PLUGIN_STATES.NONE && installPlugin(), WebRTCPlugin.pluginState == WebRTCPlugin.PLUGIN_STATES.READY && (i.parentNode.removeChild(i), clearInterval(k))
			}, 5e3)
		}), attachEventListener(j.document.getElementById("cancel"), "click", function(a) {
			k && clearInterval(k), h.document.body.removeChild(i)
		})
	} else j.document.close();
	setTimeout(function() {
		"string" == typeof i.style.webkitTransform ? i.style.webkitTransform = "translateY(40px)" : "string" == typeof i.style.transform ? i.style.transform = "translateY(40px)" : i.style.top = "0px"
	}, 300)
}, drawImage = function(a, b, c, d, e, f) {
	a.drawImage(b, c, d, e, f)
}, attachEventListener = function(a, b, c, d) {
	a.addEventListener(b, c, d)
}, navigator.mozGetUserMedia) {
	console.log("This appears to be Firefox"), webrtcDetectedBrowser = "firefox", webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
	var RTCPeerConnection = function(a, b) {
			return maybeFixConfiguration(a), new mozRTCPeerConnection(a, b)
		};
	RTCSessionDescription = mozRTCSessionDescription, RTCIceCandidate = mozRTCIceCandidate, getUserMedia = navigator.mozGetUserMedia.bind(navigator), navigator.getUserMedia = getUserMedia, createIceServer = function(a, b, c) {
		var d = null,
			e = a.split(":");
		if (0 === e[0].indexOf("stun")) d = {
			url: a
		};
		else if (0 === e[0].indexOf("turn")) if (webrtcDetectedVersion < 27) {
			var f = a.split("?");
			1 !== f.length && 0 !== f[1].indexOf("transport=udp") || (d = {
				url: f[0],
				credential: c,
				username: b
			})
		} else d = {
			url: a,
			credential: c,
			username: b
		};
		return d
	}, createIceServers = function(a, b, c) {
		var d = [];
		for (i = 0; i < a.length; i++) {
			var e = createIceServer(a[i], b, c);
			null !== e && d.push(e)
		}
		return d
	}, attachMediaStream = function(a, b) {
		return console.log("Attaching media stream"), a.mozSrcObject = b, a.play(), a
	}, reattachMediaStream = function(a, b) {
		console.log("Reattaching media stream"), a.mozSrcObject = b.mozSrcObject, a.play()
	}
} else if (navigator.webkitGetUserMedia) {
	console.log("This appears to be Chrome"), webrtcDetectedBrowser = "chrome";
	var result = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	webrtcDetectedVersion = null !== result ? parseInt(result[2], 10) : 999, createIceServer = function(a, b, c) {
		var d = null,
			e = a.split(":");
		return 0 === e[0].indexOf("stun") ? d = {
			url: a
		} : 0 === e[0].indexOf("turn") && (d = {
			url: a,
			credential: c,
			username: b
		}), d
	}, createIceServers = function(a, b, c) {
		var d = [];
		if (webrtcDetectedVersion >= 34) d = {
			urls: a,
			credential: c,
			username: b
		};
		else for (i = 0; i < a.length; i++) {
			var e = createIceServer(a[i], b, c);
			null !== e && d.push(e)
		}
		return d
	};
	var RTCPeerConnection = function(a, b) {
			return webrtcDetectedVersion < 34 && maybeFixConfiguration(a), new webkitRTCPeerConnection(a, b)
		};
	getUserMedia = navigator.webkitGetUserMedia.bind(navigator), navigator.getUserMedia = getUserMedia, attachMediaStream = function(a, b) {
		return "undefined" != typeof a.srcObject ? a.srcObject = b : "undefined" != typeof a.mozSrcObject ? a.mozSrcObject = b : "undefined" != typeof a.src ? b ? a.src = URL.createObjectURL(b) : a.src && "undefined" != typeof URL.revokeObjectURL && (URL.revokeObjectURL(a.src), a.src = "") : console.log("Error attaching stream to element."), a
	}, reattachMediaStream = function(a, b) {
		a.src = b.src
	}
} else {
	var console = console || {
		log: function(a) {}
	},
		createIceServer = function(a, b, c) {
			var d = a.split(":");
			return 0 === d[0].indexOf("stun") ? {
				url: a
			} : 0 === d[0].indexOf("turn") ? {
				url: a,
				credential: c,
				username: b
			} : null
		},
		extractPluginObj = function(a) {
			return a.isWebRtcPlugin ? a : a.pluginObj
		},
		attachEventListener = function(a, b, c, d) {
			var e = extractPluginObj(a);
			e ? e.bindEventListener(b, c, d) : "undefined" != typeof a.addEventListener ? a.addEventListener(b, c, d) : "undefined" != typeof a.addEvent && a.addEventListener("on" + b, c, d)
		},
		installPlugin = function() {
			if (!document.getElementById(WebRTCPlugin.pluginInfo.pluginId)) {
				console.log("installPlugin() called");
				var a = !! (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window),
					b = !! navigator.userAgent.indexOf("Safari"),
					c = document.createElement("object");
				if (a ? (c.setAttribute("classid", WebRTCPlugin.pluginInfo.classId), a = !0) : c.setAttribute("type", WebRTCPlugin.pluginInfo.type), c.setAttribute("id", WebRTCPlugin.pluginInfo.pluginId), document.body.appendChild(c), c.setAttribute("width", "0"), c.setAttribute("height", "0"), c.isWebRtcPlugin || "undefined" != typeof navigator.plugins && (navigator.plugins["avd-plugin"] || navigator.plugins["avd-plugin for Safari"])) console.log("Plugin version: " + c.versionName), WebRTCPlugin.pluginState = WebRTCPlugin.PLUGIN_STATES.READY, a ? (console.log("This appears to be Internet Explorer"), webrtcDetectedBrowser = "Internet Explorer") : b && (console.log("This appears to be Safari"), webrtcDetectedBrowser = "Safari");
				else {
					console.log("Browser does not appear to be WebRTC-capable"), WebRTCPlugin.pluginState = WebRTCPlugin.PLUGIN_STATES.NONE;
					var d = document.getElementById(WebRTCPlugin.pluginInfo.pluginId);
					d.parentNode.removeChild(d), pluginNeededButNotInstalled()
				}
				console.log("end of installPlugin()")
			}
		};
	pluginNeededButNotInstalled = function() {
		console.log("plugin Needed But Not Installed");
		var a = WebRTCPlugin.pluginInfo.downloadLink;
		if (a) {
			var b;
			b = WebRTCPlugin.pluginInfo.portalLink ? '本产品要求您安装一个插件 <a href="' + WebRTCPlugin.pluginInfo.portalLink + '" target="_blank">' + WebRTCPlugin.pluginInfo.companyName + " WebRTC Plugin</a> ,使在这个浏览器中支持WebRTC功能。" : WebRTCPlugin.TEXT.PLUGIN.REQUIRE_INSTALLATION, WebRTCPlugin.renderNotificationBar(b, WebRTCPlugin.TEXT.PLUGIN.BUTTON, a)
		} else WebRTCPlugin.renderNotificationBar(WebRTCPlugin.TEXT.PLUGIN.NOT_SUPPORTED)
	}, document.body ? installPlugin() : (attachEventListener(window, "load", function() {
		console.log("onload"), installPlugin()
	}), attachEventListener(document, "readystatechange", function() {
		console.log("onreadystatechange:" + document.readyState), "complete" == document.readyState && installPlugin()
	})), getUserMedia = navigator.getUserMedia = function(a, b, c) {
		WebRTCPlugin.callWhenPluginReady(function() {
			getPlugin().getUserMedia(a, b, c)
		}, "getUserMedia")
	}, attachMediaStream = function(a, b) {
		if (console.log("Attaching media stream"), !a) return null;
		if (a.isWebRtcPlugin) return a.src = b, a;
		if ("video" === a.nodeName.toLowerCase()) {
			if (!a.pluginObj && b) {
				var c = document.createElement("object"),
					d = Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window;
				if (d) {
					var e = document.createElement("param");
					e.setAttribute("name", "windowless"), e.setAttribute("value", !0), c.appendChild(e), c.setAttribute("classid", WebRTCPlugin.pluginInfo.classId)
				} else c.setAttribute("type", WebRTCPlugin.pluginInfo.type);
				a.pluginObj = c, c.setAttribute("id", WebRTCPlugin.pluginInfo.prefix + a.id);
				var f = a.getAttribute("width"),
					g = a.getAttribute("height"),
					h = a.getBoundingClientRect();
				if (f || (f = h.right - h.left), g || (g = h.bottom - h.top), "getComputedStyle" in window) {
					var i = window.getComputedStyle(a, null);
					f || "auto" == i.width || "0px" == i.width || (f = i.width), g || "auto" == i.height || "0px" == i.height || (g = i.height)
				}
				f ? c.setAttribute("width", f) : c.setAttribute("autowidth", !0), g ? c.setAttribute("height", g) : c.setAttribute("autoheight", !0), document.body.appendChild(c), a.parentNode && (a.parentNode.replaceChild(c, a), document.body.appendChild(a), a.style.visibility = "hidden")
			} else!a.pluginObj || null != b && "" != b || (a.style.visibility = "", a.pluginObj.parentNode.replaceChild(a, a.pluginObj), a.pluginObj = null);
			return a.pluginObj && (a.pluginObj.bindEventListener("play", function(b) {
				a.pluginObj && (a.pluginObj.getAttribute("autowidth") && b.videoWidth && a.pluginObj.setAttribute("width", b.videoWidth), a.pluginObj.getAttribute("autoheight") && b.videoHeight && a.pluginObj.setAttribute("height", b.videoHeight))
			}), a.pluginObj.src = b), a.pluginObj
		}
		return "audio" === a.nodeName.toLowerCase() ? a : void 0
	}, drawImage = function(a, b, c, d, e, f) {
		var g = extractPluginObj(b);
		if (g && g.isWebRtcPlugin && g.videoWidth > 0 && g.videoHeight > 0) if ("undefined" != typeof g.getScreenShot) {
			var h = g.getScreenShot();
			if (h) {
				var i = new Image;
				i.onload = function() {
					a.drawImage(i, 0, 0, e, f)
				}, i.src = "data:image/png;base64," + h
			}
		} else {
			var j = a.createImageData(g.videoWidth, g.videoHeight);
			j && (g.fillImageData(j), a.putImageData(j, c, d))
		}
	}, MediaStreamTrack = {}, MediaStreamTrack.getSources = function(a) {
		WebRTCPlugin.callWhenPluginReady(function() {
			getPlugin().getSources(a)
		}, "getSources")
	}, RTCPeerConnection = function(a, b) {
		var c = getPlugin().createPeerConnection(a, b),
			d = this;
		c.onIceCandidate = function(a) {
			d.onicecandidate(a)
		}, c.onaddstream = function(a) {
			d.onaddstream(a)
		}, c.onremovestream = function(a) {
			d.onremovestream(a)
		}, c.ondatachannel = function(a) {
			d.ondatachannel(a)
		}, c.oniceconnectionstatechange = function() {
			var a = c.iceConnectionState;
			d.iceConnectionState = a;
			var b = {},
				e = {};
			b.target = e, b.target.iceConnectionState = a, d.oniceconnectionstatechange(b)
		}, c.onsignalingstatechange = function() {
			var a = c.signalingState;
			d.signalingState = a, d.remoteDescription = c.remoteDescription;
			var b = {},
				e = {};
			b.target = e, b.target.signalingState = a, d.onsignalingstatechange(b)
		}, d.addStream = function(a) {
			c.addStream(a)
		}, d.removeStream = function(a) {
			c.removeStream(a)
		}, d.createOffer = function(a, b, d) {
			var e = {
				optional: [],
				mandatory: {}
			};
			d = mergeConstraints(e, d), c.createOffer(a, b, d)
		}, d.createAnswer = function(a, b, d) {
			var e = {
				optional: [],
				mandatory: {}
			};
			d = mergeConstraints(e, d), c.createAnswer(a, b, d)
		}, d.setLocalDescription = function(a, b, d) {
			c.setLocalDescription(a, b, d)
		}, d.setRemoteDescription = function(a, b, d) {
			c.setRemoteDescription(a, b, d)
		}, d.addIceCandidate = function(a, b, d) {
			c.addIceCandidate(a, b, d)
		}, d.close = function() {
			c.close()
		}, d.onsignalingstatechange = function(a) {
			return a
		}, d.getStats = function(a, b) {
			c.getStats(a, b)
		}
	}, RTCIceCandidate = function(a) {
		return getPlugin().createIceCandidate(a)
	}, RTCSessionDescription = function(a) {
		return getPlugin().createSessionDescription(a)
	}
}
SdpSerializer.SerializeASBandwidth = function(a, b) {
	return b = b || {}, a = a.replace(/b=AS([^\r\n]+\r\n)/g, ""), a = a.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + (b.audio || 50) + "\r\n"), a = a.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + (b.video || 256) + "\r\n"), a = a.replace(/a=mid:data\r\n/g, "a=mid:data\r\nb=AS:" + (b.data || 1638400) + "\r\n")
}, SdpSerializer.SerializePTime = function(a, b) {
	return b = b || {}, a = a.replace("a=fmtp:111 minptime=10", "a=fmtp:111 minptime=" + (b.minptime || 10)), a = a.replace("a=maxptime:60", "a=maxptime:" + (b.maxptime || 60))
}, SdpSerializer.SerializeGoogleMinBitrate = function(a, b) {
	return a = a.replace(/a=mid:video\r\n/g, "a=mid:video\r\na=rtpmap:120 VP8/90000\r\na=fmtp:120 \t\t\t\t\t\t\tx-google-min-bitrate=" + (b || 10) + "\r\n")
}, SdpSerializer.RTPOverTCP = function(a) {
	return a.replace(/a=candidate:.*udp.*\r\n/g, "")
}, !
function(a, b) {
	"use strict";
	a(function() {
		function a(a, b, c, e) {
			return d(a).then(b, c, e)
		}
		function c(a, b) {
			this.then = a, this.inspect = b
		}
		function d(a) {
			return g(function(b) {
				b(a)
			})
		}
		function e(b) {
			return a(b, j)
		}
		function f() {
			function a(a, f, g) {
				b.resolve = b.resolver.resolve = function(b) {
					return e ? d(b) : (e = !0, a(b), c)
				}, b.reject = b.resolver.reject = function(a) {
					return e ? d(j(a)) : (e = !0, f(a), c)
				}, b.notify = b.resolver.notify = function(a) {
					return g(a), a
				}
			}
			var b, c, e;
			return b = {
				promise: L,
				resolve: L,
				reject: L,
				notify: L,
				resolver: {
					resolve: L,
					reject: L,
					notify: L
				}
			}, b.promise = c = g(a), b
		}
		function g(a) {
			function b(a, b, c) {
				return g(function(d, e, f) {
					n ? n.push(function(g) {
						g.then(a, b, c).then(d, e, f)
					}) : y(function() {
						m.then(a, b, c).then(d, e, f)
					})
				})
			}
			function d() {
				return m ? m.inspect() : x()
			}
			function e(a) {
				n && (m = h(a), l(n, m), n = L)
			}
			function f(a) {
				e(j(a))
			}
			function i(a) {
				n && l(n, k(a))
			}
			var m, n = [];
			try {
				a(e, f, i)
			} catch (a) {
				f(a)
			}
			return new c(b, d)
		}
		function h(a) {
			return a instanceof c ? a : a === Object(a) && "then" in a ? g(function(b, c, d) {
				y(function() {
					try {
						var e = a.then;
						"function" == typeof e ? E(e, a, b, c, d) : b(i(a))
					} catch (a) {
						c(a)
					}
				})
			}) : i(a)
		}
		function i(a) {
			var b = new c(function(c) {
				try {
					return "function" == typeof c ? h(c(a)) : b
				} catch (a) {
					return j(a)
				}
			}, function() {
				return v(a)
			});
			return b
		}
		function j(a) {
			var b = new c(function(c, d) {
				try {
					return "function" == typeof d ? h(d(a)) : b
				} catch (a) {
					return j(a)
				}
			}, function() {
				return w(a)
			});
			return b
		}
		function k(a) {
			var b = new c(function(c, d, e) {
				try {
					return "function" == typeof e ? k(e(a)) : b
				} catch (a) {
					return k(a)
				}
			});
			return b
		}
		function l(a, b) {
			y(function() {
				for (var c, d = 0; c = a[d++];) c(b)
			})
		}
		function m(a) {
			return a && "function" == typeof a.then
		}
		function n(b, c, d, e, f) {
			return a(b, function(b) {
				function h(d, e, f) {
					function g(a) {
						n(a)
					}
					function h(a) {
						m(a)
					}
					var i, j, k, l, m, n, o, p;
					if (o = b.length >>> 0, i = Math.max(0, Math.min(c, o)), k = [], j = o - i + 1, l = [], i) for (n = function(a) {
						l.push(a), --j || (m = n = B, e(l))
					}, m = function(a) {
						k.push(a), --i || (m = n = B, d(k))
					}, p = 0; o > p; ++p) p in b && a(b[p], h, g, f);
					else d(k)
				}
				return g(h).then(d, e, f)
			})
		}
		function o(a, b, c, d) {
			function e(a) {
				return b ? b(a[0]) : a[0]
			}
			return n(a, 1, e, c, d)
		}
		function p(a, b, c, d) {
			return t(a, B).then(b, c, d)
		}
		function q() {
			return t(arguments, B)
		}
		function r(a) {
			return t(a, v, w)
		}
		function s(a, b) {
			return t(a, b)
		}
		function t(b, c, d) {
			return a(b, function(b) {
				function e(e, f, g) {
					var h, i, j, k, l;
					if (j = i = b.length >>> 0, h = [], !j) return void e(h);
					for (k = function(b, i) {
						a(b, c, d).then(function(a) {
							h[i] = a, --j || e(h)
						}, f, g)
					}, l = 0; i > l; l++) l in b ? k(b[l], l) : --j
				}
				return g(e)
			})
		}
		function u(b, c) {
			var d = E(D, arguments, 1);
			return a(b, function(b) {
				var e;
				return e = b.length, d[0] = function(b, d, f) {
					return a(b, function(b) {
						return a(d, function(a) {
							return c(b, a, f, e)
						})
					})
				}, C.apply(b, d)
			})
		}
		function v(a) {
			return {
				state: "fulfilled",
				value: a
			}
		}
		function w(a) {
			return {
				state: "rejected",
				reason: a
			}
		}
		function x() {
			return {
				state: "pending"
			}
		}
		function y(a) {
			1 === G.push(a) && z()
		}
		function z() {
			F(A)
		}
		function A() {
			for (var a, b = 0; a = G[b++];) a();
			G = []
		}
		function B(a) {
			return a
		}
		a.defer = f, a.resolve = d, a.reject = e, a.join = q, a.all = p, a.map = s, a.reduce = u, a.settle = r, a.any = o, a.some = n, a.isPromise = m, a.promise = g, c.prototype = {
			otherwise: function(a) {
				return this.then(L, a)
			},
			ensure: function(a) {
				function b() {
					return d(a())
				}
				return this.then(b, b).yield2(this)
			},
			yield2: function(a) {
				return this.then(function() {
					return a
				})
			},
			spread: function(a) {
				return this.then(function(b) {
					return p(b, function(b) {
						return a.apply(L, b)
					})
				})
			},
			always: function(a, b) {
				return this.then(a, a, b)
			}
		};
		var C, D, E, F, G, H, I, J, K, L;
		return G = [], H = b.setTimeout, F = "function" == typeof setImmediate ? setImmediate.bind(b) : "object" == typeof process && process.nextTick ? process.nextTick : "object" == typeof vertx ? vertx.runOnLoop : function(a) {
			H(a, 0)
		}, I = Function.prototype, J = I.call, E = I.bind ? J.bind(J) : function(a, b) {
			return a.apply(b, D.call(arguments, 2))
		}, K = [], D = K.slice, C = K.reduce ||
		function(a) {
			var b, c, d, e, f;
			if (f = 0, b = Object(this), e = b.length >>> 0, c = arguments, c.length <= 1) for (;;) {
				if (f in b) {
					d = b[f++];
					break
				}
				if (++f >= e) throw new TypeError
			} else d = c[1];
			for (; e > f; ++f) f in b && (d = a(d, b[f], f, b));
			return d
		}, a
	})
}("function" == typeof define && define.amd ? define : function(a) {
	window.when = a()
}, this), EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 500, EventEmitter.prototype.setMaxListeners = function(a) {
	if (!isNumber(a) || a < 0 || isNaN(a)) throw TypeError("n must be a positive number");
	return this._maxListeners = a, this
}, EventEmitter.prototype.emit = function(a) {
	var b, c, d, e, f, g;
	if (this._events || (this._events = {}), "error" === a && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
		if (b = arguments[1], b instanceof Error) throw b;
		throw TypeError('Uncaught, unspecified "error" event.')
	}
	if (c = this._events[a], isUndefined(c)) return !1;
	if (isFunction(c)) switch (arguments.length) {
	case 1:
		c.call(this);
		break;
	case 2:
		c.call(this, arguments[1]);
		break;
	case 3:
		c.call(this, arguments[1], arguments[2]);
		break;
	default:
		for (d = arguments.length, e = new Array(d - 1), f = 1; f < d; f++) e[f - 1] = arguments[f];
		c.apply(this, e)
	} else if (isObject(c)) {
		for (d = arguments.length, e = new Array(d - 1), f = 1; f < d; f++) e[f - 1] = arguments[f];
		for (g = c.slice(), d = g.length, f = 0; f < d; f++) g[f].apply(this, e)
	}
	return !0
}, EventEmitter.prototype.addListener = function(a, b) {
	var c;
	if (!isFunction(b)) throw TypeError("listener must be a function");
	if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", a, isFunction(b.listener) ? b.listener : b), this._events[a] ? isObject(this._events[a]) ? this._events[a].push(b) : this._events[a] = [this._events[a], b] : this._events[a] = b, isObject(this._events[a]) && !this._events[a].warned) {
		var c;
		c = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners, c && c > 0 && this._events[a].length > c && (this._events[a].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[a].length), "function" == typeof console.trace && console.trace())
	}
	return this
}, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function(a, b) {
	function c() {
		this.removeListener(a, c), d || (d = !0, b.apply(this, arguments))
	}
	if (!isFunction(b)) throw TypeError("listener must be a function");
	var d = !1;
	return c.listener = b, this.on(a, c), this
}, EventEmitter.prototype.removeListener = function(a, b) {
	var c, d, e, f;
	if (!isFunction(b)) throw TypeError("listener must be a function");
	if (!this._events || !this._events[a]) return this;
	if (c = this._events[a], e = c.length, d = -1, c === b || isFunction(c.listener) && c.listener === b) delete this._events[a], this._events.removeListener && this.emit("removeListener", a, b);
	else if (isObject(c)) {
		for (f = e; f-- > 0;) if (c[f] === b || c[f].listener && c[f].listener === b) {
			d = f;
			break
		}
		if (d < 0) return this;
		1 === c.length ? (c.length = 0, delete this._events[a]) : c.splice(d, 1), this._events.removeListener && this.emit("removeListener", a, b)
	}
	return this
}, EventEmitter.prototype.removeAllListeners = function(a) {
	var b, c;
	if (!this._events) return this;
	if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[a] && delete this._events[a], this;
	if (0 === arguments.length) {
		for (b in this._events)"removeListener" !== b && this.removeAllListeners(b);
		return this.removeAllListeners("removeListener"), this._events = {}, this
	}
	if (c = this._events[a], isFunction(c)) this.removeListener(a, c);
	else for (; c.length;) this.removeListener(a, c[c.length - 1]);
	return delete this._events[a], this
}, EventEmitter.prototype.listeners = function(a) {
	var b;
	return b = this._events && this._events[a] ? isFunction(this._events[a]) ? [this._events[a]] : this._events[a].slice() : []
}, EventEmitter.listenerCount = function(a, b) {
	var c;
	return c = a._events && a._events[b] ? isFunction(a._events[b]) ? 1 : a._events[b].length : 0
};
var ErrorConstant = {
	check_webrtc_supported: {
		code: 2e3,
		message: "此浏览器不支持WebRTC"
	},
	not_support_mediaStreamTrack: {
		code: 2001,
		message: "此浏览器不支持MediaStreamTrack."
	},
	screen_sharing_plugin_not_accessible: {
		code: 2003,
		message: "屏幕共享插件找不到"
	},
	screen_sharing_response_is_null: {
		code: 2004,
		message: "没有屏幕共享"
	},
	not_join_room: {
		code: 2005,
		message: "还未加会"
	},
	navigatorUserMediaError_permissionDenied: {
		code: 2010,
		message: "打开设备权限不足，原因是非https访问或主动拒绝了设备请求"
	},
	navigatorUserMediaError_constraintNotSatisfied: {
		code: 2011,
		message: "设备打开失败，因为传入的参数格式不对"
	},
	navigatorUserMediaError_trackStartError: {
		code: 2012,
		message: "设备打开失败，因为传入的参数格式不对(chrome39以下)"
	},
	navigatorUserMediaError_unknown: {
		code: 2015,
		message: "设备打开失败未知错误"
	},
	cameraId_does_not_exist: {
		code: 2017,
		message: "摄像头ID不存在"
	},
	closeVideo_before_operation_warnings: {
		code: 2018,
		message: "请关闭摄像头以后再进行此操作"
	},
	websock_create_error: {
		code: 2020,
		message: "Websocket创建失败"
	},
	websock_catch_exception: {
		code: 2021,
		message: "Websocket操作失败"
	},
	join_room_timeout: {
		code: 1014,
		message: "加会超时"
	},
	oemname_notfound: {
		code: 1017,
		message: "OEM名称没找到"
	},
	avdEngine_init_failed: {
		code: 1018,
		message: "sdk引擎初始化失败"
	},
	userId_required: {
		code: 1300,
		message: "userId是必须项，不能为空"
	},
	mulLanding_error: {
		code: 1301,
		message: "同一个userId不能多次登录"
	},
	roomId_required: {
		code: 1302,
		message: "roomId是必须项，不能为空"
	},
	params_require: {
		code: 1303,
		message: "params是必须项，不能为空"
	},
	ft_no_authorization: {
		code: 1305,
		message: "模块无授权."
	}
},
	FTConstant = {
		datachannel: {
			name: "透明通道",
			value: "ft_datachannel"
		},
		chat: {
			name: "聊天",
			value: "ft_chat"
		},
		audio: {
			name: "语音",
			value: "ft_audio"
		},
		video: {
			name: "普通视频",
			value: "ft_video"
		},
		video_hd: {
			name: "高清视频",
			value: "ft_video_hd"
		},
		screen: {
			name: "屏幕共享",
			value: "ft_screen"
		},
		annotation: {
			name: "注释白板",
			value: "ft_annotation"
		},
		p2p: {
			name: "P2P房间",
			value: "ft_p2p"
		},
		record_audio: {
			name: "录制音频",
			value: "ft_record_audio"
		},
		record_video: {
			name: "录制视频",
			value: "ft_record_video"
		},
		livebroadcast: {
			name: "旁路直播",
			value: "ft_livebroadcast"
		},
		platform_android: {
			name: "Android系统",
			value: "ft_platform_android"
		},
		platform_ios: {
			name: "ios系统",
			value: "ft_platform_ios"
		},
		platform_win: {
			name: "windows桌面系统",
			value: "ft_platform_win"
		},
		platform_mac: {
			name: "mac ox桌面系统",
			value: "ft_platform_mac"
		},
		platform_linux: {
			name: "linux桌面系统",
			value: "ft_platform_linux"
		},
		platform_web: {
			name: "web js系统",
			value: "ft_platform_web"
		}
	},
	ModulesEnum = {
		avdEngine: "AVDEngine",
		browserDetect: "BrowserDetect",
		video: "Video",
		audio: "Audio",
		error: "Error",
		annotation: "Annotation"
	},
	Appender = {
		alert: 1,
		inpage: 2,
		popup: 3,
		browserConsole: 4
	},
	LogLevel = {
		all: 1,
		trace: 2,
		debug: 3,
		info: 4,
		warn: 5,
		error: 6,
		fatal: 7,
		off: 8
	},
	SignalType = {
		websocket: "websocket",
		dataChannel: "dataChannel"
	},
	EngineCallback = {
		room_join_success: "room.join.success",
		room_join_error: "room.join.error",
		room_join_websocket_reconnection_success: "room.join.websocket.reconnection.success",
		pub_roomresourcemsg_rep_success: "pub.roomresourcemsg.rep.success",
		pub_roomresourcemsg_rep_error: "pub.roomresourcemsg.rep.error"
	},
	VideoCodingType = {
		VP8: 0,
		VP9: 1,
		H264: 2
	},
	Resolution = {
		1080: {
			width: 1920,
			height: 1080,
			order: 14
		},
		720: {
			width: 1280,
			height: 720,
			order: 13
		},
		960: {
			width: 960,
			height: 720,
			order: 12
		},
		642: {
			width: 640,
			height: 1024,
			order: 11
		},
		641: {
			width: 640,
			height: 960,
			order: 10
		},
		640: {
			width: 640,
			height: 480,
			order: 9
		},
		639: {
			width: 640,
			height: 360,
			order: 8
		},
		508: {
			width: 508,
			height: 360,
			order: 7
		},
		481: {
			width: 480,
			height: 854,
			order: 6
		},
		480: {
			width: 480,
			height: 800,
			order: 5
		},
		321: {
			width: 320,
			height: 480,
			order: 4
		},
		320: {
			width: 320,
			height: 240,
			order: 3
		},
		180: {
			width: 320,
			height: 180,
			order: 2
		},
		160: {
			width: 160,
			height: 120,
			order: 1
		}
	},
	ConnectionStatus = {
		init: 0,
		connecting: 1,
		connected: 2,
		connectFailed: 3
	},
	MCUPeerConnectionStatus = {
		failed: 0,
		completed: 1
	},
	RoomStatus = {
		scheduled: 0,
		opening: 1,
		locked: 2,
		closed: 3
	};
StreamStatus = {
	none: 0,
	init: 1,
	published: 2,
	muted: 3,
	forbided: 4,
	subed: 5,
	opened: 6
}, CameraType = {
	unknown: 0,
	front: 1,
	back: 2
};
var RoomCallback = {
	connection_status: "connection.status",
	connection_indicator: "connection.indicator",
	room_status_notify: "room.status.notify",
	app_data_notify: "app.data.notify",
	user_data_notify: "user.data.notify",
	public_data: "public.data",
	private_data: "private.data",
	public_message: "public.message ",
	private_message: "private.message",
	user_join_notify: "user.join.notify",
	user_leave_notify: "user.leave.notify",
	leave_indication: "leave.indication",
	screen_sharing_ended: "screen.sharing.ended",
	mcu_peerconnection_completed: "mcu.peerconnection.completed"
},
	UserCallback = {
		microphone_status_notify: "microphone.status.notify",
		camera_status_notify: "camera.status.notify",
		screen_status_notify: "screen.status.notify",
		camera_data_notify: "camera.data.notify",
		screen_data_notify: "screen.data.notify",
		publish_camera_notify: "publish.camera.notify",
		unpublish_camera_notify: "unpublish.camera.notify",
		subscrible_camera_result: "subscrible.camera.result",
		unsubscrible_camera_result: "unsubscrible.camera.result",
		publish_screen_notify: "publish.screen.notify",
		unpublish_screen_notify: "unpublish.screen.notify",
		subscrible_screen_result: "subscrible.screen.result",
		unsubscrible_screen_result: "unsubscrible.screen.result",
		subscrible_microphone_result: "subscrible.microphone.result",
		unsubscrible_microphone_result: "unsubscrible.microphone.result"
	},
	RecordEnum = {
		VideoType: {
			novideo: 0,
			mainflow: 1,
			auxiliaryflow1: 2,
			auxiliaryflow2: 3
		},
		AudioType: {
			noaudio: 0,
			singleuser: 1,
			allusers: 2
		},
		FileType: {
			mp4: 0,
			webM: 1
		}
	},
	LiveEnum = {
		VideoType: {
			novideo: 0,
			mainflow: 1,
			auxiliaryflow1: 2,
			auxiliaryflow2: 3
		},
		AudioType: {
			noaudio: 0,
			singleuser: 1,
			allusers: 2
		}
	},
	annoSelectTypeEnum = {
		mouse: 1,
		draw: 2,
		eraser: 3
	},
	canvasTypeEnum = {
		line: 1,
		ellipse: 2,
		rect: 3,
		polyline: 4,
		arrowline: 5,
		undo: 6,
		redo: 7,
		clear: 8,
		eraser: 9,
		right: 10,
		wrong: 11
	},
	fillTypeEnum = {
		none: 1,
		full: 2
	},
	arrowTypeEnum = {
		none: 1,
		begin: 2,
		end: 3,
		double: 4
	},
	arrayUtil = {
		intersection: function(a, b) {
			for (var c = new Object, d = 0, e = a.length; d < e; d++) c[a[d]] = a[d];
			for (var d = 0, e = b.length; d < e; d++) c[b[d]] = b[d];
			var f = new Array,
				d = 0;
			for (var g in c) f[d++] = c[g];
			return f
		},
		chaji: function(a, b) {
			for (var c = new Object, d = 0, e = a.length; d < e; d++) c[a[d]] = 1;
			for (var d = 0, e = b.length; d < e; d++) c[b[d]] = c[b[d]] ? 2 : 1;
			var f = new Array,
				d = 0;
			for (var g in c) 1 == c[g] && (f[d++] = g);
			return f
		},
		chajiObject: function(a, b) {
			for (var c = new Object, d = 0, e = a.length; d < e; d++) c[a[d].nodeId] = 1;
			for (var d = 0, e = b.length; d < e; d++) c[b[d].nodeId] = c[b[d].nodeId] ? 2 : 1;
			var f = new Array,
				d = 0;
			for (var g in c) 1 == c[g] && (f[d++] = g);
			return f
		},
		inANotInB: function(a, b) {
			for (var c = new Object, d = 0, e = a.length; d < e; d++) c[a[d]] = 1;
			for (var d = 0, e = b.length; d < e; d++) c.hasOwnProperty(b[d]) && (c[b[d]] = void 0);
			var f = new Array,
				d = 0;
			for (var g in c) c[g] && (f[d++] = g);
			return f
		},
		baseSplice: function(a, b) {
			for (var c, d = 0; d < a.length; d++) {
				var e = a[d];
				if (e == b) {
					c = d;
					break
				}
			}
			c > -1 && a.splice(c, 1)
		},
		objectSplice: function(a, b) {
			for (var c, d = 0; d < a.length; d++) {
				var e = a[d];
				if (e.id == b) {
					c = d;
					break
				}
			}
			c > -1 && a.splice(c, 1)
		}
	},
	typeConversionUtil = {
		String2ArrayBuffer: function(a) {
			for (var a = btoa(unescape(encodeURIComponent(a))), b = new ArrayBuffer(a.length), c = new Uint8Array(b), d = 0, e = a.length; d < e; d++) c[d] = a.charCodeAt(d);
			return b
		},
		ArrayBuffer2String: function(a) {
			var b = String.fromCharCode.apply(null, new Uint8Array(a)),
				c = decodeURIComponent(escape(atob(b)));
			return c
		}
	};
!
function() {
	var a = {},
		b = {},
		c = function() {},
		d = {
			define: function(b, c, d) {
				if (!a[b]) {
					var e = {
						name: b,
						dependencies: c,
						factory: d
					};
					a[b] = e
				}
				return a[b]
			},
			use: function(b) {
				var d = a[b];
				if (!d.entity) {
					for (var e = [], f = 0; f < d.dependencies.length; f++) a[d.dependencies[f]].entity ? e.push(a[d.dependencies[f]].entity) : e.push(this.use(d.dependencies[f]));
					d.entity = d.factory.apply(c, e)
				}
				return d.entity
			},
			require: function(a, c) {
				function d() {
					for (var d = !0, e = 0; e < a.length; e++) if (!b[a[e]]) {
						d = !1;
						break
					}
					d && c()
				}
				for (var e = 0; e < a.length; e++) {
					var f = a[e];
					if (!b[f]) {
						var g = document.getElementsByTagName("head")[0],
							h = document.createElement("script");
						h.type = "text/javascript", h.async = "true", h.src = f + ".js", h.onload = function() {
							b[f] = !0, g.removeChild(h), d()
						}, g.appendChild(h)
					}
				}
			}
		};
	window.ModuleBase = d
}(), ModuleBase.define("Error", [], function() {
	var a = function(a, b) {
			"object" == typeof a && "undefined" == typeof b ? (this.code = a.code, this.message = a.message) : (this.code = a, this.message = b)
		};
	return a.prototype.errorShow = function() {
		return "error code:" + this.code + "; error message:" + this.message
	}, a
});
var cmdBuilder = dcodeIO.ProtoBuf.newBuilder({}).import({
	package: "room_pdu",
	messages: [{
		name: "Packet",
		fields: [{
			rule: "required",
			type: "RoomPduType",
			name: "type",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "priority",
			id: 2,
			options: {
			default:
				0
			}
		}, {
			rule: "required",
			type: "int32",
			name: "src",
			id: 3
		}, {
			rule: "required",
			type: "int32",
			name: "dst",
			id: 4,
			options: {
			default:
				0
			}
		}, {
			rule: "optional",
			type: "bytes",
			name: "body",
			id: 5
		}]
	}, {
		name: "MultiPacket",
		fields: [{
			rule: "repeated",
			type: "Packet",
			name: "packets",
			id: 1
		}]
	}, {
		name: "Webcam",
		fields: [{
			rule: "required",
			type: "string",
			name: "id",
			id: 1
		}, {
			rule: "optional",
			type: "string",
			name: "name",
			id: 2
		}, {
			rule: "required",
			type: "ResourceStatus",
			name: "status",
			id: 3
		}, {
			rule: "required",
			type: "SessionType",
			name: "type",
			id: 4
		}, {
			rule: "optional",
			type: "int32",
			name: "level",
			id: 5
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 6
		}, {
			rule: "optional",
			type: "CameraType",
			name: "ctype",
			id: 7
		}]
	}, {
		name: "Speaker",
		fields: [{
			rule: "required",
			type: "string",
			name: "id",
			id: 1
		}, {
			rule: "optional",
			type: "string",
			name: "name",
			id: 2
		}, {
			rule: "required",
			type: "ResourceStatus",
			name: "status",
			id: 3
		}, {
			rule: "required",
			type: "SessionType",
			name: "type",
			id: 4
		}, {
			rule: "optional",
			type: "int32",
			name: "level",
			id: 5
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 6
		}]
	}, {
		name: "Desktop",
		fields: [{
			rule: "required",
			type: "string",
			name: "id",
			id: 1
		}, {
			rule: "optional",
			type: "string",
			name: "name",
			id: 2
		}, {
			rule: "required",
			type: "ResourceStatus",
			name: "status",
			id: 3
		}, {
			rule: "required",
			type: "SessionType",
			name: "type",
			id: 4
		}, {
			rule: "optional",
			type: "int32",
			name: "level",
			id: 5
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 6
		}]
	}, {
		name: "DocFile",
		fields: [{
			rule: "required",
			type: "string",
			name: "id",
			id: 1
		}, {
			rule: "optional",
			type: "string",
			name: "name",
			id: 2
		}, {
			rule: "required",
			type: "ResourceStatus",
			name: "status",
			id: 3
		}, {
			rule: "required",
			type: "SessionType",
			name: "type",
			id: 4
		}, {
			rule: "required",
			type: "string",
			name: "uri",
			id: 5
		}]
	}, {
		name: "AddWebcamMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "Webcam",
			name: "webcam",
			id: 2
		}]
	}, {
		name: "RemoveWebcamMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "resource_id",
			id: 2
		}]
	}, {
		name: "AddSpeakerMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "Speaker",
			name: "speaker",
			id: 2
		}]
	}, {
		name: "RemoveSpeakerMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "resource_id",
			id: 2
		}]
	}, {
		name: "AddDocFileMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "DocFile",
			name: "docfile",
			id: 2
		}]
	}, {
		name: "RemoveDocFileMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "resource_id",
			id: 2
		}]
	}, {
		name: "RoomResourceInfo",
		fields: [{
			rule: "required",
			type: "string",
			name: "resource_id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "owner_id",
			id: 2
		}, {
			rule: "optional",
			type: "MediaStream",
			name: "stream",
			id: 3
		}, {
			rule: "optional",
			type: "MediaStream",
			name: "stream_assist1",
			id: 4
		}, {
			rule: "optional",
			type: "MediaStream",
			name: "stream_assist2",
			id: 5
		}, {
			rule: "optional",
			type: "int32",
			name: "publishQualities",
			id: 6
		}]
	}, {
		name: "RoomInfo",
		fields: [{
			rule: "repeated",
			type: "RoomResourceInfo",
			name: "resource_infos",
			id: 1
		}, {
			rule: "required",
			type: "RoomStatus",
			name: "room_status",
			id: 2,
			options: {
			default:
				"init_room"
			}
		}]
	}, {
		name: "UserPolicy",
		fields: [{
			rule: "optional",
			type: "bool",
			name: "join_chat",
			id: 1
		}, {
			rule: "optional",
			type: "bool",
			name: "join_audio",
			id: 2
		}, {
			rule: "optional",
			type: "bool",
			name: "join_video",
			id: 3
		}]
	}, {
		name: "JoinInfo",
		fields: [{
			rule: "repeated",
			type: "Webcam",
			name: "webcams",
			id: 1
		}, {
			rule: "repeated",
			type: "Speaker",
			name: "speakers",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "user_agent",
			id: 3
		}, {
			rule: "required",
			type: "UserPolicy",
			name: "user_policy",
			id: 4
		}]
	}, {
		name: "UserInfo",
		fields: [{
			rule: "optional",
			type: "string",
			name: "user_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "user_name",
			id: 2
		}, {
			rule: "required",
			type: "UserRole",
			name: "role",
			id: 3
		}, {
			rule: "required",
			type: "int32",
			name: "privileges",
			id: 4
		}, {
			rule: "required",
			type: "UserStatus",
			name: "status",
			id: 5
		}, {
			rule: "repeated",
			type: "Webcam",
			name: "webcams",
			id: 6
		}, {
			rule: "repeated",
			type: "Speaker",
			name: "speakers",
			id: 7
		}, {
			rule: "optional",
			type: "string",
			name: "user_agent",
			id: 8
		}, {
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 9
		}, {
			rule: "optional",
			type: "UserPolicy",
			name: "user_policy",
			id: 10
		}, {
			rule: "repeated",
			type: "Desktop",
			name: "desktops",
			id: 11
		}, {
			rule: "optional",
			type: "string",
			name: "user_data",
			id: 12
		}]
	}, {
		name: "MediaStream",
		fields: [{
			rule: "required",
			type: "string",
			name: "stream_name",
			id: 1
		}, {
			rule: "required",
			type: "MediaType",
			name: "type",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "sdp",
			id: 3
		}, {
			rule: "optional",
			type: "int32",
			name: "width",
			id: 4
		}, {
			rule: "optional",
			type: "int32",
			name: "height",
			id: 5
		}, {
			rule: "optional",
			type: "int32",
			name: "frame_rate",
			id: 6
		}, {
			rule: "optional",
			type: "int32",
			name: "payload",
			id: 7
		}]
	}, {
		name: "MediaStreamInfo",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "stream_id",
			id: 2
		}, {
			rule: "required",
			type: "MediaStream",
			name: "stream",
			id: 3
		}]
	}, {
		name: "ResourceIndiction",
		fields: [{
			rule: "required",
			type: "string",
			name: "resource_id",
			id: 1
		}, {
			rule: "required",
			type: "ResourceOpt",
			name: "opt",
			id: 2
		}, {
			rule: "required",
			type: "int32",
			name: "owner_id",
			id: 3
		}, {
			rule: "required",
			type: "int32",
			name: "operator_id",
			id: 4
		}, {
			rule: "optional",
			type: "string",
			name: "host_tocken",
			id: 5
		}]
	}, {
		name: "AddDesktopMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "Desktop",
			name: "desktop",
			id: 2
		}]
	}, {
		name: "UpdateSpeakerMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "resource_id",
			id: 2
		}, {
			rule: "required",
			type: "Speaker",
			name: "speaker",
			id: 3
		}]
	}, {
		name: "UpdateWebcamMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "resource_id",
			id: 2
		}, {
			rule: "required",
			type: "Webcam",
			name: "webcam",
			id: 3
		}]
	}, {
		name: "UpdateDesktopMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "resource_id",
			id: 2
		}, {
			rule: "required",
			type: "Desktop",
			name: "desktop",
			id: 3
		}]
	}, {
		name: "JoinReq",
		fields: [{
			rule: "optional",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "version",
			id: 2
		}, {
			rule: "required",
			type: "string",
			name: "room_tocken",
			id: 3
		}, {
			rule: "optional",
			type: "string",
			name: "user_id",
			id: 4
		}, {
			rule: "required",
			type: "string",
			name: "user_name",
			id: 5
		}, {
			rule: "optional",
			type: "JoinInfo",
			name: "join_info",
			id: 6
		}, {
			rule: "optional",
			type: "string",
			name: "password",
			id: 7
		}]
	}, {
		name: "JoinRep",
		fields: [{
			rule: "optional",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "result",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 3
		}, {
			rule: "optional",
			type: "RoomInfo",
			name: "room_info",
			id: 4
		}, {
			rule: "optional",
			type: "int32",
			name: "node_id",
			id: 5
		}, {
			rule: "optional",
			type: "UserInfo",
			name: "user_info",
			id: 6
		}]
	}, {
		name: "LeaveMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "reason",
			id: 2
		}]
	}, {
		name: "UpdateRoomStatusMsg",
		fields: [{
			rule: "required",
			type: "RoomStatus",
			name: "status",
			id: 1
		}]
	}, {
		name: "PubRoomResourceMsg",
		fields: [{
			rule: "required",
			type: "RoomResourceInfo",
			name: "info",
			id: 1
		}, {
			rule: "optional",
			type: "int32",
			name: "id",
			id: 2
		}]
	}, {
		name: "UnpubRoomResourceMsg",
		fields: [{
			rule: "required",
			type: "RoomResourceInfo",
			name: "info",
			id: 1
		}]
	}, {
		name: "SubRoomResourceMsg",
		fields: [{
			rule: "required",
			type: "RoomResourceInfo",
			name: "info",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "sub_node_id",
			id: 2
		}, {
			rule: "optional",
			type: "int32",
			name: "id",
			id: 3
		}]
	}, {
		name: "UnsubRoomResourceMsg",
		fields: [{
			rule: "required",
			type: "RoomResourceInfo",
			name: "info",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "sub_node_id",
			id: 2
		}]
	}, {
		name: "PubResourceReq",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "RoomResourceInfo",
			name: "info",
			id: 2
		}]
	}, {
		name: "PubResourceRep",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "RepResultType",
			name: "type",
			id: 2
		}, {
			rule: "optional",
			type: "int32",
			name: "reason",
			id: 3
		}]
	}, {
		name: "RoomKV",
		fields: [{
			rule: "required",
			type: "string",
			name: "key",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "value",
			id: 2
		}]
	}, {
		name: "RoomDataInfo",
		fields: [{
			rule: "required",
			type: "string",
			name: "room_id",
			id: 1
		}, {
			rule: "repeated",
			type: "RoomKV",
			name: "kvs",
			id: 2
		}]
	}, {
		name: "PubRoomResourceMsgRep",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "result",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 3
		}]
	}, {
		name: "SubRoomResourceMsgRep",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "result",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 3
		}]
	}, {
		name: "RoomResourceInfos",
		fields: [{
			rule: "repeated",
			type: "RoomResourceInfo",
			name: "resource_infos",
			id: 1
		}, {
			rule: "optional",
			type: "string",
			name: "room_id",
			id: 2
		}]
	}, {
		name: "UpdateStreamSsrcMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "stream_id",
			id: 2
		}, {
			rule: "required",
			type: "uint32",
			name: "old_ssrc",
			id: 3
		}, {
			rule: "required",
			type: "uint32",
			name: "new_ssrc",
			id: 4
		}]
	}, {
		name: "TextMsg",
		fields: [{
			rule: "required",
			type: "string",
			name: "content",
			id: 1
		}, {
			rule: "optional",
			type: "int32",
			name: "timestamp",
			id: 2
		}]
	}, {
		name: "DATA",
		fields: [{
			rule: "required",
			type: "bytes",
			name: "content",
			id: 1
		}]
	}, {
		name: "UserInfoMsg",
		fields: [{
			rule: "repeated",
			type: "UserInfo",
			name: "user",
			id: 1
		}]
	}, {
		name: "UserMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "UserMsgOpt",
			name: "opt",
			id: 2
		}, {
			rule: "optional",
			type: "int32",
			name: "reason",
			id: 3
		}, {
			rule: "optional",
			type: "int32",
			name: "opt_node_id",
			id: 4
		}]
	}, {
		name: "UpdateUserRolePriviledgeMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "old",
			id: 2
		}, {
			rule: "required",
			type: "int32",
			name: "new",
			id: 3
		}]
	}, {
		name: "UpdateUserStatusMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "UserStatus",
			name: "old",
			id: 2
		}, {
			rule: "required",
			type: "UserStatus",
			name: "new",
			id: 3
		}]
	}, {
		name: "UpdateUserRoleMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "UserRole",
			name: "old",
			id: 2
		}, {
			rule: "required",
			type: "UserRole",
			name: "new",
			id: 3
		}]
	}, {
		name: "UserIndiction",
		fields: [{
			rule: "required",
			type: "int32",
			name: "operator_id",
			id: 1
		}, {
			rule: "required",
			type: "RoomPduType",
			name: "type",
			id: 2
		}, {
			rule: "optional",
			type: "bytes",
			name: "body",
			id: 3
		}]
	}, {
		name: "UpdateUserDataMsg",
		fields: [{
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "user_data",
			id: 2
		}]
	}, {
		name: "RejoinRoomMsg",
		fields: [{
			rule: "required",
			type: "string",
			name: "room_id",
			id: 1
		}, {
			rule: "optional",
			type: "int32",
			name: "reason",
			id: 2
		}]
	}, {
		name: "CloseRoomMsg",
		fields: [{
			rule: "required",
			type: "string",
			name: "room_id",
			id: 1
		}, {
			rule: "optional",
			type: "int32",
			name: "reason",
			id: 2
		}]
	}, {
		name: "OfferReq",
		fields: [{
			rule: "optional",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "sdp",
			id: 2
		}, {
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 3
		}]
	}, {
		name: "OfferRep",
		fields: [{
			rule: "optional",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "result",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 3
		}, {
			rule: "optional",
			type: "string",
			name: "sdp",
			id: 4
		}, {
			rule: "optional",
			type: "int32",
			name: "node_id",
			id: 5
		}]
	}, {
		name: "CandidateMsg",
		fields: [{
			rule: "required",
			type: "string",
			name: "candidate",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "sdp_mline_index",
			id: 2
		}, {
			rule: "required",
			type: "string",
			name: "sdp_mid",
			id: 3
		}, {
			rule: "required",
			type: "int32",
			name: "node_id",
			id: 4
		}]
	}, {
		name: "SubRoomResourceReq",
		fields: [{
			rule: "optional",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "RoomResourceInfo",
			name: "info",
			id: 2
		}, {
			rule: "required",
			type: "int32",
			name: "sub_node_id",
			id: 3
		}]
	}, {
		name: "SubRoomResourceRep",
		fields: [{
			rule: "optional",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "result",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 3
		}, {
			rule: "optional",
			type: "RoomResourceInfo",
			name: "info",
			id: 4
		}]
	}, {
		name: "OpenReq",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "optional",
			type: "string",
			name: "access_tocken",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "signal_tocken",
			id: 3
		}, {
			rule: "optional",
			type: "string",
			name: "version",
			id: 4
		}]
	}, {
		name: "OpenRep",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "result",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 3
		}, {
			rule: "optional",
			type: "string",
			name: "signal_tocken",
			id: 4
		}, {
			rule: "optional",
			type: "int32",
			name: "ping_timeout",
			id: 5
		}, {
			rule: "optional",
			type: "int32",
			name: "ping_interval",
			id: 6
		}, {
			rule: "optional",
			type: "string",
			name: "version",
			id: 7
		}]
	}, {
		name: "InviteRoomReq",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "room_id",
			id: 2
		}, {
			rule: "required",
			type: "string",
			name: "sdp",
			id: 3
		}, {
			rule: "optional",
			type: "int32",
			name: "node_id",
			id: 4
		}]
	}, {
		name: "InviteRoomReq1",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "room_id",
			id: 2
		}, {
			rule: "required",
			type: "string",
			name: "version",
			id: 3
		}, {
			rule: "required",
			type: "string",
			name: "access_tocken",
			id: 4
		}, {
			rule: "optional",
			type: "string",
			name: "user_id",
			id: 5
		}, {
			rule: "required",
			type: "string",
			name: "user_name",
			id: 6
		}, {
			rule: "optional",
			type: "JoinInfo",
			name: "join_info",
			id: 7
		}, {
			rule: "optional",
			type: "string",
			name: "password",
			id: 8
		}, {
			rule: "optional",
			type: "int32",
			name: "node_id",
			id: 9
		}, {
			rule: "optional",
			type: "bool",
			name: "is_dtls",
			id: 10
		}, {
			rule: "optional",
			type: "string",
			name: "user_data",
			id: 11
		}, {
			rule: "optional",
			type: "string",
			name: "ice_ufrag",
			id: 12
		}, {
			rule: "optional",
			type: "string",
			name: "ice_pwd",
			id: 13
		}]
	}, {
		name: "RoomInfo1",
		fields: [{
			rule: "required",
			type: "string",
			name: "room_id",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "topic",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "owner_id",
			id: 3
		}, {
			rule: "optional",
			type: "string",
			name: "host_id",
			id: 4
		}, {
			rule: "optional",
			type: "bool",
			name: "has_pwd",
			id: 5
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 6
		}, {
			rule: "optional",
			type: "int32",
			name: "timezone",
			id: 7
		}, {
			rule: "optional",
			type: "int32",
			name: "start_time",
			id: 8
		}, {
			rule: "optional",
			type: "int32",
			name: "end_time",
			id: 9
		}, {
			rule: "optional",
			type: "RoomMode",
			name: "room_mode",
			id: 10
		}, {
			rule: "optional",
			type: "int32",
			name: "attendee_max",
			id: 11
		}, {
			rule: "optional",
			type: "int32",
			name: "bandwidth",
			id: 12
		}, {
			rule: "optional",
			type: "int32",
			name: "max_audio",
			id: 13
		}, {
			rule: "optional",
			type: "int32",
			name: "max_video",
			id: 14
		}, {
			rule: "optional",
			type: "string",
			name: "room_extend_id",
			id: 15
		}, {
			rule: "optional",
			type: "RoomStatus",
			name: "room_status",
			id: 16,
			options: {
			default:
				"init_room"
			}
		}]
	}, {
		name: "InviteRoomRep",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "result",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 3
		}, {
			rule: "optional",
			type: "string",
			name: "room_tocken",
			id: 4
		}, {
			rule: "optional",
			type: "string",
			name: "sdp",
			id: 5
		}, {
			rule: "optional",
			type: "RoomInfo1",
			name: "room_info",
			id: 6
		}]
	}, {
		name: "InviteRoomRep1",
		fields: [{
			rule: "required",
			type: "int32",
			name: "id",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "result",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "description",
			id: 3
		}, {
			rule: "optional",
			type: "string",
			name: "room_tocken",
			id: 4
		}, {
			rule: "optional",
			type: "RoomInfo1",
			name: "room_info",
			id: 5
		}, {
			rule: "optional",
			type: "string",
			name: "finger_print",
			id: 6
		}, {
			rule: "optional",
			type: "int32",
			name: "node_id",
			id: 7
		}, {
			rule: "optional",
			type: "int32",
			name: "ping_timeout",
			id: 8
		}, {
			rule: "optional",
			type: "int32",
			name: "ping_interval",
			id: 9
		}, {
			rule: "optional",
			type: "string",
			name: "ice_ufrag",
			id: 10
		}, {
			rule: "optional",
			type: "string",
			name: "ice_pwd",
			id: 11
		}, {
			rule: "optional",
			type: "UserRole",
			name: "role",
			id: 12
		}, {
			rule: "optional",
			type: "string",
			name: "setup",
			id: 13,
			options: {
			default:
				"active"
			}
		}]
	}, {
		name: "CandidateMsg1",
		fields: [{
			rule: "required",
			type: "string",
			name: "candidate",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "sdp_mline_index",
			id: 2
		}, {
			rule: "required",
			type: "string",
			name: "sdp_mid",
			id: 3
		}, {
			rule: "required",
			type: "string",
			name: "room_tocken",
			id: 4
		}]
	}, {
		name: "CloseMsg",
		fields: [{
			rule: "required",
			type: "string",
			name: "room_tocken",
			id: 1
		}]
	}, {
		name: "Point",
		fields: [{
			rule: "required",
			type: "int32",
			name: "x",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "y",
			id: 2
		}]
	}, {
		name: "color",
		fields: [{
			rule: "required",
			type: "int32",
			name: "a",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "r",
			id: 2
		}, {
			rule: "required",
			type: "int32",
			name: "g",
			id: 3
		}, {
			rule: "required",
			type: "int32",
			name: "b",
			id: 4
		}]
	}, {
		name: "Rect",
		fields: [{
			rule: "required",
			type: "int32",
			name: "left",
			id: 1
		}, {
			rule: "required",
			type: "int32",
			name: "right",
			id: 2
		}, {
			rule: "required",
			type: "int32",
			name: "top",
			id: 3
		}, {
			rule: "required",
			type: "int32",
			name: "bottom",
			id: 4
		}]
	}, {
		name: "AnnotationObject",
		fields: [{
			rule: "required",
			type: "string",
			name: "objectId",
			id: 1
		}, {
			rule: "required",
			type: "string",
			name: "annotationId",
			id: 2
		}, {
			rule: "required",
			type: "int32",
			name: "ownerNodeId",
			id: 3
		}, {
			rule: "required",
			type: "string",
			name: "ownerUserId",
			id: 4
		}, {
			rule: "required",
			type: "AnnotationType",
			name: "type",
			id: 5
		}, {
			rule: "required",
			type: "LineArrow",
			name: "arrow",
			id: 6
		}, {
			rule: "required",
			type: "int32",
			name: "lineWidth",
			id: 7
		}, {
			rule: "required",
			type: "color",
			name: "lineColor",
			id: 8
		}, {
			rule: "required",
			type: "color",
			name: "fillColor",
			id: 9
		}, {
			rule: "required",
			type: "Rect",
			name: "objectRect",
			id: 10
		}]
	}, {
		name: "Annotation2Point",
		fields: [{
			rule: "required",
			type: "AnnotationObject",
			name: "objectBase",
			id: 1
		}, {
			rule: "required",
			type: "Point",
			name: "start",
			id: 2
		}, {
			rule: "required",
			type: "Point",
			name: "end",
			id: 3
		}]
	}, {
		name: "AnnotationMultiPoint",
		fields: [{
			rule: "required",
			type: "AnnotationObject",
			name: "objectBase",
			id: 1
		}, {
			rule: "repeated",
			type: "Point",
			name: "points",
			id: 2
		}]
	}, {
		name: "AnnotationList",
		fields: [{
			rule: "required",
			type: "AnnotationObject",
			name: "objectBase",
			id: 1
		}, {
			rule: "repeated",
			type: "string",
			name: "eraserIds",
			id: 2
		}]
	}, {
		name: "AnnotationMsgInternal",
		fields: [{
			rule: "required",
			type: "uint32",
			name: "msg_type",
			id: 1
		}, {
			rule: "optional",
			type: "bytes",
			name: "annotation",
			id: 2
		}, {
			rule: "optional",
			type: "string",
			name: "annotationId",
			id: 3
		}, {
			rule: "optional",
			type: "int32",
			name: "srcNodeId",
			id: 4
		}, {
			rule: "optional",
			type: "int32",
			name: "dstNodeId",
			id: 5
		}]
	}, {
		name: "AnnotationMsg",
		fields: [{
			rule: "required",
			type: "uint32",
			name: "msg_type",
			id: 1
		}, {
			rule: "optional",
			type: "bytes",
			name: "annotation",
			id: 2
		}]
	}],
	enums: [{
		name: "RoomPduType",
		values: [{
			name: "RoomPduType_Unkonw",
			id: 0
		}, {
			name: "PING",
			id: 1
		}, {
			name: "PONG",
			id: 2
		}, {
			name: "MULTI_PACKET",
			id: 10
		}, {
			name: "ADD_WEBCAM_MSG",
			id: 1001
		}, {
			name: "REMOVE_WEBCAM_MSG",
			id: 1002
		}, {
			name: "ADD_SPEAKER_MSG",
			id: 1003
		}, {
			name: "REMOVE_SPEAKER_MSG",
			id: 1004
		}, {
			name: "ADD_DOC_MSG",
			id: 1005
		}, {
			name: "REMOVE_DOC_MSG",
			id: 1006
		}, {
			name: "VIDEO_INDICTION",
			id: 1007
		}, {
			name: "AUDIO_INDICTION",
			id: 1008
		}, {
			name: "ADD_DESKTOP_MSG",
			id: 1009
		}, {
			name: "UPDATE_SPEAKER_MSG",
			id: 1010
		}, {
			name: "UPDATE_WEBCAM_MSG",
			id: 1011
		}, {
			name: "UPDATE_DESKTOP_MSG",
			id: 1012
		}, {
			name: "JOIN_REQ",
			id: 2001
		}, {
			name: "JOIN_REP",
			id: 2002
		}, {
			name: "LEAVE_MSG",
			id: 2003
		}, {
			name: "UPDATE_ROOM_STATUS_MSG",
			id: 2004
		}, {
			name: "PUB_ROOM_RESOURCE_MSG",
			id: 2005
		}, {
			name: "UNPUB_ROOM_RESOURCE_MSG",
			id: 2006
		}, {
			name: "SUB_ROOM_RESOURCE_MSG",
			id: 2007
		}, {
			name: "UNSUB_ROOM_RESOURCE_MSG",
			id: 2008
		}, {
			name: "PUB_VIDEO_REQ",
			id: 2009
		}, {
			name: "PUB_AUDIO_REQ",
			id: 2010
		}, {
			name: "PUB_VIDEO_REP",
			id: 2011
		}, {
			name: "PUB_AUDIO_REP",
			id: 2012
		}, {
			name: "ROOM_DATA_INFO",
			id: 2013
		}, {
			name: "PUB_ROOM_RESOURCE_MSG_REP",
			id: 2014
		}, {
			name: "SUB_ROOM_RESOURCE_MSG_REP",
			id: 2015
		}, {
			name: "ROOM_RESOURCE_INFOS",
			id: 2016
		}, {
			name: "UPDATE_STREAM_SSRC_MSG",
			id: 2017
		}, {
			name: "PUBLIC_TEXT_MSG",
			id: 3001
		}, {
			name: "PRIVATE_TEXT_MSG",
			id: 3002
		}, {
			name: "PUBLIC_DATA",
			id: 3003
		}, {
			name: "PRIVATE_DATA",
			id: 3004
		}, {
			name: "USER_INFO_MSG",
			id: 2051
		}, {
			name: "USER_MSG",
			id: 2052
		}, {
			name: "UPDATA_USER_ROLE_PRIVILEDGE_MSG",
			id: 2053
		}, {
			name: "UPDATE_USER_STATUS_MSG",
			id: 2054
		}, {
			name: "UPDATE_USER_ROLE_MSG",
			id: 2055
		}, {
			name: "USER_INDICTION",
			id: 2056
		}, {
			name: "UPDATE_USER_DATA_MSG",
			id: 2057
		}, {
			name: "REJOIN_ROOM_MSG",
			id: 2058
		}, {
			name: "CLOSE_ROOM_MSG",
			id: 2059
		}, {
			name: "OFFER_REQ",
			id: 6001
		}, {
			name: "OFFER_REP",
			id: 6002
		}, {
			name: "CANDIDATE_MSG",
			id: 6003
		}, {
			name: "SUB_ROOM_RESOURCE_REQ",
			id: 6004
		}, {
			name: "SUB_ROOM_RESOURCE_REP",
			id: 6005
		}, {
			name: "OPEN_REQ",
			id: 7001
		}, {
			name: "OPEN_REP",
			id: 7002
		}, {
			name: "INVITE_ROOM_REQ",
			id: 7003
		}, {
			name: "INVITE_ROOM_REQ1",
			id: 7020
		}, {
			name: "INVITE_ROOM_REP",
			id: 7004
		}, {
			name: "INVITE_ROOM_REP1",
			id: 7021
		}, {
			name: "CANDIDATE_MSG1",
			id: 7005
		}, {
			name: "CLOSE_MSG",
			id: 7006
		}, {
			name: "ANNOTATION_MSG",
			id: 2100
		}]
	}, {
		name: "RoomStatus",
		values: [{
			name: "init_room",
			id: 1
		}, {
			name: "open_room",
			id: 2
		}, {
			name: "locked_room",
			id: 3
		}, {
			name: "closed_room",
			id: 4
		}]
	}, {
		name: "ResourceOpt",
		values: [{
			name: "pub",
			id: 1
		}, {
			name: "unpub",
			id: 2
		}, {
			name: "sub",
			id: 3
		}, {
			name: "unsub",
			id: 4
		}, {
			name: "mute",
			id: 5
		}, {
			name: "unmute",
			id: 6
		}, {
			name: "forbid",
			id: 7
		}, {
			name: "unforbid",
			id: 8
		}]
	}, {
		name: "ResourceStatus",
		values: [{
			name: "init",
			id: 1
		}, {
			name: "published",
			id: 2
		}, {
			name: "muted",
			id: 3
		}, {
			name: "forbided",
			id: 4
		}, {
			name: "subed",
			id: 5
		}]
	}, {
		name: "CameraType",
		values: [{
			name: "unknown",
			id: 0
		}, {
			name: "front",
			id: 1
		}, {
			name: "back",
			id: 2
		}]
	}, {
		name: "UserStatus",
		values: [{
			name: "online",
			id: 0
		}, {
			name: "offline",
			id: 1
		}]
	}, {
		name: "UserRole",
		values: [{
			name: "host",
			id: 1
		}, {
			name: "presenter",
			id: 2
		}, {
			name: "attendee",
			id: 3
		}]
	}, {
		name: "MediaType",
		values: [{
			name: "video",
			id: 1
		}, {
			name: "audio",
			id: 2
		}, {
			name: "desktop",
			id: 3
		}]
	}, {
		name: "SessionType",
		values: [{
			name: "Chat",
			id: 1
		}, {
			name: "Audio",
			id: 2
		}, {
			name: "Video",
			id: 3
		}, {
			name: "ShareScreen",
			id: 4
		}, {
			name: "ShareDoc",
			id: 5
		}, {
			name: "WhiteBoard",
			id: 6
		}]
	}, {
		name: "RepResultType",
		values: [{
			name: "allowed",
			id: 1
		}, {
			name: "rejected",
			id: 2
		}]
	}, {
		name: "UserMsgOpt",
		values: [{
			name: "leave",
			id: 1
		}, {
			name: "kickoff",
			id: 2
		}, {
			name: "server_kickoff",
			id: 3
		}]
	}, {
		name: "RoomMode",
		values: [{
			name: "free",
			id: 1
		}, {
			name: "host1",
			id: 2
		}, {
			name: "p2pfree",
			id: 3
		}, {
			name: "p2phost",
			id: 4
		}]
	}, {
		name: "LineArrow",
		values: [{
			name: "none",
			id: 1
		}, {
			name: "begin",
			id: 2
		}, {
			name: "end",
			id: 3
		}, {
			name: "arrow2",
			id: 4
		}]
	}, {
		name: "AnnotationType",
		values: [{
			name: "annotation_tool_mouse",
			id: 1
		}, {
			name: "annotation_tool_line",
			id: 2
		}, {
			name: "annotation_tool_rectangle",
			id: 3
		}, {
			name: "annotation_tool_ellipse",
			id: 4
		}, {
			name: "annotation_tool_polyline",
			id: 5
		}, {
			name: "annotation_tool_polygon",
			id: 6
		}, {
			name: "annotation_tool_hlight_point",
			id: 7
		}, {
			name: "annotation_tool_hlight_texttag",
			id: 8
		}, {
			name: "annotation_tool_eraser_line",
			id: 9
		}, {
			name: "annotation_tool_eraser_rectangle",
			id: 10
		}, {
			name: "annotation_tool_rhomb",
			id: 11
		}, {
			name: "annotation_tool_arrow",
			id: 12
		}, {
			name: "annotation_tool_success",
			id: 13
		}, {
			name: "annotation_tool_failure",
			id: 14
		}, {
			name: "annotation_tool_undo",
			id: 15
		}, {
			name: "annotation_tool_redo",
			id: 16
		}]
	}]
}).build();
ModuleBase.define("CmdProtobufCoded", [], function() {
	var a, b = function() {
			a = cmdBuilder.room_pdu
		};
	return b.prototype.getRoomPduTypeEnum = function() {
		var b = a.RoomPduType;
		return b
	}, b.prototype.getRoomStatusEnum = function() {
		var b = a.RoomStatus;
		return b
	}, b.prototype.getResourceOptEnum = function() {
		var b = a.ResourceOpt;
		return b
	}, b.prototype.getResourceStatusEnum = function() {
		var b = a.ResourceStatus;
		return b
	}, b.prototype.getCameraTypeEnum = function() {
		var b = a.CameraType;
		return b
	}, b.prototype.getUserStatusEnum = function() {
		var b = a.UserStatus;
		return b
	}, b.prototype.getUserRoleEnum = function() {
		var b = a.UserRole;
		return b
	}, b.prototype.getMediaTypeEnum = function() {
		var b = a.MediaType;
		return b
	}, b.prototype.getSessionTypeEnum = function() {
		var b = a.SessionType;
		return b
	}, b.prototype.getRepResultTypeEnum = function() {
		var b = a.RepResultType;
		return b
	}, b.prototype.getUserMsgOptEnum = function() {
		var b = a.UserMsgOpt;
		return b
	}, b.prototype.getRoomModeEnum = function() {
		var b = a.RoomMode;
		return b
	}, b.prototype.getLineArrowEnum = function() {
		var b = a.LineArrow;
		return b
	}, b.prototype.getAnnotationTypeEnum = function() {
		var b = a.AnnotationType;
		return b
	}, b.prototype.newWebcam = function() {
		var b = a.Webcam,
			c = new b;
		return c
	}, b.prototype.newWebcam = function(b, c, d, e) {
		var f = a.Webcam,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newSpeaker = function() {
		var b = a.Speaker,
			c = new b;
		return c
	}, b.prototype.newSpeaker = function(b, c, d, e) {
		var f = a.Speaker,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newDesktop = function() {
		var b = a.Desktop,
			c = new b;
		return c
	}, b.prototype.newDesktop = function(b, c, d, e) {
		var f = a.Desktop,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newDocFile = function() {
		var b = a.DocFile,
			c = new b;
		return c
	}, b.prototype.newDocFile = function(b, c, d, e, f) {
		var g = a.DocFile,
			h = new g(b, c, d, e, f);
		return h
	}, b.prototype.newAddWebcamMsg = function() {
		var b = a.AddWebcamMsg,
			c = new b;
		return c
	}, b.prototype.newAddWebcamMsg = function(b, c) {
		var d = a.AddWebcamMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newRemoveWebcamMsg = function() {
		var b = a.RemoveWebcamMsg,
			c = new b;
		return c
	}, b.prototype.newRemoveWebcamMsg = function(b, c) {
		var d = a.RemoveWebcamMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newAddSpeakerMsg = function() {
		var b = a.AddSpeakerMsg,
			c = new b;
		return c
	}, b.prototype.newAddSpeakerMsg = function(b, c) {
		var d = a.AddSpeakerMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newRemoveSpeakerMsg = function() {
		var b = a.RemoveSpeakerMsg,
			c = new b;
		return c
	}, b.prototype.newRemoveSpeakerMsg = function(b, c) {
		var d = a.RemoveSpeakerMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newAddDocFileMsg = function() {
		var b = a.AddDocFileMsg,
			c = new b;
		return c
	}, b.prototype.newAddDocFileMsg = function(b, c) {
		var d = a.AddDocFileMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newRemoveDocFileMsg = function() {
		var b = a.RemoveDocFileMsg,
			c = new b;
		return c
	}, b.prototype.newRemoveDocFileMsg = function(b, c) {
		var d = a.RemoveDocFileMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newRoomResourceInfo = function() {
		var b = a.RoomResourceInfo,
			c = new b;
		return c
	}, b.prototype.newRoomResourceInfo = function(b, c, d) {
		var e = a.RoomResourceInfo,
			f = new e(b, c, d);
		return f
	}, b.prototype.newRoomInfo = function() {
		var b = a.RoomInfo,
			c = new b;
		return c
	}, b.prototype.newRoomInfo = function(b, c) {
		var d = a.RoomInfo,
			e = new d(b, c);
		return e
	}, b.prototype.newUserPolicy = function() {
		var b = a.UserPolicy,
			c = new b;
		return c
	}, b.prototype.newUserPolicy = function(b, c, d) {
		var e = a.UserPolicy,
			f = new e(b, c, d);
		return f
	}, b.prototype.newJoinInfo = function() {
		var b = a.JoinInfo,
			c = new b;
		return c
	}, b.prototype.newJoinInfo = function(b, c, d, e) {
		var f = a.JoinInfo,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newUserInfo = function() {
		var b = a.UserInfo,
			c = new b;
		return c
	}, b.prototype.newUserInfo = function(b, c, d, e, f, g, h, i, j, k, l, m) {
		var n = a.UserInfo,
			o = new n(b, c, d, e, f, g, h, i, j, k, l, m);
		return o
	}, b.prototype.newMediaStream = function() {
		var b = a.MediaStream,
			c = new b;
		return c
	}, b.prototype.newMediaStream = function(b, c, d, e, f, g, h) {
		var i = a.MediaStream,
			j = new i;
		return j.stream_name = b, j.type = c, j.sdp = d, "undefined" != typeof e && 0 != e && (j.width = e), "undefined" != typeof f && 0 != f && (j.height = f), "undefined" != typeof g && 0 != g && (j.frame_rate = g), "undefined" != typeof h && (j.payload = h), j
	}, b.prototype.newMediaStreamInfo = function() {
		var b = a.MediaStreamInfo,
			c = new b;
		return c
	}, b.prototype.newMediaStreamInfo = function(b, c, d) {
		var e = a.MediaStreamInfo,
			f = new e(b, c, d);
		return f
	}, b.prototype.newResourceIndiction = function() {
		var b = a.ResourceIndiction,
			c = new b;
		return c
	}, b.prototype.newResourceIndiction = function(b, c, d, e, f) {
		var g = a.ResourceIndiction,
			h = new g(b, c, d, e, f);
		return h
	}, b.prototype.newAddDesktopMsg = function() {
		var b = a.AddDesktopMsg,
			c = new b;
		return c
	}, b.prototype.newAddDesktopMsg = function(b, c) {
		var d = a.AddDesktopMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newRemoveDesktopMsg = function() {
		var b = a.RemoveDesktopMsg,
			c = new b;
		return c
	}, b.prototype.newRemoveDesktopMsg = function(b, c) {
		var d = a.RemoveDesktopMsg,
			e = new d;
		return e
	}, b.prototype.newUpdateWebcamMsg = function() {
		var b = a.UpdateWebcamMsg,
			c = new b;
		return c
	}, b.prototype.newUpdateWebcamMsg = function(b, c, d) {
		var e = a.UpdateWebcamMsg,
			f = new e(b, c, d);
		return f
	}, b.prototype.newUpdateSpeakerMsg = function() {
		var b = a.UpdateSpeakerMsg,
			c = new b;
		return c
	}, b.prototype.newUpdateSpeakerMsg = function(b, c, d) {
		var e = a.UpdateSpeakerMsg,
			f = new e(b, c, d);
		return f
	}, b.prototype.newUpdateDesktopMsg = function() {
		var b = a.UpdateDesktopMsg,
			c = new b;
		return c
	}, b.prototype.newUpdateDesktopMsg = function(b, c, d) {
		var e = a.UpdateDesktopMsg,
			f = new e(b, c, d);
		return f
	}, b.prototype.newLeaveMsg = function() {
		var b = a.LeaveMsg,
			c = new b;
		return c
	}, b.prototype.newLeaveMsg = function(b, c) {
		var d = a.LeaveMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newUpdateRoomStatusMsg = function() {
		var b = a.UpdateRoomStatusMsg,
			c = new b;
		return c
	}, b.prototype.newUpdateRoomStatusMsg = function(b) {
		var c = a.UpdateRoomStatusMsg,
			d = new c(b);
		return d
	}, b.prototype.newPubRoomResourceMsg = function() {
		var b = a.PubRoomResourceMsg,
			c = new b;
		return c
	}, b.prototype.newPubRoomResourceMsg = function(b, c) {
		var d = a.PubRoomResourceMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newUnpubRoomResourceMsg = function() {
		var b = a.UnpubRoomResourceMsg,
			c = new b;
		return c
	}, b.prototype.newUnpubRoomResourceMsg = function(b) {
		var c = a.UnpubRoomResourceMsg,
			d = new c(b);
		return d
	}, b.prototype.newSubRoomResourceMsg = function() {
		var b = a.SubRoomResourceMsg,
			c = new b;
		return c
	}, b.prototype.newSubRoomResourceMsg = function(b, c, d) {
		var e = a.SubRoomResourceMsg,
			f = new e(b, c, d);
		return f
	}, b.prototype.newUnsubRoomResourceMsg = function() {
		var b = a.UnsubRoomResourceMsg,
			c = new b;
		return c
	}, b.prototype.newUnsubRoomResourceMsg = function(b, c) {
		var d = a.UnsubRoomResourceMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newPubResourceReq = function() {
		var b = a.PubResourceReq,
			c = new b;
		return c
	}, b.prototype.newPubResourceReq = function(b, c) {
		var d = a.PubResourceReq,
			e = new d(b, c);
		return e
	}, b.prototype.newPubResourceRep = function() {
		var b = a.PubResourceRep,
			c = new b;
		return c
	}, b.prototype.newPubResourceRep = function(b, c, d) {
		var e = a.PubResourceRep,
			f = new e(b, c, d);
		return f
	}, b.prototype.newRoomKV = function() {
		var b = a.RoomKV,
			c = new b;
		return c
	}, b.prototype.newRoomKV = function(b, c) {
		var d = a.RoomKV,
			e = new d(b, c);
		return e
	}, b.prototype.newRoomDataInfo = function() {
		var b = a.RoomDataInfo,
			c = new b;
		return c
	}, b.prototype.newRoomDataInfo = function(b, c) {
		var d = a.RoomDataInfo,
			e = new d(b, c);
		return e
	}, b.prototype.newTextMsg = function() {
		var b = a.TextMsg,
			c = new b;
		return c
	}, b.prototype.newTextMsg = function(b, c) {
		var d = a.TextMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newData = function() {
		var b = a.DATA,
			c = new b;
		return c
	}, b.prototype.newData = function(b) {
		var c = a.DATA,
			d = new c(b);
		return d
	}, b.prototype.newUserInfoMsg = function() {
		var b = a.UserInfoMsg,
			c = new b;
		return c
	}, b.prototype.newUserInfoMsg = function(b) {
		var c = a.UserInfoMsg,
			d = new c(b);
		return d
	}, b.prototype.newUserMsg = function() {
		var b = a.UserMsg,
			c = new b;
		return c
	}, b.prototype.newUserMsg = function(b, c, d) {
		var e = a.UserMsg,
			f = new e(b, c, d);
		return f
	}, b.prototype.newUpdateUserRolePriviledgeMsg = function() {
		var b = a.UpdateUserRolePriviledgeMsg,
			c = new b;
		return c
	}, b.prototype.newUpdateUserRolePriviledgeMsg = function(b, c, d) {
		var e = a.UpdateUserRolePriviledgeMsg,
			f = new e(b, c, d);
		return f
	}, b.prototype.newUpdateUserStatusMsg = function() {
		var b = a.UpdateUserStatusMsg,
			c = new b;
		return c
	}, b.prototype.newUpdateUserStatusMsg = function(b, c, d) {
		var e = a.UpdateUserStatusMsg,
			f = new e(b, c, d);
		return f
	}, b.prototype.newUpdateUserRoleMsg = function() {
		var b = a.UpdateUserRoleMsg,
			c = new b;
		return c
	}, b.prototype.newUpdateUserRoleMsg = function(b, c, d) {
		var e = a.UpdateUserRoleMsg,
			f = new e(b, c, d);
		return f
	}, b.prototype.newUserIndiction = function() {
		var b = a.UserIndiction,
			c = new b;
		return c
	}, b.prototype.newUserIndiction = function(b, c, d) {
		var e = a.UserIndiction,
			f = new e(b, c, d);
		return f
	}, b.prototype.newUpdateUserDataMsg = function() {
		var b = a.UpdateUserDataMsg,
			c = new b;
		return c
	}, b.prototype.newUpdateUserDataMsg = function(b, c) {
		var d = a.UpdateUserDataMsg,
			e = new d(b, c);
		return e
	}, b.prototype.newOfferReq = function() {
		var b = a.OfferReq,
			c = new b;
		return c
	}, b.prototype.newOfferReq = function(b, c, d) {
		var e = a.OfferReq,
			f = new e(b, c, d);
		return f
	}, b.prototype.newOfferRep = function() {
		var b = a.OfferRep,
			c = new b;
		return c
	}, b.prototype.newOfferRep = function(b, c, d, e, f) {
		var g = a.OfferRep,
			h = new g(b, c, d, e, f);
		return h
	}, b.prototype.newCandidateMsg = function() {
		var b = a.CandidateMsg,
			c = new b;
		return c
	}, b.prototype.newCandidateMsg = function(b, c, d, e) {
		var f = a.CandidateMsg,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newSubRoomResourceReq = function() {
		var b = a.SubRoomResourceReq,
			c = new b;
		return c
	}, b.prototype.newSubRoomResourceReq = function(b, c, d) {
		var e = a.SubRoomResourceReq,
			f = new e(b, c, d);
		return f
	}, b.prototype.newSubRoomResourceRep = function() {
		var b = a.SubRoomResourceRep,
			c = new b;
		return c
	}, b.prototype.newSubRoomResourceRep = function(b, c, d, e) {
		var f = a.SubRoomResourceRep,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newOpenReq = function() {
		var b = a.OpenReq,
			c = new b;
		return c
	}, b.prototype.newOpenReq = function(b, c, d, e) {
		var f = a.OpenReq,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newInviteRoomReq = function() {
		var b = a.InviteRoomReq,
			c = new b;
		return c
	}, b.prototype.newInviteRoomReq = function(b, c, d, e) {
		var f = a.InviteRoomReq,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newInviteRoomReq1 = function() {
		var b = a.InviteRoomReq1,
			c = new b;
		return c
	}, b.prototype.newInviteRoomReq1 = function(b, c, d, e, f, g, h, i, j) {
		var k = a.InviteRoomReq1,
			l = new k(b, c, d, e, f, g, h, i, j);
		return l.is_dtls = !0, l
	}, b.prototype.newCandidateMsg1 = function() {
		var b = a.CandidateMsg1,
			c = new b;
		return c
	}, b.prototype.newCandidateMsg1 = function(b, c, d, e) {
		var f = a.CandidateMsg1,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newCloseMsg = function() {
		var b = a.CloseMsg,
			c = new b;
		return c
	}, b.prototype.newCloseMsg = function(b) {
		var c = a.CloseMsg,
			d = new c(b);
		return d
	}, b.prototype.newPoint = function() {
		var b = a.Point,
			c = new b;
		return c
	}, b.prototype.newPoint = function(b, c) {
		var d = a.Point,
			e = new d(b, c);
		return e
	}, b.prototype.newcolor = function() {
		var b = a.color,
			c = new b;
		return c
	}, b.prototype.newcolor = function(b, c, d, e) {
		var f = a.color,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newRect = function() {
		var b = a.Rect,
			c = new b;
		return c
	}, b.prototype.newRect = function(b, c, d, e) {
		var f = a.Rect,
			g = new f(b, c, d, e);
		return g
	}, b.prototype.newAnnotationObject = function() {
		var b = a.AnnotationObject,
			c = new b;
		return c
	}, b.prototype.newAnnotationObject = function(b, c, d, e, f, g, h, i, j, k) {
		var l = a.AnnotationObject,
			m = new l(b, c, d, e, f, g, h, i, j, k);
		return m
	}, b.prototype.newAnnotation2Point = function() {
		var b = a.Annotation2Point,
			c = new b;
		return c
	}, b.prototype.newAnnotation2Point = function(b, c, d) {
		var e = a.Annotation2Point,
			f = new e(b, c, d);
		return f
	}, b.prototype.newAnnotationMultiPoint = function() {
		var b = a.AnnotationMultiPoint,
			c = new b;
		return c
	}, b.prototype.newAnnotationMultiPoint = function(b, c) {
		var d = a.AnnotationMultiPoint,
			e = new d(b, c);
		return e
	}, b.prototype.newAnnotationList = function() {
		var b = a.AnnotationList,
			c = new b;
		return c
	}, b.prototype.newAnnotationList = function(b, c) {
		var d = a.AnnotationList,
			e = new d(b, c);
		return e
	}, b.prototype.newAnnotationMsgInternal = function() {
		var b = a.AnnotationMsgInternal,
			c = new b;
		return c
	}, b.prototype.newAnnotationMsgInternal = function(b, c, d, e, f) {
		var g = a.AnnotationMsgInternal,
			h = new g(b, c, d, e, f);
		return h
	}, b.prototype.newAnnotationMsg = function() {
		var b = a.AnnotationMsg,
			c = new b;
		return c
	}, b.prototype.newAnnotationMsg = function(b, c) {
		var d = a.AnnotationMsg,
			e = new d(b, c);
		return e
	}, b.prototype.serverVersionCompatible = function(a) {
		var b = new ArrayBuffer(10),
			c = new Int8Array(b);
		c[0] = 88, c[1] = "3".charCodeAt(), c[2] = "t".charCodeAt(), c[3] = "e".charCodeAt(), c[4] = "e".charCodeAt(), c[5] = "a".charCodeAt(), c[6] = "v".charCodeAt(), c[7] = "d".charCodeAt(), c[8] = 2, c[9] = 1;
		for (var d = new Int8Array(a), e = 10 + d.length, f = new ArrayBuffer(e), g = new Int8Array(f), h = 0; h < 10; h++) g[h] = c[h];
		for (var i = 0; i < d.length; i++) {
			var j = i + 10;
			g[j] = d[i]
		}
		return f
	}, b.prototype.encodedPacket = function(b, c, d, e, f) {
		var g = a.Packet,
			h = null;
		null != f && (h = f.toArrayBuffer());
		var i = new g(b, c, d, e, h),
			j = i.toArrayBuffer();
		return b == this.getRoomPduTypeEnum().OPEN_REQ && (j = this.serverVersionCompatible(j)), j
	}, b.prototype.decodePacket = function(b) {
		var c = a.Packet,
			d = c.decode(b);
		return d
	}, b.prototype.decodeUserMsg = function(b) {
		var c = a.UserMsg,
			d = c.decode(b);
		return d
	}, b.prototype.decodeBody = function(b) {
		var c = a.RoomPduType,
			d = a.Packet,
			e = d.decode(b),
			f = e.type;
		if (f == c.OPEN_REP) {
			var g = a.OpenRep,
				h = g.decode(e.body);
			return h
		}
		if (f == c.INVITE_ROOM_REP1) {
			var i = a.InviteRoomRep1,
				j = i.decode(e.body);
			return j
		}
		if (f == c.ROOM_RESOURCE_INFOS) {
			var k = a.RoomResourceInfos,
				l = k.decode(e.body);
			return l
		}
		if (f == c.CANDIDATE_MSG1) {
			var m = a.CandidateMsg1,
				n = m.decode(e.body);
			return n
		}
		if (f == c.PUB_RESOURCE_REP) {
			var o = a.PubResourceRep,
				p = o.decode(e.body);
			return p
		}
		if (f == c.PRIVATE_TEXT_MSG) {
			var q = a.TextMsg,
				r = q.decode(e.body);
			return r
		}
		if (f == c.PUBLIC_TEXT_MSG) {
			var q = a.TextMsg,
				r = q.decode(e.body);
			return r
		}
		if (f == c.PRIVATE_DATA) {
			var s = a.DATA,
				b = s.decode(e.body);
			return b
		}
		if (f == c.PUBLIC_DATA) {
			var s = a.DATA,
				b = s.decode(e.body);
			return b
		}
		if (f == c.ROOM_DATA_INFO) {
			var t = a.RoomDataInfo,
				u = t.decode(e.body);
			return u
		}
		if (f == c.UPDATE_USER_DATA_MSG) {
			var v = a.UpdateUserDataMsg,
				w = v.decode(e.body);
			return w
		}
		if (f == c.USER_INFO_MSG) {
			var x = a.UserInfoMsg;
			if (null != e.body) {
				var y = x.decode(e.body);
				return y
			}
			return null
		}
		if (f == c.USER_MSG) {
			var z = a.UserMsg,
				A = z.decode(e.body);
			return A
		}
		if (f == c.USER_INDICTION) {
			var B = a.UserIndiction,
				C = B.decode(e.body);
			return C
		}
		if (f == c.UPDATA_USER_ROLE_PRIVILEDGE_MSG) {
			var D = a.UpdateUserRolePriviledgeMsg,
				E = D.decode(e.body);
			return E
		}
		if (f == c.ADD_WEBCAM_MSG) {
			var F = a.AddWebcamMsg,
				G = F.decode(e.body);
			return G
		}
		if (f == c.ADD_SPEAKER_MSG) {
			var H = a.AddSpeakerMsg,
				I = H.decode(e.body);
			return I
		}
		if (f == c.ADD_DESKTOP_MSG) {
			var J = a.AddDesktopMsg,
				K = J.decode(e.body);
			return K
		}
		if (f == c.REMOVE_WEBCAM_MSG) {
			var L = a.RemoveWebcamMsg,
				M = L.decode(e.body);
			return M
		}
		if (f == c.REMOVE_SPEAKER_MSG) {
			var N = a.RemoveSpeakerMsg,
				O = N.decode(e.body);
			return O
		}
		if (f == c.UPDATE_SPEAKER_MSG) {
			var P = a.UpdateSpeakerMsg,
				Q = P.decode(e.body);
			return Q
		}
		if (f == c.UPDATE_WEBCAM_MSG) {
			var R = a.UpdateWebcamMsg,
				S = R.decode(e.body);
			return S
		}
		if (f == c.UPDATE_DESKTOP_MSG) {
			var T = a.UpdateDesktopMsg,
				U = T.decode(e.body);
			return U
		}
		if (f == c.PUB_ROOM_RESOURCE_MSG) {
			var V = a.PubRoomResourceMsg,
				W = V.decode(e.body);
			return W
		}
		if (f == c.PUB_ROOM_RESOURCE_MSG_REP) {
			var X = a.PubRoomResourceMsgRep,
				Y = X.decode(e.body);
			return Y
		}
		if (f == c.UNPUB_ROOM_RESOURCE_MSG) {
			var Z = a.UnpubRoomResourceMsg,
				$ = Z.decode(e.body);
			return $
		}
		if (f == c.PUB_VIDEO_REQ || f == c.PUB_AUDIO_REQ) {
			var _ = a.PubResourceReq,
				aa = _.decode(e.body);
			return aa
		}
		if (f == c.PUB_VIDEO_REP || f == c.PUB_AUDIO_REP) {
			var o = a.PubResourceRep,
				p = o.decode(e.body);
			return p
		}
		if (f == c.VIDEO_INDICTION) {
			var ba = a.ResourceIndiction,
				ca = ba.decode(e.body);
			return ca
		}
		if (f == c.AUDIO_INDICTION) {
			var ba = a.ResourceIndiction,
				ca = ba.decode(e.body);
			return ca
		}
		if (f == c.OFFER_REQ) {
			var da = a.OfferReq,
				ea = da.decode(e.body);
			return ea
		}
		if (f == c.OFFER_REP) {
			var fa = a.OfferRep,
				ga = fa.decode(e.body);
			return ga
		}
		if (f == c.CANDIDATE_MSG) {
			var ha = a.CandidateMsg,
				ia = ha.decode(e.body);
			return ia
		}
		if (f == c.SUB_ROOM_RESOURCE_REQ) {
			var ja = a.SubRoomResourceReq,
				ka = ja.decode(e.body);
			return ka
		}
		if (f == c.SUB_ROOM_RESOURCE_REP) {
			var la = a.SubRoomResourceRep,
				ma = la.decode(e.body);
			return ma
		}
		if (f == c.SUB_ROOM_RESOURCE_MSG) {
			var na = a.SubRoomResourceMsg,
				oa = na.decode(e.body);
			return oa
		}
		if (f == c.UNSUB_ROOM_RESOURCE_MSG) {
			var pa = a.UnsubRoomResourceMsg,
				qa = pa.decode(e.body);
			return qa
		}
	}, b
});
var RTCBrowserType = {
	RTC_BROWSER_CHROME: "rtc_browser.chrome",
	RTC_BROWSER_FIREFOX: "rtc_browser.firefox"
},
	keyMap = {};
keyMap[RTCBrowserType.RTC_BROWSER_FIREFOX] = {
	ssrc: "ssrc",
	packetsReceived: "packetsReceived",
	packetsLost: "packetsLost",
	packetsSent: "packetsSent",
	bytesReceived: "bytesReceived",
	bytesSent: "bytesSent"
}, keyMap[RTCBrowserType.RTC_BROWSER_CHROME] = {
	ssrc: "ssrc",
	packetsReceived: "packetsReceived",
	packetsLost: "packetsLost",
	packetsSent: "packetsSent",
	bytesReceived: "bytesReceived",
	bytesSent: "bytesSent",
	receiveBandwidth: "googAvailableReceiveBandwidth",
	sendBandwidth: "googAvailableSendBandwidth",
	remoteAddress: "googRemoteAddress",
	transportType: "googTransportType",
	localAddress: "googLocalAddress",
	activeConnection: "googActiveConnection",
	googFrameHeightReceived: "googFrameHeightReceived",
	googFrameWidthReceived: "googFrameWidthReceived",
	googFrameHeightSent: "googFrameHeightSent",
	googFrameWidthSent: "googFrameWidthSent",
	audioInputLevel: "audioInputLevel",
	audioOutputLevel: "audioOutputLevel"
};
var connectionQualityValues = {
	98: "18px",
	81: "15px",
	64: "11px",
	47: "7px",
	30: "3px",
	0: "0px"
};
PeerStats.bandwidth = {}, PeerStats.bitrate = {}, PeerStats.packetLoss = null, PeerStats.transport = [], PeerStats.resolutions = [], PeerStats.prototype.setSsrcLoss = function(a, b) {
	this.ssrc2Loss[a] = b
}, PeerStats.prototype.setSsrcResolution = function(a, b) {
	null === b && this.ssrc2resolution[a] ? delete this.ssrc2resolution[a] : null !== b && (this.ssrc2resolution[a] = b)
}, PeerStats.prototype.setSsrcBitrate = function(a, b) {
	this.ssrc2bitrate[a] ? (this.ssrc2bitrate[a].download += b.download, this.ssrc2bitrate[a].upload += b.upload) : this.ssrc2bitrate[a] = b
}, PeerStats.prototype.setSsrcAudioLevel = function(a, b) {
	this.ssrc2AudioLevel[a] = formatAudioLevel(b)
}, ConnectionInfoCollector.prototype.start = function() {
	var a = this;
	this.statsIntervalId = setInterval(function() {
		a.peerconnection.getStats(function(b) {
			var c = null;
			b && b.result && "function" == typeof b.result ? c = b.result() : "firefox" == webrtcDetectedBrowser ? c = b : "Internet Explorer" == webrtcDetectedBrowser && (c = b.result()), a.currentStatsReport = c;
			try {
				a.processStatsReport()
			} catch (a) {
				log.error("Unsupported key:" + a, a)
			}
			a.baselineStatsReport = a.currentStatsReport
		}, a.errorCallback)
	}, this.statsInterval)
}, ConnectionInfoCollector.prototype.processStatsReport = function() {
	if (this.baselineStatsReport) {
		PeerStats.transport = [], PeerStats.resolutions = [];
		for (var a in this.currentStatsReport) {
			var b = this.currentStatsReport[a];
			try {
				(getStatValue(b, "receiveBandwidth") || getStatValue(b, "sendBandwidth")) && (PeerStats.bandwidth = {
					download: Math.round(getStatValue(b, "receiveBandwidth") / 1e3),
					upload: Math.round(getStatValue(b, "sendBandwidth") / 1e3)
				})
			} catch (a) {}
			if ("googCandidatePair" != b.type) {
				if ("candidatepair" == b.type) {
					if ("succeeded" == b.state) continue;
					var c = this.currentStatsReport[b.localCandidateId],
						d = this.currentStatsReport[b.remoteCandidateId];
					PeerStats.transport.push({
						localip: c.ipAddress + ":" + c.portNumber,
						ip: d.ipAddress + ":" + d.portNumber,
						type: c.transport
					})
				}
				if ("ssrc" == b.type || "outboundrtp" == b.type || "inboundrtp" == b.type) {
					var e = this.baselineStatsReport[a];
					if (e) {
						var f = getStatValue(b, "ssrc");
						if (f && (this.jid || !(Date.now() - b.timestamp < 3e3))) {
							var g = this.jid2stats[this.jid];
							g || (g = new PeerStats, this.jid2stats[this.jid] = g);
							var h = !0,
								i = "packetsReceived";
							if (getStatValue(b, i) || (h = !1, i = "packetsSent", getStatValue(b, i))) {
								var j = getStatValue(b, i);
								(!j || j < 0) && (j = 0);
								var k = getStatValue(e, i);
								(!k || k < 0) && (k = 0);
								var l = j - k;
								(!l || l < 0) && (l = 0);
								var m = getStatValue(b, "packetsLost");
								(!m || m < 0) && (m = 0);
								var n = getStatValue(e, "packetsLost");
								(!n || n < 0) && (n = 0);
								var o = m - n;
								(!o || o < 0) && (o = 0);
								var p = l + o;
								g.setSsrcLoss(f, {
									packetsTotal: p,
									packetsLost: o,
									isDownloadStream: h
								});
								var q = 0,
									r = 0;
								getStatValue(b, "bytesReceived") && (q = getStatValue(b, "bytesReceived") - getStatValue(e, "bytesReceived")), getStatValue(b, "bytesSent") && (r = getStatValue(b, "bytesSent") - getStatValue(e, "bytesSent"));
								var s = Math.round((b.timestamp - e.timestamp) / 1e3);
								q = q <= 0 || s <= 0 ? 0 : Math.round(8 * q / s / 1e3), r = r <= 0 || s <= 0 ? 0 : Math.round(8 * r / s / 1e3), g.setSsrcBitrate(f, {
									download: q,
									upload: r
								});
								var t = {
									height: null,
									width: null
								};
								try {
									getStatValue(b, "googFrameHeightSent") && getStatValue(b, "googFrameWidthSent") && (t.height = getStatValue(b, "googFrameHeightSent"), t.width = getStatValue(b, "googFrameWidthSent"))
								} catch (a) {}
								t.height && t.width ? g.setSsrcResolution(f, t) : g.setSsrcResolution(f, null)
							}
						}
					}
				}
			} else {
				var u, v, w, x;
				try {
					u = getStatValue(b, "remoteAddress"), v = getStatValue(b, "transportType"), w = getStatValue(b, "localAddress"), x = getStatValue(b, "activeConnection")
				} catch (a) {}
				if (!u || !v || !w || "true" != x) continue;
				for (var y = !1, z = 0; z < PeerStats.transport.length; z++) PeerStats.transport[z].ip == u && PeerStats.transport[z].type == v && PeerStats.transport[z].localip == w && (y = !0);
				if (y) continue;
				PeerStats.transport.push({
					localip: w,
					ip: u,
					type: v
				})
			}
		}
		var A = this,
			B = {
				download: 0,
				upload: 0
			},
			C = {
				download: 0,
				upload: 0
			},
			D = 0,
			E = 0,
			F = {};
		Object.keys(this.jid2stats).forEach(function(a) {
			Object.keys(A.jid2stats[a].ssrc2Loss).forEach(function(b) {
				var c = "upload";
				A.jid2stats[a].ssrc2Loss[b].isDownloadStream && (c = "download"), B[c] += A.jid2stats[a].ssrc2Loss[b].packetsTotal, C[c] += A.jid2stats[a].ssrc2Loss[b].packetsLost
			}), Object.keys(A.jid2stats[a].ssrc2bitrate).forEach(function(b) {
				D += A.jid2stats[a].ssrc2bitrate[b].download, E += A.jid2stats[a].ssrc2bitrate[b].upload, delete A.jid2stats[a].ssrc2bitrate[b]
			}), F[a] = A.jid2stats[a].ssrc2resolution
		}), PeerStats.bitrate = {
			upload: E,
			download: D
		}, PeerStats.packetLoss = {
			total: calculatePacketLoss(C.download + C.upload, B.download + B.upload),
			download: calculatePacketLoss(C.download, B.download),
			upload: calculatePacketLoss(C.upload, B.upload)
		}, PeerStats.resolutions = F, this.generateText()
	}
}, ConnectionInfoCollector.prototype.generateText = function() {
	var a, b, c, d, e, f, g, h, j, k, l, m, n;
	null === PeerStats.bitrate ? (b = "N/A", c = "N/A") : (b = PeerStats.bitrate.download ? PeerStats.bitrate.download + " Kbps" : "N/A", c = PeerStats.bitrate.upload ? PeerStats.bitrate.upload + " Kbps" : "N/A"), null === PeerStats.packetLoss ? (d = "N/A", e = "N/A") : (d = (null !== PeerStats.packetLoss.download ? PeerStats.packetLoss.download : "N/A") + "%", e = (null !== PeerStats.packetLoss.upload ? PeerStats.packetLoss.upload : "N/A") + "%");
	var o = null;
	if (PeerStats.resolutions && null != this.jid) {
		Object.keys(PeerStats.resolutions);
		for (var p in PeerStats.resolutions) o = PeerStats.resolutions[p]
	}
	if (f = "N/A", o) {
		var q = 0,
			r = 0;
		for (i in o) {
			var s = o[i];
			s && s.height && s.width && (q += parseInt(s.width), r += parseInt(s.height))
		}
		0 != q && 0 != r && (f = q + "x" + r)
	}
	if (null === PeerStats.bandwidth ? (g = "N/A", h = "N/A") : (g = PeerStats.bandwidth.download ? PeerStats.bandwidth.download + " Kbps" : "N/A", h = PeerStats.bandwidth.upload ? PeerStats.bandwidth.upload + " Kbps" : "N/A"), PeerStats.transport && 0 !== PeerStats.transport.length) {
		var t = {
			remoteIP: [],
			localIP: [],
			remotePort: [],
			localPort: []
		};
		for (i = 0; i < PeerStats.transport.length; i++) {
			var u = getIP(PeerStats.transport[i].ip),
				v = getPort(PeerStats.transport[i].ip),
				w = getIP(PeerStats.transport[i].localip),
				x = getPort(PeerStats.transport[i].localip);
			t.remoteIP.indexOf(u) == -1 && t.remoteIP.push(u), t.remotePort.indexOf(v) == -1 && t.remotePort.push(v), t.localIP.indexOf(w) == -1 && t.localIP.push(w), t.localPort.indexOf(x) == -1 && t.localPort.push(x)
		}
		l = getStringFromArray(t.localIP), m = getStringFromArray(t.localPort), j = getStringFromArray(t.remoteIP), k = getStringFromArray(t.remotePort)
	} else;
	var y = 100 - PeerStats.packetLoss.total;
	for (var z in connectionQualityValues) y >= z && (a = connectionQualityValues[z]);
	var A = {};
	A.downloadBitrate = b, A.uploadBitrate = c;
	var B = {};
	B.downloaPacketLoss = d, B.uploadPacketLoss = e;
	var C = {};
	C.downloadBandwidth = g, C.uploadBandwidth = h, PeerStats.transport[0] && (n = PeerStats.transport[0].type);
	var D = {};
	D.connectionQuality = a, D.bitrate = A, D.packetLoss = B, D.resolution = f, D.bandwidth = C, D.localaddress = l, D.localport = m, D.remoteaddress = j, D.remoteport = k, D.transport = n, null != room ? room.eventEmitter.emit(RoomCallback.connection_indicator, D) : this.stop()
}, ConnectionInfoCollector.prototype.errorCallback = function(a) {
	log.error("StatsCollector.errorCallback().Get stats error", a), this.stop()
}, ConnectionInfoCollector.prototype.stop = function() {
	this.statsIntervalId && (clearInterval(this.statsIntervalId), this.statsIntervalId = null)
}, AudioLevel.prototype.start = function(a) {
	var b = when.defer(),
		c = this;
	return a && (c.audioLevelsIntervalMilis = a), this.audioLevelsIntervalId = setInterval(function() {
		c.peerconnection.getStats(function(a) {
			var d = null;
			a && a.result && "function" == typeof a.result ? d = a.result() : "firefox" == webrtcDetectedBrowser ? d = a : "Internet Explorer" == webrtcDetectedBrowser && (d = a.result()), c.currentAudioLevelsReport = d, c.processAudioLevelReport(), c.baselineAudioLevelsReport = c.currentAudioLevelsReport, b.resolve()
		}, function(a) {
			log.error("StatsCollector.errorCallback().Get stats error", a), b.reject(a)
		})
	}, c.audioLevelsIntervalMilis), b.promise
}, AudioLevel.prototype.stop = function() {
	var a = when.defer();
	return this.audioLevelsIntervalId ? (clearInterval(this.audioLevelsIntervalId), this.audioLevelsIntervalId = null, a.resolve()) : a.reject(), a.promise
}, AudioLevel.prototype.processAudioLevelReport = function() {
	if (this.baselineAudioLevelsReport) for (var a in this.currentAudioLevelsReport) {
		var b = this.currentAudioLevelsReport[a];
		if ("ssrc" == b.type) {
			var c = this.baselineAudioLevelsReport[a],
				d = getStatValue(b, "ssrc");
			if (c) if (d) {
				var e = !getStatValue(b, "packetsReceived");
				try {
					var f = getStatValue(c, "audioInputLevel"),
						g = getStatValue(c, "audioOutputLevel"),
						h = getStatValue(b, "audioInputLevel"),
						i = getStatValue(b, "audioOutputLevel")
				} catch (a) {
					return loger.error("Audio Levels are not available in the statistics."), void clearInterval(this.audioLevelsIntervalId)
				}
				if (h && h > 0 && f != h && e && room.selfUser.audio.setAudioLevel(h), i && i > 0 && g != i) {
					var j = room.audioSsrc2user[d];
					!e && j && j.audio && j.audio.setAudioLevel(i)
				}
			} else Date.now() - b.timestamp < 3e3 && log.error("No ssrc: ");
			else log.debug(d + " not enough data")
		}
	}
};
var WEBAUDIO_ANALYZER_FFT_SIZE = 2048,
	WEBAUDIO_ANALYZER_SMOOTING_TIME = .8;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = null;
LocalStatsCollector.prototype.start = function() {
	if (window.AudioContext && !context && (context = new AudioContext, context.suspend()), context) {
		context.resume();
		var a = context.createAnalyser();
		a.smoothingTimeConstant = WEBAUDIO_ANALYZER_SMOOTING_TIME, a.fftSize = WEBAUDIO_ANALYZER_FFT_SIZE;
		var b = context.createMediaStreamSource(this.stream);
		b.connect(a);
		var c = this;
		this.intervalId = setInterval(function() {
			var b = new Uint8Array(a.frequencyBinCount);
			a.getByteTimeDomainData(b);
			var d = timeDomainDataToAudioLevel(b);
			d != c.audioLevel && (c.audioLevel = animateLevel(d, c.audioLevel), c.callback(c.audioLevel))
		}, this.intervalMilis)
	}
}, LocalStatsCollector.prototype.stop = function() {
	this.intervalId && (clearInterval(this.intervalId), this.intervalId = null)
}, ModuleBase.define("BrowserInfo", [], function(a) {
	var a = function() {};
	return a.prototype.getBrowserInfo = function() {
		function a(a, b) {
			var c = window.external || {};
			for (var d in c) if (a.test(b ? c[d] : d)) return !0;
			return !1
		}
		var b, c, d, e = (navigator.appVersion, navigator.userAgent),
			f = navigator.appName,
			g = "" + parseFloat(navigator.appVersion),
			h = "",
			i = "";
		(c = e.indexOf("OPR/")) != -1 ? (f = "Opera", g = e.substring(c + 4)) : (c = e.indexOf("Opera")) !== -1 ? (f = "Opera", g = e.substring(c + 6), (c = e.indexOf("Version")) !== -1 && (g = e.substring(c + 8))) : (c = e.indexOf("MSIE")) !== -1 ? (f = "IE", g = e.substring(c + 5)) : (c = e.indexOf("Chrome")) !== -1 ? (f = "Chrome", g = e.substring(c + 7)) : (c = e.indexOf("Safari")) !== -1 ? (f = "Safari", g = e.substring(c + 7), (c = e.indexOf("Version")) !== -1 && (g = e.substring(c + 8))) : (c = e.indexOf("Firefox")) !== -1 ? (f = "Firefox", g = e.substring(c + 8)) : (b = e.lastIndexOf(" ") + 1) < (c = e.lastIndexOf("/")) && (f = e.substring(b, c), g = e.substring(c + 1), f.toLowerCase() === f.toUpperCase() && (f = navigator.appName));
		var j = !(navigator.userAgent.indexOf("Edge") === -1 || !navigator.msSaveOrOpenBlob && !navigator.msSaveBlob),
			k = /QQBrowser/.test(navigator.userAgent),
			l = /MetaSr/.test(navigator.userAgent),
			m = /BIDUBrowser/.test(navigator.userAgent),
			n = a(/^liebao/i, 0);
		return j && (f = "Edge", g = parseInt(navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)[2], 10).toString()), k && (h = "QQ", i = parseInt(navigator.userAgent.match(/QQBrowser\/(\d+).(\d+)/)[2], 10).toString()), l && (h = "Sougou", i = parseInt(navigator.userAgent.match(/MetaSr (\d+).(\d+)/)[2], 10).toString()), m && (h = "Baidu", i = parseInt(navigator.userAgent.match(/BIDUBrowser\/(\d+).(\d+)/)[1], 10).toString()), n && (h = "Liebao", i = ""), (d = g.indexOf(";")) !== -1 && (g = g.substring(0, d)), (d = g.indexOf(" ")) !== -1 && (g = g.substring(0, d)), {
			name: f,
			fullVersion: g,
			shellName: h,
			shellFullVersion: i
		}
	}, a
}), ModuleBase.define("OSInfo", [], function(a) {
	var a = function() {};
	return a.prototype.getOSInfo = function() {
		var a = "Unknown OS",
			b = {
				Android: function() {
					return navigator.userAgent.match(/Android/i)
				},
				BlackBerry: function() {
					return navigator.userAgent.match(/BlackBerry/i)
				},
				iOS: function() {
					return navigator.userAgent.match(/iPhone|iPad|iPod/i)
				},
				Opera: function() {
					return navigator.userAgent.match(/Opera Mini/i)
				},
				Windows: function() {
					return navigator.userAgent.match(/IEMobile/i)
				},
				any: function() {
					return b.Android() || b.BlackBerry() || b.iOS() || b.Opera() || b.Windows()
				},
				getOsName: function() {
					var a = "Unknown OS";
					return b.Android() && (a = "Android"), b.BlackBerry() && (a = "BlackBerry"), b.iOS() && (a = "iOS"), b.Opera() && (a = "Opera Mini"), b.Windows() && (a = "Windows"), a
				}
			};
		return b.any() ? a = b.getOsName() : (navigator.appVersion.indexOf("Win") !== -1 && (a = "Windows"), navigator.appVersion.indexOf("Mac") !== -1 && (a = "OSX"), navigator.appVersion.indexOf("X11") !== -1 && (a = "UNIX"), navigator.appVersion.indexOf("Linux") !== -1 && (a = "Linux")), a
	}, a
}), ModuleBase.define("CheckGetUserMedia", [], function(a) {
	var a = function() {};
	return a.prototype.getUserMediaSupport = function() {
		var a = !1;
		return "undefined" != typeof navigator.webkitGetUserMedia || "undefined" != typeof navigator.mozGetUserMedia ? a = !0 : navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (a = !0), a
	}, a
}), ModuleBase.define("CheckRTCPeerConnection", [], function(a) {
	var a = function() {};
	return a.prototype.RTCPeerConnectionSupport = function() {
		var a = !1;
		try {
			a = ["RTCPeerConnection", "webkitRTCPeerConnection", "mozRTCPeerConnection"].some(function(a) {
				return a in window
			})
		} catch (a) {}
		return a
	}, a
}), ModuleBase.define("CheckDataChannelSupport", [], function(a) {
	var a = function() {};
	return a.prototype.dataChannelSupport = function() {
		var a = !1;
		try {
			var b = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
			if (b) {
				var c = new b({
					iceServers: [{
						url: "stun:0"
					}]
				});
				a = "createDataChannel" in c
			}
		} catch (b) {
			a = !1
		}
		return a
	}, a
}), ModuleBase.define("BrowserDetect", ["BrowserInfo", "OSInfo", "CheckGetUserMedia", "CheckRTCPeerConnection", "CheckDataChannelSupport"], function(a, b, c, d, e) {
	var f = function() {
			this.detect = {};
			var f = "https:" === location.protocol,
				g = new a;
			this.detect.browser = g.getBrowserInfo(), this.detect.browser["is" + this.detect.browser.name] = !0;
			var h = new b;
			this.detect.osName = h.getOSInfo();
			var i = this.detect.browser.fullVersion,
				j = i.split("."),
				k = j[0],
				l = new c;
			this.detect.getUserMediaSupport = l.getUserMediaSupport();
			var m = new d;
			this.detect.RTCPeerConnectionSupport = m.RTCPeerConnectionSupport();
			var n = new e;
			this.detect.dataChannelSupport = n.dataChannelSupport(), this.detect.WebSocketSupport = "WebSocket" in window && 2 === window.WebSocket.CLOSING, this.detect.screenSharingSupport = !1, this.detect.browser.isChrome && k >= 42 && (this.detect.screenSharingSupport = !0), f || (this.detect.screenSharingSupport = !1), this.detect.h264Support = !1, this.detect.browser.isChrome && k >= 52 && (this.detect.h264Support = !0), this.detect.ORTCSupport = "undefined" != typeof RTCIceGatherer
		};
	return f.prototype.checkBrowserSupport = function() {
		var a = !1,
			b = this.detect.browser.isChrome,
			c = this.detect.browser.isOpera,
			d = (this.detect.browser.isIE, this.detect.browser.name, this.detect.browser.fullVersion),
			e = d.split("."),
			f = e[0],
			g = 1 == b && Number(f) >= 42 || 1 == c && Number(f) >= 30;
		return "Android" == this.detect.osName && (g = 1 == b && Number(f) >= 37), 1 == g && 1 == this.detect.getUserMediaSupport && 1 == this.detect.RTCPeerConnectionSupport && 1 == this.detect.WebSocketSupport && (a = !0), a
	}, f.prototype.checkChromeSupportH264 = function() {
		var a = !1,
			b = this.detect.browser.isChrome,
			c = (this.detect.browser.name, this.detect.browser.fullVersion),
			d = c.split("."),
			e = d[0],
			f = 1 == b && Number(e) >= 52;
		return 1 == f && (a = !0), a
	}, f
}), ModuleBase.define("Stream", [], function() {
	var a = function(a, b) {
			this.id = a, this.name = b, this.status = StreamStatus.init, this.stream = null, this.element = null, this.resourceInfo = null, this.ownerId = null
		};
	return a
}), ModuleBase.define("Video", ["Stream", "Error"], function(a, b) {
	var c = function(b, c) {
			a.call(this, b, c), this.level, this.description, this.resolution, this.resolutionSelect, this.frameRate, this.cameraType
		};
	return c.prototype = new a, c.prototype.setLevel = function(a) {
		this.level = a
	}, c.prototype.setDescription = function(a) {
		this.description = a
	}, c.prototype.setResolution = function(a) {
		this.resolutionSelect = a, this.resolution = Resolution[a]
	}, c.prototype.setResolutionWH = function(a, b) {
		this.resolutionSelect = a;
		var c = {};
		c.order = 1, c.width = a, c.height = b, this.resolution = c
	}, c.prototype.setFrameRate = function(a) {
		"string" == typeof a && (a = Number(a)), this.frameRate = a
	}, c.prototype.preview = function(a) {
		var c = when.defer(),
			d = doFsCheck(FTConstant.video, b);
		if (null != d) return c.reject(d), c.promise;
		var e = parseInt(this.resolutionSelect);
		if (e > 640) {
			var d = doFsCheck(FTConstant.video_hd, b);
			if (null != d) return c.reject(d), c.promise
		}
		if (null != this.stream) this.status != StreamStatus.published && (this.status = StreamStatus.opened), this.element = a, attachMediaStream(a, this.stream), c.resolve();
		else {
			var f = this;
			obtainUserMedia(null, this, function(b) {
				f.status = StreamStatus.opened, f.stream = b.videoStream, f.element = a, attachMediaStream(a, b.videoStream), c.resolve()
			}, function(a) {
				c.reject(a)
			})
		}
		return c.promise
	}, c.prototype.unpreview = function() {
		null != this.element && (attachMediaStream(this.element, null), this.status = StreamStatus.init, this.element = null)
	}, c.prototype.publish = function() {
		var a = when.defer();
		return this.publishHandle().then(function() {
			a.resolve()
		}).otherwise(function(b) {
			a.reject(b)
		}), a.promise
	}, c.prototype.previewAndPublish = function(a) {
		var c = when.defer(),
			d = doFsCheck(FTConstant.video, b);
		if (null != d) return c.reject(d), c.promise;
		var e = parseInt(this.resolutionSelect);
		if (e > 640) {
			var d = doFsCheck(FTConstant.video_hd, b);
			if (null != d) return c.reject(d), c.promise
		}
		return this.publishHandle(a).then(function() {
			c.resolve()
		}).otherwise(function(a) {
			c.reject(a)
		}), c.promise
	}, c.prototype.publishHandle = function(a) {
		var b = when.defer(),
			c = getRandomNum(1, 3e3),
			d = this;
		if (d.status == StreamStatus.init) if (null != d.stream) {
			var e = room.composePDUDeviceId(room.selfUser.id, d.id);
			room.masterServer.videoPublishHandle(e, d.stream, c), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(e) {
				e == c && (void 0 != a && (d.status = StreamStatus.opened, d.element = a, attachMediaStream(a, d.stream)), d.status = StreamStatus.published, room.pubVideos.push(d), room.selfUser.eventEmitter.emit(UserCallback.camera_status_notify, d.status, d.id, d.name, room.selfUser.id), b.resolve())
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, d) {
				d == c && b.reject(a)
			})
		} else obtainUserMedia(null, this, function(e) {
			d.status = StreamStatus.opened, d.stream = e.videoStream;
			var f = room.composePDUDeviceId(room.selfUser.id, d.id);
			room.masterServer.videoPublishHandle(f, d.stream, c), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(e) {
				e == c && (void 0 != a && (d.status = StreamStatus.opened, d.element = a, attachMediaStream(a, d.stream)), d.status = StreamStatus.published, room.pubVideos.push(d), room.selfUser.eventEmitter.emit(UserCallback.camera_status_notify, d.status, d.id, d.name, room.selfUser.id), b.resolve())
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, d) {
				d == c && b.reject(a)
			})
		}, function(a) {
			b.reject(a)
		});
		else if (d.status == StreamStatus.opened) {
			var e = room.composePDUDeviceId(room.selfUser.id, d.id);
			room.masterServer.videoPublishHandle(e, d.stream, c), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(a) {
				a == c && (d.status = StreamStatus.published, room.pubVideos.push(d), room.selfUser.eventEmitter.emit(UserCallback.camera_status_notify, d.status, d.id, d.name, room.selfUser.id), b.resolve())
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, d) {
				d == c && b.reject(a)
			})
		} else if (d.status == StreamStatus.published && room.reconnectionCount > 0) {
			var e = room.composePDUDeviceId(room.selfUser.id, d.id);
			room.masterServer.videoPublishHandle(e, d.stream, c), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(a) {
				a == c && (room.selfUser.eventEmitter.emit(UserCallback.camera_status_notify, d.status, d.id, d.name, room.selfUser.id), b.resolve())
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, d) {
				d == c && b.reject(a)
			})
		}
		return b.promise
	}, c.prototype.unpublish = function() {
		if (this.status == StreamStatus.published || this.status == StreamStatus.init && (null != this.stream || void 0 != this.stream)) {
			arrayUtil.objectSplice(room.pubVideos, this.id), this.status = StreamStatus.init, room.selfUser.eventEmitter.emit(UserCallback.camera_status_notify, this.status, this.id, this.name, room.selfUser.id);
			var a = room.composePDUDeviceId(room.selfUser.id, this.id);
			room.masterServer.videoUnpublishHandle(a, this.stream), this.stream && this.stream.getTracks().forEach(function(a) {
				a.stop()
			}), this.stream = null
		}
	}, c.prototype.subscrible = function() {
		room.selfUser.subVideoStream2ResourceInfo[this.resourceInfo.stream.stream_name] = this.resourceInfo, room.selfUser.subVideoIds.push(this.id), room.masterServer.videoSubscribleHandle(this.resourceInfo)
	}, c.prototype.unsubscrible = function() {
		arrayUtil.baseSplice(room.selfUser.subVideoIds, this.id), room.masterServer.videoUnsubscribleHandle(this.resourceInfo)
	}, c.prototype.updateCameraData = function(a, b) {
		var c = room.composePDUDeviceId(room.selfUser.id, this.id);
		this.level = a, this.description = b, room.masterServer.updateWebcamMsg(room.selfUser.nodeId, c, this)
	}, c
}), ModuleBase.define("Audio", ["Stream", "Error"], function(a, b) {
	var c = function(b, c) {
			a.call(this, b, c), this.oldAudioLevel = 0, this.audioLevel = 0
		};
	return c.prototype = new a, c.prototype.openMicrophone = function(a) {
		var c = when.defer(),
			d = doFsCheck(FTConstant.audio, b);
		if (null != d) return c.reject(d), c.promise;
		var e = getRandomNum(30001, 6e3),
			f = this;
		if (null != this.stream) {
			var g = room.composePDUDeviceId(room.selfUser.id, f.id);
			room.masterServer.audioPublishHandle(g, f.stream, e), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(b) {
				b == e && (f.state = StreamStatus.opened, "undefined" != typeof a && null != a && "" != a && (f.element = a, attachMediaStream(a, f.stream)), f.status = StreamStatus.published, room.pubAudios.push(f), room.selfUser.eventEmitter.emit(UserCallback.microphone_status_notify, f.status, f.id, f.name, room.selfUser.id), c.resolve())
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, b) {
				b == e && c.reject(a)
			})
		} else obtainUserMedia(this, null, function(b) {
			f.state = StreamStatus.opened, f.stream = b.audioStream;
			var d = room.composePDUDeviceId(room.selfUser.id, f.id);
			room.masterServer.audioPublishHandle(d, f.stream, e), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(d) {
				d == e && ("undefined" != typeof a && null != a && "" != a && (f.element = a, attachMediaStream(a, b.audioStream)), f.status = StreamStatus.published, room.pubAudios.push(f), room.selfUser.eventEmitter.emit(UserCallback.microphone_status_notify, f.status, f.id, f.name, room.selfUser.id), c.resolve())
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, b) {
				b == e && c.reject(a)
			})
		}, function(a) {
			c.reject(a)
		});
		return c.promise
	}, c.prototype.closeMicrophone = function() {
		if (this.status == StreamStatus.published || this.status == StreamStatus.muted) {
			null != this.element && (attachMediaStream(this.element, null), this.element = null), arrayUtil.objectSplice(room.pubAudios, this.id), this.status = StreamStatus.init, room.selfUser.eventEmitter.emit(UserCallback.microphone_status_notify, this.status, this.id, this.name, room.selfUser.id);
			var a = room.composePDUDeviceId(room.selfUser.id, this.id);
			room.masterServer.audioUnpublishHandle(a, this.stream), this.setAudioLevel(0), this.stream && this.stream.getTracks().forEach(function(a) {
				a.stop()
			}), this.stream = null
		}
	}, c.prototype.muteMicrophone = function() {
		if (this.status == StreamStatus.published) {
			this.status = StreamStatus.muted, room.selfUser.eventEmitter.emit(UserCallback.microphone_status_notify, this.status, this.id, this.name, room.selfUser.id);
			var a = this.stream.getAudioTracks();
			for (i = 0; i < a.length; i++) a[i].enabled = !1;
			var b = room.composePDUDeviceId(room.selfUser.id, this.id);
			room.masterServer.updateSpeakerMsg(room.selfUser.nodeId, b, this)
		}
	}, c.prototype.unmuteMicrophone = function() {
		if (this.status == StreamStatus.muted) {
			this.status = StreamStatus.published, room.selfUser.eventEmitter.emit(UserCallback.microphone_status_notify, this.status, this.id, this.name, room.selfUser.id);
			var a = this.stream.getAudioTracks();
			for (i = 0; i < a.length; i++) a[i].enabled = !0;
			var b = room.composePDUDeviceId(room.selfUser.id, this.id);
			room.masterServer.updateSpeakerMsg(room.selfUser.nodeId, b, this)
		}
	}, c.prototype.ismuteMicrophone = function() {
		var a = !1;
		return this.status == StreamStatus.muted && (a = !0), a
	}, c.prototype.setAudioLevel = function(a) {
		this.audioLevel = a
	}, c.prototype.getAudioLevel = function() {
		return this.audioLevel > 0 && this.audioLevel == this.oldAudioLevel && this.setAudioLevel(0), this.oldAudioLevel = this.audioLevel, this.audioLevel
	}, c
}), ModuleBase.define("Screen", ["Stream", "Error"], function(a, b) {
	var c = function(b, c) {
			a.call(this, b, c), this.level, this.description, this.resolution, this.frameRate
		};
	return c.prototype = new a, c.prototype.setLevel = function(a) {
		this.level = a
	}, c.prototype.setDescription = function(a) {
		this.description = a
	}, c.prototype.setResolution = function(a) {
		this.resolution = EngineEnum.Resolution[a]
	}, c.prototype.setFrameRate = function(a) {
		this.frameRate = a
	}, c.prototype.preview = function(a) {
		self.element = a, attachMediaStream(a, this.stream)
	}, c.prototype.publish = function(a) {
		var c = when.defer(),
			d = doFsCheck(FTConstant.screen, b);
		if (null != d) return c.reject(d), c.promise;
		if (this.status == StreamStatus.published) c.resolve();
		else try {
			var e = this;
			chrome.runtime.sendMessage(a, {
				getStream: !0
			}, function(a) {
				if (void 0 == a || null == a || "" == a) {
					log.debug("Access to screen denied");
					var d = new b(ErrorConstant.screen_sharing_plugin_not_accessible);
					return void c.reject(d)
				}
				var f = a.streamId;
				if (log.debug("pending Request Id:" + f), "" == f || null == f) {
					log.debug("Access rejected.");
					var d = new b(ErrorConstant.screen_sharing_response_is_null);
					return void c.reject(d)
				}
				navigator.webkitGetUserMedia({
					audio: !1,
					video: {
						mandatory: {
							chromeMediaSource: "desktop",
							chromeMediaSourceId: f,
							maxWidth: screen.width,
							maxHeight: screen.height,
							minFrameRate: 1,
							maxFrameRate: 5
						}
					}
				}, function(a) {
					log.debug("gotShareStream. stream:" + a), "undefined" != typeof a.onended ? a.onended = function() {
						log.debug("stream.onended"), log.debug("Share stream ended"), log.debug("OpenMyDesktop(),stream.onended,user.unpubDesktop"), null != e.stream && (e.unpublish(), room.selfUser.eventEmitter.emit(UserCallback.screen_status_notify, e.status, e.id, e.name, room.selfUser.id)), room.eventEmitter.emit(RoomCallback.screen_sharing_ended)
					} : a.oninactive = function() {
						log.debug("stream.oninactive"), log.debug("Share stream ended"), log.debug("OpenMyDesktop(),stream.oninactive,user.unpubDesktop"), null != e.stream && (e.unpublish(), room.selfUser.eventEmitter.emit(UserCallback.screen_status_notify, e.status, e.id, e.name, room.selfUser.id)), room.eventEmitter.emit(RoomCallback.screen_sharing_ended)
					};
					var b = getRandomNum(6001, 9e3),
						d = room.composePDUDeviceId(room.selfUser.id, e.id);
					room.masterServer.screenPublishHandle(d, a, b), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(d) {
						d == b && (e.stream = a, e.status = StreamStatus.published, room.pubScreens.push(e), room.selfUser.eventEmitter.emit(UserCallback.screen_status_notify, e.status, e.id, e.name, room.selfUser.id), c.resolve(f))
					}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, d) {
						d == b && c.reject(a)
					})
				}, function(a) {
					log.debug("An error occurred: " + a);
					var a = new b(ErrorConstant.screen_sharing_plugin_not_accessible);
					c.reject(a)
				})
			})
		} catch (a) {
			log.debug("Screen sharing plugin is not accessible ");
			var d = new b(ErrorConstant.screen_sharing_plugin_not_accessible);
			return void c.reject(d)
		}
		return c.promise
	}, c.prototype.unpublish = function() {
		if (this.status == StreamStatus.published) {
			this.status = StreamStatus.init;
			var a = room.composePDUDeviceId(room.selfUser.id, this.id);
			room.masterServer.screenUnpublishHandle(a, this.stream), room.isMcu() || (this.stream = null)
		}
	}, c.prototype.subscrible = function() {
		room.selfUser.subScreenStream2ResourceInfo[this.resourceInfo.stream.stream_name] = this.resourceInfo, room.selfUser.subScreenIds.push(this.id), room.masterServer.screenSubscribleHandle(this.resourceInfo)
	}, c.prototype.unsubscrible = function() {
		arrayUtil.baseSplice(room.selfUser.subScreenIds, this.id), room.masterServer.screenUnsubscribleHandle(this.resourceInfo)
	}, c.prototype.updateScreenData = function(a, b) {
		var c = room.composePDUDeviceId(room.selfUser.id, this.id);
		this.level = a, this.description = b, room.masterServer.updateScreenIdMsg(room.selfUser.nodeId, c, this)
	}, c
});
var currentVideoParameter = {
	videoWidth: !1,
	videoHeight: !1,
	frameRate: !1
};
navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && (navigator.enumerateDevices = function(a) {
	navigator.mediaDevices.enumerateDevices().then(a)
});
var mcuRestServerUrl, roomServerUrl, iceServers, stunUrl, trunUrl, iceusername, iceCredential, is_cluster = !1,
	protocolStr = document.location.protocol;
"http:" != protocolStr && "https:" != protocolStr && (protocolStr = "http:");
var fsCheck = {
	isCheck: !1,
	content: {}
},
	doFsCheck = function(a, b) {
		var c = null;
		if (1 == fsCheck.isCheck) {
			var d = fsCheck.content[a.value];
			1 != d && (c = new b(ErrorConstant.ft_no_authorization.code, a.name + ErrorConstant.ft_no_authorization.message))
		}
		return c
	};
ModuleBase.define("RestServer", ["Error"], function(Error) {
	var RestServer = function() {};
	return RestServer.prototype.getServerinfo = function(serverURI, accessToken) {
		var deferred = when.defer();
		mcuRestServerUrl = serverURI;
		var tjson = {
			access_tocken: accessToken
		};
		tjson = JSON.stringify(tjson);
		var base64token = encodeURI(tjson),
			serverinfoUrl = protocolStr + "//" + serverURI + "/sdk/config/serverinfo?uri_encode=yes&client_info=" + base64token;
		return $.ajax({
			type: "get",
			url: serverinfoUrl,
			dataType: "jsonp",
			jsonpCallback: "test",
			timeout: 5e3,
			success: function(serverinfo) {
				var fuValue = serverinfo.ft_value;
				fuValue && (fsCheck.isCheck = !0, "object" == typeof fuValue ? fsCheck.content = fuValue : "string" == typeof fuValue && (fsCheck.content = eval("(" + fuValue + ")")));
				var error = doFsCheck(FTConstant.platform_web, Error);
				return null != error ? (deferred.reject(error), deferred.promise) : (roomServerUrl = serverinfo.room_server.uri, iceServers = serverinfo.ice_servers, null != iceServers && iceServers.length > 0 && (stunUrl = iceServers[0].url, trunUrl = iceServers[1].url, iceusername = iceServers[1].username, iceCredential = iceServers[1].credential), serverinfo.is_cluster && ("true" != serverinfo.is_cluster && 1 != serverinfo.is_cluster || (is_cluster = !0)), void deferred.resolve())
			},
			error: function(a, b, c) {
				log.info("ajax (/sdk/config/serverinfo) serverinfoUrl:" + serverinfoUrl), log.info("ajax (/sdk/config/serverinfo) errorThrown:" + c.stack), log.info("ajax (/sdk/config/serverinfo) XMLHttpRequest.status:" + a.status + ",XMLHttpRequest.statusText:" + a.statusText);
				var d = new Error(a.status, a.statusText);
				deferred.reject(d)
			}
		}), deferred.promise
	}, RestServer.prototype.getMcu = function(a, b) {
		var c = when.defer(),
			d = protocolStr + "//" + mcuRestServerUrl + "/sdk/get_mcu?room_id=" + a + "&tocken=" + b;
		return $.ajax({
			type: "get",
			url: d,
			dataType: "jsonp",
			jsonpCallback: "test",
			timeout: 5e3,
			success: function(a) {
				var b = a.ret;
				if (0 == b) roomServerUrl = a.addr, c.resolve();
				else {
					var d = new Error(b, a.msg);
					c.reject(d)
				}
			},
			error: function(a, b, e) {
				log.info("ajax (/sdk/getMcu) getMcuUrl:" + d), log.info("ajax (/sdk/getMcu) errorThrown:" + e.stack), log.info("ajax (/sdk/getMcu) XMLHttpRequest.status:" + a.status + ",XMLHttpRequest.statusText:" + a.statusText);
				var f = new Error(a.status, a.statusText);
				c.reject(f)
			}
		}), c.promise
	}, RestServer.prototype.getMcuWithOEM = function(a, b) {
		var c = when.defer(),
			d = protocolStr + "//" + mcuRestServerUrl + "/sdk/get_mcu?room_id=" + a + "&access_token=" + b;
		return $.ajax({
			type: "get",
			url: d,
			dataType: "jsonp",
			jsonpCallback: "test",
			timeout: 5e3,
			success: function(a) {
				var b = a.ret;
				if (0 == b) roomServerUrl = a.addr, room.avdEngine.accessToken = a.access_token, log.info("ajax (/sdk/getMcuWithOEM)  roomServerUrl:" + a.addr + "；accessToken：" + a.access_token), c.resolve();
				else {
					var d = new Error(b, a.msg);
					c.reject(d)
				}
			},
			error: function(a, b, e) {
				log.info("ajax (/sdk/getMcuWithOEM) getMcuUrl:" + d), log.info("ajax (/sdk/getMcuWithOEM) errorThrown:" + e.stack), log.info("ajax (/sdk/getMcuWithOEM) XMLHttpRequest.status:" + a.status + ",XMLHttpRequest.statusText:" + a.statusText);
				var f = new Error(a.status, a.statusText);
				401 == a.status || 400 == a.status ? f = new Error(401, "unauthorized") : 404 == a.status || 602 == a.status ? f = new Error(404, "room not found") : 409 == a.status && (f = new Error(409, "http query server timeout")), c.reject(f)
			}
		}), c.promise
	}, RestServer
}), ModuleBase.define("MasterServer", ["CmdProtobufCoded", "TraceablePeerConnection"], function(a, b) {
	function c(a) {
		var b = a.split("(")[1].split(")")[0],
			c = b.split(",");
		return c.length >= 4 ? c[3] = parseInt(255 * c[3]) : c[3] = 255, c
	}
	function d() {
		var a = "js_v2.4.0.0";
		return a += navigator.mozGetUserMedia ? " vp8:120,vp9:121,h264:126" : webrtcDetectedVersion < 57 ? " vp8:100,vp9:101,h264:107" : " vp8:96,vp9:98,h264:100"
	}
	var e = function(c) {
			this.signalingChannel = c, this.cmdProtobufCoded = new a, this.roomPduType = this.cmdProtobufCoded.getRoomPduTypeEnum(), this.mediaType = this.cmdProtobufCoded.getMediaTypeEnum(), this.sessionType = this.cmdProtobufCoded.getSessionTypeEnum(), this.resourceStatus = this.cmdProtobufCoded.getResourceStatusEnum(), this.resourceOpt = this.cmdProtobufCoded.getResourceOptEnum(), this.userMsgOpt = this.cmdProtobufCoded.getUserMsgOptEnum(), this.cameraType = this.cmdProtobufCoded.getCameraTypeEnum(), this.lineArrow = this.cmdProtobufCoded.getLineArrowEnum(), this.annotationType = this.cmdProtobufCoded.getAnnotationTypeEnum(), this.traceablePeerConnection = new b, room.traceablePeerConnection = this.traceablePeerConnection, this.traceablePeerConnection.getToMCUPeerConnection()
		};
	return e.prototype.openReqSend = function() {
		var a = d();
		log.debug("====openReqSend,version:" + a);
		var b = this.cmdProtobufCoded.newOpenReq(10, room.avdEngine.accessToken, "", a),
			c = this.cmdProtobufCoded.encodedPacket(this.roomPduType.OPEN_REQ, 0, 0, 0, b);
		log.info("====openReqSend,OPEN_REQ====="), this.signalingChannel.send(c)
	}, e.prototype.openReqReconnectionSend = function() {
		var a = d();
		log.debug("====openReqReconnectionSend,version:" + a);
		var b = this.cmdProtobufCoded.newOpenReq(10, room.avdEngine.accessToken, room.signalTocken, a),
			c = this.cmdProtobufCoded.encodedPacket(this.roomPduType.OPEN_REQ, 0, 0, 0, b);
		log.info("====openReqReconnectionSend,OPEN_REQ====="), this.signalingChannel.send(c)
	}, e.prototype.pingIntervalHandle = function() {
		var a = this;
		room.pingIntervalId = setInterval(function() {
			room.pingCountTime += room.pingInterval, packetArray = a.cmdProtobufCoded.encodedPacket(a.roomPduType.PING, 0, 0, 0, null), a.signalingChannel.send(packetArray)
		}, room.pingInterval)
	}, e.prototype.pingTimeoutHandle = function() {
		var a = this;
		room.pingTimeoutId = setInterval(function() {
			room.pingCountTime >= 1e4 && (room.reconnectionState || (log.debug("=========Ping Timeout,开始重连...==========="), a.pingInit(), room.eventEmitter.emit(RoomCallback.connection_status, ConnectionStatus.connecting), room.reconnectionHandle()))
		}, 1e3)
	}, e.prototype.pingInit = function() {
		clearInterval(room.pingIntervalId), clearInterval(room.pingTimeoutId), room.pingIntervalId = null, room.pingTimeoutId = null, room.pingCountTime = 0
	}, e.prototype.inviteRoomReqSend = function() {
		var a = null;
		room.reconnectionCount > 0 && (a = room.selfUser.nodeId);
		var b = [],
			c = [],
			d = this.cmdProtobufCoded.newUserPolicy(!0, !0, !0),
			e = this.cmdProtobufCoded.newJoinInfo(b, c, new String("user_agent"), d),
			f = this.cmdProtobufCoded.newInviteRoomReq1(20, room.id, "", room.avdEngine.accessToken, room.selfUser.id, room.selfUser.name, e, room.selfUser.password, a);
		if (f.user_data = room.selfUser.data, navigator.mozGetUserMedia) {
			var g = this;
			this.traceablePeerConnection.getInviteRoomReq1ByFirefox().then(function() {
				void 0 != room.iceUfragLocal && (f.ice_ufrag = room.iceUfragLocal), void 0 != room.icePwdLocal && (f.ice_pwd = room.icePwdLocal);
				var a = g.cmdProtobufCoded.encodedPacket(g.roomPduType.INVITE_ROOM_REQ1, 0, 0, 0, f);
				g.signalingChannel.send(a)
			})
		} else {
			var h = this.cmdProtobufCoded.encodedPacket(this.roomPduType.INVITE_ROOM_REQ1, 0, 0, 0, f);
			this.signalingChannel.send(h)
		}
	}, e.prototype.sendOffer = function() {
		var a = this;
		this.traceablePeerConnection.doSetLocalDescription().then(function() {
			a.traceablePeerConnection.doSetRemoteDescription()
		})
	}, e.prototype.setAddIcecandidate = function(a) {
		if (roomServerUrl) {
			var b = roomServerUrl.split("/"),
				c = b[0];
			if (c) {
				var d = c.split(":");
				d.size > 0 && (c = d[0])
			}
			a.candidate = a.candidate.replace("127.0.0.1", c)
		}
		log.info("setAddIcecandidate(),mcu server send candidate:" + a.candidate), this.traceablePeerConnection.doAddIceCandidate(a)
	}, e.prototype.addWebcamMsg = function(a, b) {
		var c = this.cmdProtobufCoded.newWebcam(a, b.name, b.status, this.sessionType.Video);
		c.ctype = this.cameraType.unknown, c.level = b.level, c.description = b.description;
		var d = this.cmdProtobufCoded.newAddWebcamMsg(room.selfUser.nodeId, c),
			e = this.cmdProtobufCoded.encodedPacket(this.roomPduType.ADD_WEBCAM_MSG, 0, room.selfUser.nodeId, 0, d);
		this.signalingChannel.send(e)
	}, e.prototype.removeWebcamMsg = function(a) {
		var b = this.cmdProtobufCoded.newRemoveWebcamMsg(room.selfUser.nodeId, a),
			c = this.cmdProtobufCoded.encodedPacket(this.roomPduType.REMOVE_WEBCAM_MSG, 0, room.selfUser.nodeId, 0, b);
		this.signalingChannel.send(c)
	}, e.prototype.addScreenMsg = function(a, b) {
		var c = this.cmdProtobufCoded.newDesktop(a, b.name, b.status, this.sessionType.ShareScreen);
		c.level = b.level, c.description = b.description;
		var d = this.cmdProtobufCoded.newAddDesktopMsg(room.selfUser.nodeId, c),
			e = this.cmdProtobufCoded.encodedPacket(this.roomPduType.ADD_DESKTOP_MSG, 0, room.selfUser.nodeId, 0, d);
		this.signalingChannel.send(e)
	}, e.prototype.addSpeakerMsg = function(a, b) {
		var c = this.cmdProtobufCoded.newSpeaker(a, b.name, b.status, this.sessionType.Audio),
			d = this.cmdProtobufCoded.newAddSpeakerMsg(room.selfUser.nodeId, c),
			e = this.cmdProtobufCoded.encodedPacket(this.roomPduType.ADD_SPEAKER_MSG, 0, room.selfUser.nodeId, 0, d);
		this.signalingChannel.send(e)
	}, e.prototype.removeSpeakerMsg = function(a) {
		var b = this.cmdProtobufCoded.newRemoveSpeakerMsg(room.selfUser.nodeId, a),
			c = this.cmdProtobufCoded.encodedPacket(this.roomPduType.REMOVE_SPEAKER_MSG, 0, room.selfUser.nodeId, 0, b);
		this.signalingChannel.send(c)
	}, e.prototype.updateUserDataMsg = function(a) {
		var b = this.cmdProtobufCoded.newUpdateUserDataMsg(room.selfUser.nodeId, a),
			c = this.cmdProtobufCoded.encodedPacket(this.roomPduType.UPDATE_USER_DATA_MSG, 0, room.selfUser.nodeId, 0, b);
		this.signalingChannel.send(c)
	}, e.prototype.roomDataInfo = function(a, b) {
		var c = this.cmdProtobufCoded.newRoomKV(a, b),
			d = [];
		d.push(c);
		var e = this.cmdProtobufCoded.newRoomDataInfo(room.id, d),
			f = this.cmdProtobufCoded.encodedPacket(this.roomPduType.ROOM_DATA_INFO, 0, room.selfUser.nodeId, 0, e);
		this.signalingChannel.send(f)
	}, e.prototype.pubRoomResourceMsg = function(a, b, c, d, e) {
		var f;
		if ("video" == a) {
			var g = 100;
			videoCoding == VideoCodingType.VP8 ? g = 100 : videoCoding == VideoCodingType.VP9 ? g = 101 : videoCoding == VideoCodingType.H264 && (g = 107), f = this.cmdProtobufCoded.newMediaStream(b, this.mediaType.video, c, currentVideoParameter.videoWidth, currentVideoParameter.videoHeight, currentVideoParameter.frameRate, g)
		} else "audio" == a ? f = this.cmdProtobufCoded.newMediaStream(b, this.mediaType.audio, c) : "screen" == a && (f = this.cmdProtobufCoded.newMediaStream(b, this.mediaType.desktop, c));
		if (null != f) {
			var h = this.cmdProtobufCoded.newRoomResourceInfo(d, room.selfUser.nodeId, f),
				i = this.cmdProtobufCoded.newPubRoomResourceMsg(h, e),
				j = this.cmdProtobufCoded.encodedPacket(this.roomPduType.PUB_ROOM_RESOURCE_MSG, 0, room.selfUser.nodeId, 0, i);
			this.signalingChannel.send(j), this.signalingChannel.send("")
		}
	}, e.prototype.subRoomResourceMsg = function(a, b) {
		var c;
		if (1 == a) {
			var d = this.cmdProtobufCoded.newSubRoomResourceMsg(b, room.selfUser.nodeId);
			c = this.cmdProtobufCoded.encodedPacket(this.roomPduType.SUB_ROOM_RESOURCE_MSG, 0, room.selfUser.nodeId, 0, d)
		} else if (0 == a) {
			var e = this.cmdProtobufCoded.newUnsubRoomResourceMsg(b, room.selfUser.nodeId);
			c = this.cmdProtobufCoded.encodedPacket(this.roomPduType.UNSUB_ROOM_RESOURCE_MSG, 0, room.selfUser.nodeId, 0, e)
		}
		this.signalingChannel.send(c), this.signalingChannel.send("")
	}, e.prototype.unpubRoomResourceMsg = function(a, b, c) {
		var d, e;
		"video" == a ? (d = room.selfUser.videoSdpSsrc, e = this.cmdProtobufCoded.newMediaStream(b, this.mediaType.video, d)) : "audio" == a ? (d = room.selfUser.audioSdpSsrc, e = this.cmdProtobufCoded.newMediaStream(b, this.mediaType.audio, d)) : "screen" == a && (d = room.selfUser.screenSdpSsrc, e = this.cmdProtobufCoded.newMediaStream(b, this.mediaType.desktop, d));
		var f = this.cmdProtobufCoded.newRoomResourceInfo(c, room.selfUser.nodeId, e),
			g = this.cmdProtobufCoded.newUnpubRoomResourceMsg(f),
			h = this.cmdProtobufCoded.encodedPacket(this.roomPduType.UNPUB_ROOM_RESOURCE_MSG, 0, room.selfUser.nodeId, 0, g);
		this.signalingChannel.send(h), this.signalingChannel.send("")
	}, e.prototype.updateSpeakerMsg = function(a, b, c) {
		var d = room.composePDUDeviceId(room.selfUser.id, c.id),
			e = this.cmdProtobufCoded.newSpeaker(d, c.name, c.status, this.sessionType.Audio),
			f = this.cmdProtobufCoded.newUpdateSpeakerMsg(a, b, e),
			g = this.cmdProtobufCoded.encodedPacket(this.roomPduType.UPDATE_SPEAKER_MSG, 0, room.selfUser.nodeId, 0, f);
		this.signalingChannel.send(g), this.signalingChannel.send("")
	}, e.prototype.updateWebcamMsg = function(a, b, c) {
		var d = room.composePDUDeviceId(room.selfUser.id, c.id),
			e = c.status;
		c.status != StreamStatus.none && c.status != StreamStatus.opened || (e = 1);
		var f = this.cmdProtobufCoded.newWebcam(d, c.name, e, this.sessionType.Video);
		f.level = c.level, f.description = c.description;
		var g = this.cmdProtobufCoded.newUpdateWebcamMsg(a, b, f),
			h = this.cmdProtobufCoded.encodedPacket(this.roomPduType.UPDATE_WEBCAM_MSG, 0, room.selfUser.nodeId, 0, g);
		this.signalingChannel.send(h), this.signalingChannel.send("")
	}, e.prototype.updateScreenIdMsg = function(a, b, c) {
		var d = room.composePDUDeviceId(room.selfUser.id, c.id),
			e = this.cmdProtobufCoded.newDesktop(d, c.name, c.status, this.sessionType.ShareScreen);
		e.level = c.level, e.description = c.description;
		var f = this.cmdProtobufCoded.newUpdateDesktopMsg(a, b, e),
			g = this.cmdProtobufCoded.encodedPacket(this.roomPduType.UPDATE_DESKTOP_MSG, 0, room.selfUser.nodeId, 0, f);
		this.signalingChannel.send(g), this.signalingChannel.send("")
	}, e.prototype.videoIndiction = function(a, b, c) {
		var d = this.resourceOpt.pub;
		a || (d = this.resourceOpt.unpub);
		var e = this.cmdProtobufCoded.newResourceIndiction(b, d, c, room.selfUser.nodeId, "host_tocken"),
			f = this.cmdProtobufCoded.encodedPacket(this.roomPduType.VIDEO_INDICTION, 0, room.selfUser.nodeId, c, e);
		this.signalingChannel.send(f)
	}, e.prototype.audioIndiction = function(a, b, c) {
		var d = this.resourceOpt.pub;
		a || (d = this.resourceOpt.unpub);
		var e = this.cmdProtobufCoded.newResourceIndiction(b, d, c, room.selfUser.nodeId, "host_tocken"),
			f = this.cmdProtobufCoded.encodedPacket(this.roomPduType.AUDIO_INDICTION, 0, room.selfUser.nodeId, c, e);
		this.signalingChannel.send(f)
	}, e.prototype.sendMessage = function(a, b) {
		var c = new Date;
		c.setMinutes(c.getMinutes() + c.getTimezoneOffset());
		var d = c.getTime();
		d = Math.round(d / 1e3);
		var e = this.cmdProtobufCoded.newTextMsg(a, d),
			f = this.roomPduType.PUBLIC_TEXT_MSG,
			g = 0;
		if ("undefined" != typeof b && null != b && "" != b) {
			var h = room.getNodeId(b);
			null != h && (g = h, f = this.roomPduType.PRIVATE_TEXT_MSG)
		}
		var i = this.cmdProtobufCoded.encodedPacket(f, 0, room.selfUser.nodeId, g, e);
		this.signalingChannel.send(i)
	}, e.prototype.sendData = function(a, b) {
		var c = this.cmdProtobufCoded.newData(a),
			d = this.roomPduType.PUBLIC_DATA,
			e = 0;
		if ("undefined" != typeof b && null != b && "" != b) {
			var f = room.getNodeId(b);
			null != f && (e = f, d = this.roomPduType.PRIVATE_DATA)
		}
		var g = this.cmdProtobufCoded.encodedPacket(d, 0, room.selfUser.nodeId, e, c);
		this.signalingChannel.send(g)
	}, e.prototype.userIndiction = function(a, b) {
		var c = room.getNodeId(b),
			d = this.cmdProtobufCoded.newUserMsg(c, this.userMsgOpt.kickoff, a),
			e = this.cmdProtobufCoded.newUserIndiction(room.selfUser.nodeId, this.roomPduType.USER_MSG, d.toArrayBuffer()),
			f = this.cmdProtobufCoded.encodedPacket(this.roomPduType.USER_INDICTION, 0, room.selfUser.nodeId, c, e);
		this.signalingChannel.send(f)
	}, e.prototype.userMsg = function(a, b) {
		var c = this.userMsgOpt.leave;
		b && (c = this.userMsgOpt.kickoff);
		var d = this.cmdProtobufCoded.newUserMsg(room.selfUser.nodeId, c, a),
			e = this.cmdProtobufCoded.encodedPacket(this.roomPduType.USER_MSG, 0, room.selfUser.nodeId, 0, d);
		this.signalingChannel.send(e)
	}, e.prototype.videoPublishHandle = function(a, b, c) {
		room.isMcu() ? room.traceablePeerConnection.addSdp("video", a, b, c) : this.pubRoomResourceMsg("video", b.id, null, a, c)
	}, e.prototype.videoUnpublishHandle = function(a, b) {
		room.isMcu() ? room.traceablePeerConnection.reduceSdp("video", a, b) : this.unpublishHandleP2P("video", room.selfUser.subMyVideosP2P, b, a)
	}, e.prototype.videoSubscribleHandle = function(a) {
		room.isMcu() ? room.traceablePeerConnection.updateSdp("video", 1, a) : this.subscribleHandleP2P(a)
	}, e.prototype.videoUnsubscribleHandle = function(a) {
		room.isMcu() ? room.traceablePeerConnection.updateSdp("video", 0, a) : this.unsubscribleHandleP2P("video", a)
	}, e.prototype.screenPublishHandle = function(a, b, c) {
		room.isMcu() ? room.traceablePeerConnection.addSdp("screen", a, b, c) : this.pubRoomResourceMsg("screen", b.id, null, a, c)
	}, e.prototype.screenUnpublishHandle = function(a, b) {
		room.isMcu() ? room.traceablePeerConnection.reduceSdp("screen", a, b) : this.unpublishHandleP2P("screen", room.selfUser.subMyScreensP2P, b, a)
	}, e.prototype.screenSubscribleHandle = function(a) {
		room.isMcu() ? room.traceablePeerConnection.updateSdp("screen", 1, a) : this.subscribleHandleP2P(a)
	}, e.prototype.screenUnsubscribleHandle = function(a) {
		room.isMcu() ? room.traceablePeerConnection.updateSdp("screen", 0, a) : this.unsubscribleHandleP2P("screen", a)
	}, e.prototype.audioPublishHandle = function(a, b, c) {
		room.isMcu() ? room.traceablePeerConnection.addSdp("audio", a, b, c) : this.pubRoomResourceMsg("audio", b.id, null, a, c)
	}, e.prototype.audioUnpublishHandle = function(a, b) {
		room.isMcu() ? room.traceablePeerConnection.reduceSdp("audio", a, b) : this.unpublishHandleP2P("audio", room.selfUser.subMyAudiosP2P, b, a)
	}, e.prototype.audioSubscribleHandle = function(a) {
		room.isMcu() ? room.traceablePeerConnection.updateSdp("audio", 1, a) : this.subscribleHandleP2P(a)
	}, e.prototype.audioUnsubscribleHandle = function(a) {
		room.isMcu() ? room.traceablePeerConnection.updateSdp("audio", 0, a) : this.unsubscribleHandleP2P("audio", a)
	}, e.prototype.sendOfferP2P = function(a, b) {
		log.debug("=========sendOfferP2P()========OFFER_REQ======");
		var c = this.cmdProtobufCoded.newOfferReq(0, a, room.selfUser.nodeId),
			d = this.cmdProtobufCoded.encodedPacket(this.roomPduType.OFFER_REQ, 0, room.selfUser.nodeId, b, c);
		this.signalingChannel.send(d)
	}, e.prototype.setRemoteP2P = function(a, b) {
		log.debug("=========setRemoteP2P()========OFFER_REP======");
		var c = this.cmdProtobufCoded.newOfferRep(0, 1, "", a, room.selfUser.nodeId),
			d = this.cmdProtobufCoded.encodedPacket(this.roomPduType.OFFER_REP, 0, room.selfUser.nodeId, b, c);
		this.signalingChannel.send(d)
	}, e.prototype.sendCandidateMsgP2P = function(a, b) {
		var c = this.cmdProtobufCoded.newCandidateMsg(a.candidate, a.sdpMLineIndex, a.sdpMid, room.selfUser.nodeId),
			d = this.cmdProtobufCoded.encodedPacket(this.roomPduType.CANDIDATE_MSG, 0, room.selfUser.nodeId, b, c);
		this.signalingChannel.send(d)
	}, e.prototype.sendSubSdpOfferP2P = function(a, b, c) {
		var d = a.info;
		d.stream.sdp = b;
		var e;
		if ("offerSub" == c) log.debug("send P2P SUB_ROOM_RESOURCE_REQ: " + room.selfUser.nodeId + "------>" + d.owner_id), e = this.cmdProtobufCoded.encodedPacket(this.roomPduType.SUB_ROOM_RESOURCE_REQ, 0, room.selfUser.nodeId, d.owner_id, a);
		else if ("answerSub" == c) {
			log.debug("send P2P SUB_ROOM_RESOURCE_REP: " + room.selfUser.nodeId + "------>" + a.sub_node_id);
			var f = this.cmdProtobufCoded.newSubRoomResourceRep(0, 1, "", d);
			e = this.cmdProtobufCoded.encodedPacket(this.roomPduType.SUB_ROOM_RESOURCE_REP, 0, room.selfUser.nodeId, a.sub_node_id, f)
		}
		this.signalingChannel.send(e), this.signalingChannel.send("")
	}, e.prototype.sendSubSdpAnswerP2P = function(a, b, c, d) {
		b.stream.sdp = c;
		var e;
		if ("offerSub" == a) {
			var f = this.cmdProtobufCoded.newSubRoomResourceRep(0, 1, "", b);
			e = this.cmdProtobufCoded.encodedPacket(this.roomPduType.SUB_ROOM_RESOURCE_REP, 0, room.selfUser.nodeId, d, f)
		} else if ("answerSub" == a) {
			var g = this.cmdProtobufCoded.newSubRoomResourceMsg(b, room.selfUser.nodeId);
			e = this.cmdProtobufCoded.encodedPacket(this.roomPduType.SUB_ROOM_RESOURCE_MSG, 0, room.selfUser.nodeId, d, g)
		}
		this.signalingChannel.send(e), this.signalingChannel.send("")
	}, e.prototype.subscribleHandleP2P = function(a) {
		if (room.selfUser.nodeId > a.owner_id) {
			a.stream.sdp = "";
			var b = this.cmdProtobufCoded.newSubRoomResourceReq(0, a, room.selfUser.nodeId);
			log.info("=========subscribleHandleP2P() =======SUB_ROOM_RESOURCE_REQ====");
			var c = this.cmdProtobufCoded.encodedPacket(this.roomPduType.SUB_ROOM_RESOURCE_REQ, 0, room.selfUser.nodeId, a.owner_id, b);
			this.signalingChannel.send(c), this.signalingChannel.send("")
		} else {
			var b = this.cmdProtobufCoded.newSubRoomResourceReq(0, a, room.selfUser.nodeId);
			room.traceableP2PPeerConnection.sendSubSdpOfferP2P("offerSub", b)
		}
	}, e.prototype.unpublishHandleP2P = function(a, b, c, d) {
		if (null != b && b.length > 0) for (var e = 0; e < b.length; e++) {
			var f = b[e];
			room.traceableP2PPeerConnection.removeStreamP2P(a, f, c), room.selfUser.nodeId > f ? room.traceableP2PPeerConnection.sendUnSubSdpAnswerP2P("unpubAnswer", a, f, null) : room.traceableP2PPeerConnection.sendUnSubSdpOfferP2P("unpubOffer", a, f, null)
		}
		var g;
		"video" == a ? (g = this.mediaType.video, log.debug("===unPubWebcam() p2p=== send  video  UNPUB_ROOM_RESOURCE_MSG: " + room.selfUser.nodeId + "------>service")) : "audio" == a ? (g = this.mediaType.audio, log.debug("===unPubWebcam() p2p=== send  audio  UNPUB_ROOM_RESOURCE_MSG: " + room.selfUser.nodeId + "------>service")) : "screen" == a && (g = this.mediaType.desktop, log.debug("===unPubWebcam() p2p=== send  screen  UNPUB_ROOM_RESOURCE_MSG: " + room.selfUser.nodeId + "------>service"));
		var h = this.cmdProtobufCoded.newMediaStream(c.id, g, null),
			i = this.cmdProtobufCoded.newRoomResourceInfo(d, room.selfUser.nodeId, h),
			j = this.cmdProtobufCoded.newUnpubRoomResourceMsg(i),
			k = this.cmdProtobufCoded.encodedPacket(this.roomPduType.UNPUB_ROOM_RESOURCE_MSG, 0, room.selfUser.nodeId, 0, j);
		this.signalingChannel.send(k), this.signalingChannel.send("")
	}, e.prototype.unsubscribleHandleP2P = function(a, b) {
		room.selfUser.nodeId > b.owner_id ? room.traceableP2PPeerConnection.sendUnSubSdpAnswerP2P("unsubAnswer", a, b.owner_id, b) : room.traceableP2PPeerConnection.sendUnSubSdpOfferP2P("unsubOffer", a, b.owner_id, b)
	}, e.prototype.sendAnnotationMessage = function(a, b, d, e, f, g, h, i, j) {
		for (var b = b + "", k = "1", l = [], m = d[0].x, n = d[0].x, o = d[0].y, p = d[0].y, q = 0; q < d.length; q++) {
			var r = this.cmdProtobufCoded.newPoint(d[q].x, d[q].y);
			l.push(r), d[q].x > m && (m = d[q].x), d[q].x < n && (n = d[q].x), d[q].y > o && (o = d[q].y), d[q].y < o && (o = d[q].y)
		}
		var s = this.lineArrow.none,
			t = this.annotationType.annotation_tool_mouse;
		e == canvasTypeEnum.line ? t = this.annotationType.annotation_tool_line : e == canvasTypeEnum.rect ? t = this.annotationType.annotation_tool_rectangle : e == canvasTypeEnum.polyline ? t = this.annotationType.annotation_tool_polyline : e == canvasTypeEnum.ellipse ? t = this.annotationType.annotation_tool_ellipse : e == canvasTypeEnum.arrowline ? (t = this.annotationType.annotation_tool_line, s = h || this.lineArrow.none) : e == canvasTypeEnum.undo ? t = this.annotationType.annotation_tool_undo : e == canvasTypeEnum.redo ? t = this.annotationType.annotation_tool_redo : e == canvasTypeEnum.eraser ? t = this.annotationType.annotation_tool_eraser_line : e == canvasTypeEnum.right ? t = this.annotationType.annotation_tool_success : e == canvasTypeEnum.wrong && (t = this.annotationType.annotation_tool_failure);
		var u = c(f),
			v = this.cmdProtobufCoded.newcolor(parseInt(u[3]), parseInt(u[0]), parseInt(u[1]), parseInt(u[2])),
			w = null;
		i == fillTypeEnum.none ? w = this.cmdProtobufCoded.newcolor(0, 255, 255, 255) : i == fillTypeEnum.full && (w = v);
		var x = this.cmdProtobufCoded.newRect(p, o, n, m),
			y = this.cmdProtobufCoded.newAnnotationObject(b, k, room.selfUser.nodeId, room.selfUser.id, t, s, g, v, w, x),
			z = null;
		if (2 == l.length) {
			var A = l[0],
				B = l[1];
			z = this.cmdProtobufCoded.newAnnotation2Point(y, A, B)
		} else z = l.length > 2 ? this.cmdProtobufCoded.newAnnotationMultiPoint(y, l) : this.cmdProtobufCoded.newAnnotationList(y, j);
		var C = this.cmdProtobufCoded.newAnnotationMsgInternal(t, z.toArrayBuffer(), k, room.selfUser.nodeId, 0),
			D = this.cmdProtobufCoded.newAnnotationMsg(t, C.toArrayBuffer()),
			E = this.roomPduType.ANNOTATION_MSG,
			F = this.cmdProtobufCoded.encodedPacket(E, 0, room.selfUser.nodeId, 0, D);
		this.signalingChannel.send(F)
	}, e
}), ModuleBase.define("P2PServer", ["TraceableP2PPeerConnection"], function(a) {
	function b(a) {
		room.selfUser.nodeId < a && (null != this.selfNodeIntervalId && (clearInterval(this.selfNodeIntervalId), this.selfNodeIntervalId = null), room.traceableP2PPeerConnection.getToP2PPeerConnection(a))
	}
	var c = function() {
			this.selfNodeIntervalId = null, this.traceableP2PPeerConnection = new a, room.traceableP2PPeerConnection = this.traceableP2PPeerConnection
		};
	return c.prototype.createP2PPeerConnection = function(a) {
		null != room.selfUser && null != room.selfUser.nodeId ? b(a) : this.selfNodeIntervalId = setInterval(function() {
			null != room.selfUser && null != room.selfUser.nodeId && b(a)
		}, 200)
	}, c
});
var log = log4javascript.getLogger(),
	room, rooms = [],
	browserDetect, videoCoding = VideoCodingType.VP8,
	setRemoteDescriptionSuccess = !1,
	addIcecandidateList = [];
ModuleBase.define("AVDEngine", ["Room", "RestServer", "Error", "BrowserDetect", "Record", "Live"], function(a, b, c, d, e, f) {
	function g(a) {
		for (var b = null, c = 0; c < rooms.length; c++) {
			var d = rooms[c];
			if (d.roomId == a) {
				b = d;
				break
			}
		}
		return b
	}
	function h(a) {
		var b = new log4javascript.PatternLayout("%d{yyyy-MM-dd HH:mm:ss} %-5p - %m{1}%n");
		a.setLayout(b), log.addAppender(a)
	}
	function i(a, b, c, d) {
		var e = [];
		for (var f in b) e.push(f);
		var g = arrayUtil.inANotInB(e, a),
			h = arrayUtil.inANotInB(a, e);
		if (0 == h.length && 0 == g.length) return !1;
		for (var i = 0; i < this.rooms.length; i++) {
			var j = c[i];
			if (null != j.selfUser) {
				if (g.length > 0) for (var k = 0; k < g.length; k++) {
					var l = b[g[k]];
					d[g[k]] = l
				}
				if (h.length > 0) for (var k = 0; k < h.length; k++) {
					var l = d[h[k]];
					h[k] == self.checkMicrophoneId && j.selfUser.deleteAudio(h[k]), delete d[h[k]]
				}
			}
		}
	}
	function j(a, b, c, d) {
		var e = [];
		for (var f in b) e.push(f);
		var g = arrayUtil.inANotInB(e, a),
			h = arrayUtil.inANotInB(a, e);
		if (0 == h.length && 0 == g.length) return !1;
		for (var i = 0; i < c.length; i++) {
			var j = c[i];
			if (null != j.selfUser) {
				if (g.length > 0) for (var k = 0; k < g.length; k++) {
					var l = b[g[k]];
					d[g[k]] = l, j.selfUser.initVideo(g[k], l)
				}
				if (h.length > 0) for (var k = 0; k < h.length; k++) delete d[h[k]], j.selfUser.deleteVideo(h[k])
			}
		}
	}
	var k = function() {
			this.accessToken, this.cameraMap = {}, this.microphoneMap = {}, this.speakerMap = {}, this.checkMicrophoneId = null, this.checkMicrophoneName = null, this.checkAudioStream = null, this.checkVideoStream = null;
			var a = new log4javascript.BrowserConsoleAppender;
			a.setThreshold(log4javascript.Level.ERROR), h(a)
		};
	return k.prototype.getVersion = function() {
		return "cn.tee3.avd-2.4.0.0"
	}, k.prototype.getBrowserDetect = function() {
		var a = new d;
		return a.detect
	}, k.prototype.checkBrowserSupport = function() {
		var a = new d;
		return a.checkBrowserSupport()
	}, k.prototype.setLog = function(a, b) {
		var c;
		a == Appender.alert ? c = new log4javascript.AlertAppender : a == Appender.inpage ? c = new log4javascript.InPageAppender : a == Appender.popup ? c = new log4javascript.PopUpAppender : a == Appender.browserConsole && (c = new log4javascript.BrowserConsoleAppender), b == LogLevel.all ? c.setThreshold(log4javascript.Level.ALL) : b == LogLevel.trace ? c.setThreshold(log4javascript.Level.TRACE) : b == LogLevel.debug ? c.setThreshold(log4javascript.Level.DEBUG) : b == LogLevel.info ? c.setThreshold(log4javascript.Level.INFO) : b == LogLevel.warn ? c.setThreshold(log4javascript.Level.WARN) : b == LogLevel.error ? c.setThreshold(log4javascript.Level.ERROR) : b == LogLevel.fatal ? c.setThreshold(log4javascript.Level.FATAL) : b == LogLevel.off && c.setThreshold(log4javascript.Level.OFF), h(c)
	}, k.prototype.setVideoCoding = function(a) {
		videoCoding = a
	}, k.prototype.getVideoCoding = function() {
		return videoCoding
	}, k.prototype.getResolutionEnum = function() {
		var a = when.defer();
		return a.resolve(Resolution), a.promise
	}, k.prototype.init = function(a, e) {
		var f = when.defer();
		log.info("AVDEngine init begin"), browserDetect = new d;
		var g = new b;
		return this.accessToken = e.replace(/%3D%3D/g, "=="), this.accessToken = this.accessToken.replace(/%3d%3d/g, "=="), g.getServerinfo(a, e).then(function() {
			f.resolve()
		}).otherwise(function(a) {
			if (a) f.reject(a);
			else {
				var b = new c(ErrorConstant.avdEngine_init_failed);
				f.reject(b)
			}
		}), f.promise
	}, k.prototype.initWithOEM = function(a, b) {
		var e = when.defer();
		if (log.info("AVDEngine OEM  init begin"), "qiniu.com" != b) {
			var f = new c(ErrorConstant.oemname_notfound);
			e.reject(f)
		} else browserDetect = new d, mcuRestServerUrl = a, roomServerUrl = a, is_cluster = !0, e.resolve();
		return e.promise
	}, k.prototype.obtainRoom = function(b) {
		return room = g(b), null == room && (room = new a(b), room.avdEngine = this, rooms.push(room)), room
	}, k.prototype.getAllDevices = function() {
		var a = when.defer();
		if ("undefined" != typeof navigator.mediaDevices)"chrome" != webrtcDetectedBrowser && "Internet Explorer" != webrtcDetectedBrowser || navigator.mediaDevices.enumerateDevices().then(function(b) {
			a.resolve(b)
		});
		else if ("undefined" != typeof MediaStreamTrack)"chrome" != webrtcDetectedBrowser && "Internet Explorer" != webrtcDetectedBrowser || MediaStreamTrack.getSources(function(b) {
			a.resolve(b)
		});
		else {
			var b = new c(ErrorConstant.not_support_mediaStreamTrack);
			a.reject(b)
		}
		return a.promise
	}, k.prototype.initDevice = function() {
		var a = this;
		log.info("initDevice:Camera and Microphone begin"), this.getAllDevices().then(function(b) {
			for (var c = {}, d = 0, e = {}, f = 0, g = {}, h = 0, i = 0; i != b.length; ++i) {
				var j = b[i],
					k = j.deviceId || j.id;
				"videoinput" === j.kind || "video" === j.kind ? (d += 1, c[k] = j.label || "camera" + d) : "audioinput" === j.kind || "audio" === j.kind ? (f += 1, e[k] = j.label || "microphone" + f) : "audiooutput" === j.kind && (h += 1, g[k] = j.label || "speaker" + h)
			}
			a.cameraMap = c, log.info("initDevice Camera finish!cameraMap:" + c), a.microphoneMap = e;
			for (var l in e) {
				var m = e[l];
				a.checkMicrophoneId = l, a.checkMicrophoneName = m;
				break
			}
			log.info("initDevice Microphone finish!microphoneMap:" + e), a.speakerMap = g
		}).otherwise(function(a) {
			log.info("get device error!error code:" + a.code + "; error message:" + a.message)
		})
	}, k.prototype.refreshDevice = function() {
		var a = when.defer(),
			b = this,
			c = [];
		for (key in b.microphoneMap) c.push(key);
		var d = [];
		for (key in b.cameraMap) d.push(key);
		return "chrome" != webrtcDetectedBrowser && "Internet Explorer" != webrtcDetectedBrowser || this.getAllDevices().then(function(a) {
			for (var e = {}, f = 0, g = {}, h = 0, k = {}, l = 0, m = 0; m != a.length; ++m) {
				var n = a[m],
					o = n.deviceId || n.id;
				"videoinput" === n.kind || "video" === n.kind ? (f += 1, e[o] = n.label || "camera" + f) : "audioinput" === n.kind || "audio" === n.kind ? (h += 1, g[o] = n.label || "microphone" + h) : "audiooutput" === n.kind && (l += 1, k[o] = n.label || "speaker" + l)
			}
			j(d, e, this.rooms, b.cameraMap);
			for (var p in g) {
				var q = g[p];
				b.checkMicrophoneId = p, b.checkMicrophoneName = q;
				break
			}
			i(c, g, this.rooms, b.microphoneMap), b.speakerMap = k
		}).otherwise(function(a) {
			log.info("get device error!error code:" + a.code + "; error message:" + a.message)
		}), "firefox" == webrtcDetectedBrowser && captureUserMedia({
			audio: !0,
			video: !0
		}, function(a) {
			getAllAudioVideoDevices(function(a) {
				for (var e = {}, f = 0, g = 0; g != a.audioInputDevices.length; ++g) {
					var h = a.audioInputDevices[g];
					f += 1, e[h.id] = h.label || "microphone" + f
				}
				i(c, e, this.rooms, b.microphoneMap);
				for (var k = {}, l = 0, g = 0; g != a.videoInputDevices.length; ++g) {
					var m = a.videoInputDevices[g];
					l += 1, k[m.id] = m.label || "camera" + l
				}
				j(d, k, this.rooms, b.cameraMap)
			}, function(a) {})
		}, function(a) {}), setTimeout(function() {
			a.resolve()
		}, 2e3), a.promise
	}, k.prototype.setRecordingMicrophone = function(a) {
		var b = room.selfUser.audio;
		if (null == b) {
			var c = this.microphoneMap[a];
			room.selfUser.initAudio(a, c)
		} else if (a != b.id) if (b.status == StreamStatus.init) {
			room.selfUser.deleteAudio(b.id);
			var c = this.microphoneMap[a];
			room.selfUser.initAudio(a, c)
		} else if (b.status == StreamStatus.published) {
			var d = b.element;
			b.closeMicrophone(), room.selfUser.deleteAudio(b.id);
			var c = this.microphoneMap[a];
			room.selfUser.initAudio(a, c), room.selfUser.audio.openMicrophone(d)
		}
	}, k.prototype.getDeviceObject = function() {
		var a = when.defer();
		return log.info("getDeviceObject begin"), this.getAllDevices().then(function(b) {
			for (var c = {
				video: null,
				audio: null,
				speaker: null
			}, d = {}, e = 0, f = {}, g = 0, h = {}, i = 0, j = 0; j != b.length; ++j) {
				var k = b[j],
					l = k.deviceId || k.id;
				"videoinput" === k.kind || "video" === k.kind ? (e += 1, d[l] = k.label || "camera" + e) : "audioinput" === k.kind || "audio" === k.kind ? (g += 1, f[l] = k.label || "microphone" + g) : "audiooutput" === k.kind && (i += 1, h[l] = k.label || "speaker" + i)
			}
			c.video = d, c.audio = f, c.speaker = h, a.resolve(c)
		}).otherwise(function(b) {
			a.reject(b)
		}), a.promise
	}, k.prototype.checkDevice = function() {
		var a = when.defer();
		return this.getAllDevices().then(function(b) {
			for (var c = {
				video: !1,
				audio: !1,
				speaker: !1
			}, d = 0; d != b.length; ++d) {
				var e = b[d];
				e.deviceId || e.id;
				"videoinput" === e.kind || "video" === e.kind ? c.video = !0 : "audioinput" === e.kind || "audio" === e.kind ? c.audio = !0 : "audiooutput" === e.kind && (c.speaker = !0)
			}
			a.resolve(c)
		}).otherwise(function(b) {
			a.reject(b)
		}), a.promise
	}, k.prototype.checkOpenVideo = function(a, b, c) {
		var d = when.defer(),
			e = this,
			f = {
				video: !0,
				audio: !1
			};
		if (f.video = {
			mandatory: {},
			optional: []
		}, a && (f.video.mandatory.sourceId = a), b) {
			var g = Resolution[b];
			f.video.mandatory.minWidth = g.width, f.video.mandatory.minHeight = g.height, f.video.mandatory.maxWidth = g.width, f.video.mandatory.maxHeight = g.height
		}
		c && ("string" == typeof c && (c = Number(c)), f.video.mandatory.minFrameRate = c, f.video.mandatory.maxFrameRate = c);
		try {
			getUserMedia(f, function(a) {
				e.checkVideoStream = a, d.resolve(a)
			}, function(a) {
				var b, c = ModuleBase.use(ModulesEnum.error);
				b = new c("PermissionDeniedError" == a.name ? ErrorConstant.navigatorUserMediaError_permissionDenied : "ConstraintNotSatisfiedError" == a.name ? ErrorConstant.navigatorUserMediaError_constraintNotSatisfied : "TrackStartError" == a.name ? ErrorConstant.navigatorUserMediaError_trackStartError : ErrorConstant.navigatorUserMediaError_unknown), d.reject(b)
			})
		} catch (a) {
			var h = ModuleBase.use(ModulesEnum.error),
				i = new h(ErrorConstant.navigatorUserMediaError_unknown);
			d.reject(i)
		}
		return d.promise
	}, k.prototype.checkOpenAudio = function(a) {
		var b = when.defer(),
			c = this,
			d = {
				video: !1,
				audio: !0
			};
		a && (d.audio = {
			mandatory: {},
			optional: []
		}, d.audio.mandatory.sourceId = a);
		try {
			getUserMedia(d, function(a) {
				c.checkAudioStream = a, b.resolve(a)
			}, function(a) {
				var c, d = ModuleBase.use(ModulesEnum.error);
				c = new d("PermissionDeniedError" == a.name ? ErrorConstant.navigatorUserMediaError_permissionDenied : "ConstraintNotSatisfiedError" == a.name ? ErrorConstant.navigatorUserMediaError_constraintNotSatisfied : "TrackStartError" == a.name ? ErrorConstant.navigatorUserMediaError_trackStartError : ErrorConstant.navigatorUserMediaError_unknown), b.reject(c)
			})
		} catch (a) {
			var e = ModuleBase.use(ModulesEnum.error),
				f = new e(ErrorConstant.navigatorUserMediaError_unknown);
			b.reject(f)
		}
		return b.promise
	}, k.prototype.checkCloseVideo = function() {
		this.checkVideoStream && this.checkVideoStream.getTracks().forEach(function(a) {
			a.stop()
		}), this.checkVideoStream = null
	}, k.prototype.checkCloseAudio = function() {
		this.checkAudioStream && this.checkAudioStream.getTracks().forEach(function(a) {
			a.stop()
		}), this.checkAudioStream = null
	}, k.prototype.obtainRecord = function(a) {
		var b = new e(a);
		return b
	}, k.prototype.obtainLive = function(a) {
		var b = new f(a);
		return b
	}, k
}), ModuleBase.define("Room", ["SignalFactory", "RestServer", "MasterServer", "P2PServer", "User", "Error"], function(a, b, c, d, e, f) {
	function g(a) {
		log.info("============openReqSend(websocket)===========");
		var b = when.defer();
		return room.p2pServer = new d, room.masterServer = new c(a), room.masterServer.openReqSend(), room.addCallback(EngineCallback.room_join_success, function(a) {
			b.resolve(a)
		}), room.addCallback(EngineCallback.room_join_error, function(a) {
			b.reject(a)
		}), b.promise
	}
	var h = function(a) {
			this.id = a, this.roomTocken = null, this.signalTocken = null, this.pingTimeout, this.pingInterval, this.pingCountTime = 0, this.pingIntervalId = null, this.pingTimeoutId = null, this.webocketStatusIntervalId = null, this.roomInfo = null, this.status = RoomStatus.opening, this.appData = {}, this.selfUser = null, this.participants = [], this.muteSpeakerFlag = !1, this.avdEngine = null, this.masterServer = null, this.p2pServer = null, this.cmdProtobufCoded = null, this.traceablePeerConnection = null, this.traceableP2PPeerConnection = null, this.eventEmitter = new EventEmitter, this.iceUfragLocal, this.icePwdLocal, this.fingerPrint, this.iceUfrag, this.icePwd, this.setup, this.sdp = null, this.connectionInfoCollector = null, this.audioLevel = null, this.baselineReconnectionTime, this.reconnectionTime, this.reconnectionCount = 0, this.reconnectionState = !1, this.reconnectionOpenRep402 = !1, this.toMCUReconnectionPC = null, this.pubVideos = [], this.pubAudios = [], this.pubScreens = [], this.baselineJoinTime = null, this.joinTimeoutIntervalId = null, this.joinTimeout = 1e4, this.joinTimeoutState = !1, this.audioSsrc2user = {}
		};
	return h.prototype.join = function(a, c, d, e) {
		var g = when.defer();
		if (is_cluster) {
			var h = new b;
			h.getMcu(room.id, room.avdEngine.accessToken).then(function() {
				room.doJoin(a, c, d, e, g)
			}).otherwise(function(a) {
				g.reject(a)
			})
		} else room.doJoin(a, c, d, e, g);
		if (!room.isMcu()) {
			var i = doFsCheck(FTConstant.p2p, f);
			if (null != i) return g.reject(i), g.promise
		}
		return g.promise
	}, h.prototype.joinWithOEM = function(a, c, d, e, f) {
		var g = when.defer(),
			h = new b;
		return h.getMcuWithOEM(room.id, f).then(function() {
			room.doJoin(a, c, d, e, g)
		}).otherwise(function(a) {
			g.reject(a)
		}), g.promise
	}, h.prototype.doJoin = function(b, c, d, h, i) {
		if (null == b || "" == b) {
			var j = new f(ErrorConstant.userId_required);
			i.reject(j)
		} else {
			null == room.baselineJoinTime && (room.baselineJoinTime = new Date), room.joinTimeoutIntervalId = setInterval(function() {
				var a = new Date,
					b = a - room.baselineJoinTime;
				if (b >= room.joinTimeout) {
					room.joinTimeoutIntervalId && (clearInterval(room.joinTimeoutIntervalId), room.joinTimeoutIntervalId = null, room.baselineJoinTime = null), room.joinTimeoutState = !0, log.error("登陆加会超时：" + ErrorConstant.join_room_timeout.code);
					var c = new f(ErrorConstant.join_room_timeout);
					i.reject(c)
				}
			}, 500), this.selfUser = new e(b, c, d, h);
			var k = new a,
				l = k.getDataChannel(SignalType.websocket);
			l.connect().then(g).then(function(a) {
				log.debug("==========doJoin websokcet(one) success========"), a.joinTimeoutIntervalId && (clearInterval(a.joinTimeoutIntervalId), a.joinTimeoutIntervalId = null, a.baselineJoinTime = null), i.resolve(a)
			}).otherwise(function(a) {
				log.debug("==========doJoin websokcet(one) error========"), room.joinTimeoutIntervalId && (clearInterval(room.joinTimeoutIntervalId), room.joinTimeoutIntervalId = null, room.baselineJoinTime = null, room.masterServer.pingInit()), i.reject(a)
			})
		}
		room.addCallback(EngineCallback.room_join_websocket_reconnection_success, function(a) {
			g(a).then(function(a) {
				log.debug("==========doJoin websokcet(reconnection) success========"), a.joinTimeoutIntervalId && (clearInterval(a.joinTimeoutIntervalId), a.joinTimeoutIntervalId = null, a.baselineJoinTime = null), i.resolve(a)
			}).otherwise(function(a) {
				log.debug("==========doJoin websokcet(reconnection) error========"), room.joinTimeoutIntervalId && (clearInterval(room.joinTimeoutIntervalId), room.joinTimeoutIntervalId = null, room.baselineJoinTime = null, room.masterServer.pingInit()), i.reject(a)
			})
		})
	}, h.prototype.reJoin = function() {
		log.info("reJoin room  Operation！");
		var b = when.defer();
		return room.traceablePeerConnection.close(this.toMCUReconnectionPC), this.toMCUReconnectionPC = null, room.webocketStatusIntervalId = setInterval(function() {
			if (room.masterServer.signalingChannel.readyState == WebSocket.CLOSED) {
				clearInterval(room.webocketStatusIntervalId), room.webocketStatusIntervalId = null;
				var c = new a,
					d = c.getDataChannel(SignalType.websocket);
				d.connect().then(g).then(function(a) {
					room.pingTimeout = a.pingTimeout, room.pingInterval = a.pingInterval, room.signalTocken = a.signalTocken, room.masterServer = a.masterServer, b.resolve(room)
				}).otherwise(function(a) {
					b.reject(a)
				})
			}
		}, 500), b.promise
	}, h.prototype.reconnectionHandle = function() {
		var b = new Date;
		if (0 == this.reconnectionCount && (this.baselineReconnectionTime = b), b - this.baselineReconnectionTime > this.pingTimeout) this.reconnectionState = !1, this.reconnectionOpenRep402 = !0, setRemoteDescriptionSuccess = !1, addIcecandidateList = [], this.eventEmitter.emit(RoomCallback.connection_status, ConnectionStatus.connectFailed);
		else {
			this.reconnectionState = !0, this.reconnectionCount += 1, log.info("与服务器第" + this.reconnectionCount + "次重连。");
			var c = new a,
				d = c.getDataChannel(SignalType.websocket);
			d.connect().then(function(a) {
				log.debug("=========reconnectionHandle(),websocket.connect() success======="), null != room.joinTimeoutIntervalId ? (log.debug("=========加会时,websocket重连成功======="), room.reconnectionState = !1, room.reconnectionCount = 0, room.eventEmitter.emit(EngineCallback.room_join_websocket_reconnection_success, a)) : (log.debug("=========房间网络科动时,websocket重连成功======="), room.masterServer.signalingChannel = a, room.masterServer.openReqReconnectionSend())
			})
		}
	}, h.prototype.getRoomId = function() {
		return room.roomInfo.room_id
	}, h.prototype.getRoomTopic = function() {
		return room.roomInfo.topic
	}, h.prototype.getOwnerId = function() {
		return room.roomInfo.owner_id
	}, h.prototype.isMcu = function() {
		var a = !0;
		if (null == room.roomInfo) return a;
		var b = room.roomInfo.room_mode;
		return 3 != b && 4 != b || (a = !1), a
	}, h.prototype.getMaxAudio = function() {
		return room.roomInfo.max_audio
	}, h.prototype.getMaxVideo = function() {
		return room.roomInfo.max_video
	}, h.prototype.getMaxAttendee = function() {
		return room.roomInfo.attendee_max
	}, h.prototype.getUsableVideo = function() {
		var a = this.getMaxVideo() - this.pubVideos.length;
		return a < 0 && (a = 0), a
	}, h.prototype.getUsableAudio = function() {
		var a = this.getMaxAudio() - this.pubAudios.length;
		return a < 0 && (a = 0), a
	}, h.prototype.updateRoomStatus = function(a) {
		this.status = a
	}, h.prototype.getRoomStatus = function() {
		return this.status
	}, h.prototype.getHost = function() {
		for (var a = 0; a != this.participants.length; ++a) {
			var b = this.participants[a];
			if (1 == b.role) return b
		}
	}, h.prototype.getSelfUser = function() {
		return room.selfUser
	}, h.prototype.getSelfUserId = function() {
		return room.selfUser.id
	}, h.prototype.getParticipants = function() {
		return this.participants
	}, h.prototype.getUser = function(a) {
		for (var b, c = 0; c < this.participants.length; c++) {
			var d = this.participants[c];
			if (d.id == a) {
				b = d;
				break
			}
		}
		return b
	}, h.prototype.hasUser = function(a) {
		for (var b = !1, c = 0; c < this.participants.length; c++) {
			var d = this.participants[c];
			if (d.id == a) {
				b = !0;
				break
			}
		}
		return b
	}, h.prototype.getPublishedCameraCount = function() {
		return this.pubVideos.length
	}, h.prototype.getPublishedCamera = function() {
		return this.pubVideos
	}, h.prototype.getPublishedScreenCount = function() {
		return this.pubScreens.length
	}, h.prototype.getPublishedScreen = function() {
		return this.pubScreens
	}, h.prototype.addUser = function(a) {
		this.hasUser(a.id) || this.participants.push(a)
	}, h.prototype.removeUser = function(a) {
		null != this.participants && this.participants.length > 0 && arrayUtil.objectSplice(this.participants, a)
	}, h.prototype.getUserByNodeId = function(a) {
		for (var b, c = 0; c < this.participants.length; c++) {
			var d = this.participants[c];
			if (d.nodeId == a) {
				b = d;
				break
			}
		}
		return b
	}, h.prototype.getNodeId = function(a) {
		var b = null,
			c = this.getUser(a);
		return null != c && (b = c.nodeId), b
	}, h.prototype.getUserId = function(a) {
		var b = null,
			c = this.getUserByNodeId(a);
		return null != c && (b = c.id), b
	}, h.prototype.sendPublicMessage = function(a) {
		var b = when.defer(),
			c = doFsCheck(FTConstant.chat, f);
		return null == c ? (this.masterServer.sendMessage(a), b.resolve()) : b.reject(c), b.promise
	}, h.prototype.sendPrivateMessage = function(a, b) {
		var c = when.defer(),
			d = doFsCheck(FTConstant.chat, f);
		return null == d ? (this.masterServer.sendMessage(a, b), c.resolve()) : c.reject(d), c.promise
	}, h.prototype.sendPublicData = function(a) {
		var b = when.defer(),
			c = doFsCheck(FTConstant.datachannel, f);
		return null == c ? (this.masterServer.sendData(a), b.resolve()) : b.reject(c), b.promise
	}, h.prototype.sendPrivateData = function(a, b) {
		var c = when.defer(),
			d = doFsCheck(FTConstant.datachannel, f);
		return null == d ? (this.masterServer.sendData(a, b), c.resolve()) : c.reject(d), c.promise
	}, h.prototype.updateAppData = function(a, b) {
		this.appData[a] = b, this.masterServer.roomDataInfo(a, b)
	}, h.prototype.getAppData = function(a) {
		return "undefined" == typeof a || null == a || "" == a ? this.appData : this.appData[a]
	}, h.prototype.setCameraResolutionOrFrameRate = function(a, b, c) {
		var d = when.defer(),
			e = parseInt(b);
		if (e > 640) {
			var g = doFsCheck(FTConstant.video_hd, f);
			if (null != g) return d.reject(g), d.promise
		}
		var h = room.selfUser.getVideo(a);
		if (null != h) {
			if ("string" == typeof c && (c = Number(c)), h.resolution != Resolution[b] || h.frameRate != c) if (null != h.stream) if (h.status == StreamStatus.none || h.status == StreamStatus.init) h.stream = null, h.setResolution(b), h.setFrameRate(c), d.resolve();
			else {
				var g = new f(ErrorConstant.closeVideo_before_operation_warnings);
				d.reject(g)
			} else h.setResolution(b), h.setFrameRate(c), d.resolve()
		} else {
			var g = new f(ErrorConstant.cameraId_does_not_exist);
			d.reject(g)
		}
		return d.promise
	}, h.prototype.setCameraResolutionWHOrFrameRate = function(a, b, c, d) {
		var e = when.defer(),
			g = parseInt(b);
		if (g > 640) {
			var h = doFsCheck(FTConstant.video_hd, f);
			if (null != h) return e.reject(h), e.promise
		}
		var i = room.selfUser.getVideo(a);
		if (null != i) {
			if ("string" == typeof d && (d = Number(d)), "undefined" == typeof i.resolution) i.setResolutionWH(b, c), i.setFrameRate(d), e.resolve();
			else if (i.resolution.width != b || i.resolution.height != c || i.frameRate != d) if (null != i.stream) if (i.status == StreamStatus.none || i.status == StreamStatus.init) i.stream = null, i.setResolutionWH(b, c), i.setFrameRate(d), e.resolve();
			else {
				var h = new f(ErrorConstant.closeVideo_before_operation_warnings);
				e.reject(h)
			} else i.setResolutionWH(b, c), i.setFrameRate(d), e.resolve()
		} else {
			var h = new f(ErrorConstant.cameraId_does_not_exist);
			e.reject(h)
		}
		return e.promise
	}, h.prototype.muteSpeaker = function() {
		this.muteSpeakerFlag = !0, this.participants.forEach(function(a) {
			if (a.id != room.selfUser.id) {
				var b = a.audio.stream;
				if (null != b) {
					var c = b.getAudioTracks();
					for (i = 0; i < c.length; i++) c[i].enabled = !1
				}
			}
		})
	}, h.prototype.unmuteSpeaker = function() {
		this.muteSpeakerFlag = !1, this.participants.forEach(function(a) {
			if (a.id != room.selfUser.id) {
				var b = a.audio.stream;
				if (null != b) {
					var c = b.getAudioTracks();
					for (i = 0; i < c.length; i++) c[i].enabled = !0
				}
			}
		})
	}, h.prototype.ismuteSpeaker = function() {
		return this.muteSpeakerFlag
	}, h.prototype.kickoffUser = function(a, b) {
		this.masterServer.userIndiction(a, b)
	}, h.prototype.leave = function(a, b) {
		var c = when.defer(),
			d = room.selfUser.videos;
		if (null != d && d.length > 0) for (key in d) {
			var e = d[key];
			e.status == StreamStatus.published && (e.unpreview(), e.unpublish())
		}
		var f = room.selfUser.audio;
		null != f && f.status == StreamStatus.published && f.closeMicrophone();
		var g = room.selfUser.screen;
		null != g && g.status == StreamStatus.published && g.unpublish(), null != this.pingIntervalId && (clearInterval(this.pingIntervalId), this.pingIntervalId = null), null != this.pingTimeoutId && (clearInterval(this.pingTimeoutId), this.pingTimeoutId = null), null != this.selfUser && null != this.selfUser.toMCUPC && this.selfUser.toMCUPC.close();
		var h = this;
		return setTimeout(function() {
			h.masterServer.userMsg(a, b), null != room && (room = null), c.resolve()
		}, 1e3), c.promise
	}, h.prototype.addCallback = function(a, b) {
		this.eventEmitter.addListener(a, b)
	}, h.prototype.composePDUDeviceId = function(a, b) {
		return a + "_" + b
	}, h.prototype.splitPDUDeviceId = function(a) {
		var b = a.split("_");
		return b[1]
	}, h.prototype.splitUserId = function(a) {
		var b = a.split("_");
		return b[0]
	}, h.prototype.sendAnnotation = function(a, b, c, d, e, f, g, h, i) {
		log.info("send Annotation ========="), this.masterServer.sendAnnotationMessage(a, b, c, d, e, f, g, h, i)
	}, h
});
var remoteSDPInit = "";
navigator.mozGetUserMedia ? (remoteSDPInit += "v=0\r\n", remoteSDPInit += "o=mozilla...THIS_IS_SDPARTA-43.0.2 4991096922058414308 0 IN IP4 0.0.0.0\r\n", remoteSDPInit += "s=-\r\n", remoteSDPInit += "t=0 0\r\n", remoteSDPInit += "a=fingerprint:sha-1 72:9B:4F:23:98:6C:20:45:66:4E:E0:92:C7:82:9C:B5:40:2F:9B:8A\r\n", remoteSDPInit += "a=group:BUNDLE sdparta_0 sdparta_1\r\n", remoteSDPInit += "a=ice-options:trickle\r\n", remoteSDPInit += "a=msid-semantic:WMS *\r\n", remoteSDPInit += "m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8\r\n", remoteSDPInit += "c=IN IP4 0.0.0.0\r\n", remoteSDPInit += "a=sendrecv\r\n", remoteSDPInit += "a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n", remoteSDPInit += "a=ice-pwd:576032e0c3ba9904aa2dfb014e98a46f\r\n", remoteSDPInit += "a=ice-ufrag:e8cf35cf\r\n", remoteSDPInit += "a=mid:sdparta_0\r\n", remoteSDPInit += "a=rtcp-mux\r\n", remoteSDPInit += "a=rtpmap:109 opus/48000/2\r\n", remoteSDPInit += "a=rtpmap:9 G722/8000/1\r\n", remoteSDPInit += "a=rtpmap:0 PCMU/8000\r\n", remoteSDPInit += "a=rtpmap:8 PCMA/8000\r\n", remoteSDPInit += "a=setup:actpass\r\n", remoteSDPInit += "m=video 9 UDP/TLS/RTP/SAVPF 120 126 97\r\n", remoteSDPInit += "c=IN IP4 0.0.0.0\r\n", remoteSDPInit += "a=sendrecv\r\n", remoteSDPInit += "a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n", remoteSDPInit += "a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n", remoteSDPInit += "a=fmtp:120 max-fs=12288;max-fr=60\r\n", remoteSDPInit += "a=ice-pwd:576032e0c3ba9904aa2dfb014e98a46f\r\n", remoteSDPInit += "a=ice-ufrag:e8cf35cf\r\n", remoteSDPInit += "a=mid:sdparta_1\r\n", remoteSDPInit += "a=rtcp-fb:120 nack\r\n", remoteSDPInit += "a=rtcp-fb:120 ccm fir\r\n", remoteSDPInit += "a=rtcp-fb:126 nack\r\n", remoteSDPInit += "a=rtcp-fb:126 nack pli\r\n", remoteSDPInit += "a=rtcp-fb:126 ccm fir\r\n", remoteSDPInit += "a=rtcp-fb:97 nack\r\n", remoteSDPInit += "a=rtcp-fb:97 nack pli\r\n", remoteSDPInit += "a=rtcp-fb:97 ccm fir\r\n", remoteSDPInit += "a=rtcp-mux\r\n", remoteSDPInit += "a=rtpmap:120 VP8/90000\r\n", remoteSDPInit += "a=rtpmap:126 H264/90000\r\n", remoteSDPInit += "a=rtpmap:97 H264/90000\r\n", remoteSDPInit += "a=setup:actpass\r\n") : (remoteSDPInit += "v=0\r\n", remoteSDPInit += "o=- 0 0 IN IP4 127.0.0.1\r\n", remoteSDPInit += "s=-\r\n", remoteSDPInit += "t=0 0\r\n", remoteSDPInit += "a=group:BUNDLE video audio\r\n", remoteSDPInit += "a=msid-semantic: WMS\r\n", remoteSDPInit += "m=audio 1 RTP/SAVPF 103 102 111 0 8 9\r\n", remoteSDPInit += "c=IN IP4 127.0.0.1\r\n", remoteSDPInit += "a=rtcp:7000 IN IP4 127.0.0.1\r\n", remoteSDPInit += "a=ice-ufrag:n1PpqVgFoRQbl8RE\r\n", remoteSDPInit += "a=ice-pwd:y7nufWkbyjzhq2K7hCywlUWV\r\n", remoteSDPInit += "a=fingerprint:sha-1 72:9B:4F:23:98:6C:20:45:66:4E:E0:92:C7:82:9C:B5:40:2F:9B:8A\r\n", remoteSDPInit += "a=setup:passive\r\n", remoteSDPInit += "a=mid:audio\r\n", remoteSDPInit += "a=sendrecv\r\n", remoteSDPInit += "a=rtcp-mux\r\n", remoteSDPInit += "a=rtpmap:111 opus/48000/2\r\n", remoteSDPInit += "a=rtcp-fb:111 transport-cc\r\n", remoteSDPInit += "a=fmtp:111 minptime=10;useinbandfec=1\r\n", remoteSDPInit += "a=rtpmap:102 ILBC/8000\r\n", remoteSDPInit += "a=rtpmap:103 ISAC/16000\r\n", remoteSDPInit += "a=rtpmap:0 PCMU/8000\r\n", remoteSDPInit += "a=rtpmap:8 PCMA/8000\r\n", remoteSDPInit += "a=rtpmap:9 G722/8000\r\n", remoteSDPInit += "a=rtpmap:126 telephone-event/8000\r\n", remoteSDPInit += "a=maxptime:60\r\n", remoteSDPInit += "m=video 9 RTP/SAVPF 100 101 107\r\n", remoteSDPInit += "c=IN IP4 127.0.0.1\r\n", remoteSDPInit += "a=rtcp:7000 IN IP4 127.0.0.1\r\n", remoteSDPInit += "a=ice-ufrag:n1PpqVgFoRQbl8RE\r\n", remoteSDPInit += "a=ice-pwd:y7nufWkbyjzhq2K7hCywlUWV\r\n", remoteSDPInit += "a=fingerprint:sha-1 72:9B:4F:23:98:6C:20:45:66:4E:E0:92:C7:82:9C:B5:40:2F:9B:8A\r\n", remoteSDPInit += "a=setup:passive\r\n", remoteSDPInit += "a=mid:video\r\n", remoteSDPInit += "a=sendrecv\r\n", remoteSDPInit += "a=rtcp-mux\r\n", remoteSDPInit += "a=rtpmap:100 VP8/90000\r\n", remoteSDPInit += "a=rtcp-fb:100 ccm fir\r\n", remoteSDPInit += "a=rtcp-fb:100 nack\r\n", remoteSDPInit += "a=rtcp-fb:100 nack pli\r\n", remoteSDPInit += "a=rtcp-fb:100 goog-remb\r\n", remoteSDPInit += "a=maxptime:60\r\n", remoteSDPInit += "a=rtpmap:101 VP9/90000\r\n", remoteSDPInit += "a=rtcp-fb:101 ccm fir\r\n", remoteSDPInit += "a=rtcp-fb:101 nack\r\n", remoteSDPInit += "a=rtcp-fb:101 nack pli\r\n", remoteSDPInit += "a=rtcp-fb:101 goog-remb\r\n", remoteSDPInit += "a=rtpmap:107 H264/90000\r\n", remoteSDPInit += "a=rtcp-fb:107 ccm fir\r\n", remoteSDPInit += "a=rtcp-fb:107 nack\r\n", remoteSDPInit += "a=rtcp-fb:107 nack pli\r\n", remoteSDPInit += "a=rtcp-fb:107 goog-remb\r\n", remoteSDPInit += "a=rtcp-fb:107 transport-cc\r\n", remoteSDPInit += "a=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\n"), ModuleBase.define("TraceableWebsocket", ["MessageManager", "Error"], function(a, b) {
	var c = function() {};
	return c.prototype.connect = function() {
		var c = when.defer();
		try {
			var d = document.location.protocol,
				e = "ws://";
			"https:" == d && (e = "wss://");
			var f = e + roomServerUrl + "/ws";
			log.debug("=====websocket url===" + f);
			var g = new WebSocket(f);
			g.binaryType = "arraybuffer", g.readyState == WebSocket.CONNECTING && log.info("WebSocket连接正在建立..."), g.onopen = function() {
				g.readyState == WebSocket.OPEN && log.info("WebSocket连接已打开!"), c.resolve(g)
			}, g.onmessage = function(b) {
				var c = new a;
				c.OnWebSocketMessage(b.data)
			}, g.onclose = function(a) {
				g.readyState == WebSocket.CLOSED && (log.info("WebSocket连接已关闭!"), null == room || room.reconnectionOpenRep402 || room.reconnectionState || room.selfUser.mulLanding || room.joinTimeoutState || (log.info("=========onclose(), WebSocket开始重连=========="), room.masterServer && room.masterServer.pingInit(), room.eventEmitter.emit(RoomCallback.connection_status, ConnectionStatus.connecting), room.reconnectionHandle()))
			}, g.onerror = function(a) {
				log.info("WebSocket连接发生错误！"), null != room && room.reconnectionCount > 0 && !room.joinTimeoutState && (log.info("=========onerror(), WebSocket开始重连=========="), setTimeout(function() {
					room.reconnectionHandle()
				}, 3e3))
			}
		} catch (a) {
			log.info("websocket Operation  failed. with exception:" + a);
			var h = new b(ErrorConstant.websock_catch_exception);
			c.reject(h)
		}
		return c.promise
	}, c
}), ModuleBase.define("TraceablePeerConnection", ["Error"], function(a) {
	function b(a, b, c, d, e) {
		var f = {};
		return f.operationType = a, f.para1 = b, f.para2 = c, f.para3 = d, f.para4 = e, f
	}
	function c(a, b, c, d) {
		room.traceablePeerConnection.getToMCUPeerConnection().addStream(c), room.traceablePeerConnection.getToMCUPeerConnection().createOffer(function(e) {
			e.sdp = updateSDPIceUfrag(e.sdp, room.iceUfrag), e.sdp = updateSDPIcePwd(e.sdp, room.icePwd), e.sdp = g(e.sdp);
			var i, l, m, n, o = new SdpSerializer(e.sdp);
			"video" == a ? (i = o._inner.video.ssrcStr, i = f(i, c.id), log.debug("addSdp(),new add video sdp:" + i), l = room.selfUser.videoSdpSsrc, room.selfUser.videoSdpSsrc = i) : "audio" == a ? (i = o._inner.audio.ssrcStr, log.debug("addSdp(),new add audio sdp:" + i), m = room.selfUser.audioSdpSsrc, room.selfUser.audioSdpSsrc = i) : "screen" == a && (i = o._inner.video.ssrcStr, i = f(i, c.id), log.debug("addSdp(),new add screen sdp:" + i), n = room.selfUser.screenSdpSsrc, room.selfUser.screenSdpSsrc = i), room.masterServer.pubRoomResourceMsg(a, c.id, i, b, d), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(a) {
				a == d && (log.debug("addSdp(),  local sessionDescription:" + e.sdp), room.traceablePeerConnection.getToMCUPeerConnection().setLocalDescription(e, j, k), setTimeout(function() {
					var a = {};
					a.sdp = room.sdp, a.type = "answer", a.sdp = h(a.sdp), log.debug("addSdp(), remote sessionDescription:" + a.sdp);
					var b = new RTCSessionDescription(a);
					room.traceablePeerConnection.getToMCUPeerConnection().setRemoteDescription(b, function() {}, function(a) {
						log.error(a)
					})
				}, 200))
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(b, e) {
				e == d && (room.traceablePeerConnection.getToMCUPeerConnection().removeStream(c), "video" == a ? room.selfUser.videoSdpSsrc = l : "audio" == a ? room.selfUser.audioSdpSsrc = m : "screen" == a && (room.selfUser.screenSdpSsrc = n))
			})
		}, i, this.constraints)
	}
	function d(a, b, c) {
		var d = c.stream.stream_name,
			e = c.stream.sdp;
		if (null == e || "" == e) return !1;
		e = e.replace(/^\n+|\n+$/g, "");
		var f, j = new SdpSerializer(room.sdp);
		if (1 == b) {
			for (var l = [], m = e.split("\r\n"), n = 0; n < m.length; n++) {
				var o = m[n];
				l.push(o)
			}
			if ("video" == a) {
				var n = 0;
				null != j._inner.video.ssrc && j._inner.video.ssrc.length > 0 && (n = j._inner.video.ssrc.length), j.video.track(n).set(l)
			} else if ("audio" == a) {
				var n = 0;
				null != j._inner.audio.ssrc && j._inner.audio.ssrc.length > 0 && (n = j._inner.audio.ssrc.length), log.info("add ssrc and user relation, use sdp:" + l[0]);
				var p = l[0].split(" "),
					q = p[0].split(":"),
					r = q[1],
					s = room.getUserByNodeId(c.owner_id);
				s && (room.audioSsrc2user[r] = s), j.audio.track(n).set(l)
			} else if ("screen" == a) {
				var n = 0;
				null != j._inner.video.ssrc && j._inner.video.ssrc.length > 0 && (n = j._inner.video.ssrc.length), j.video.track(n).set(l)
			}
			var t = j.deserialize();
			f = t, t.indexOf("msid-semantic: WMS " + d) > 0 || (f = t.replace("WMS", "WMS " + d)), room.sdp = f
		} else if (0 == b) {
			if ("audio" == a) {
				log.info("remove ssrc and user relation");
				for (key in room.audioSsrc2user) {
					var s = room.audioSsrc2user[key];
					if (s && s.nodeId == c.owner_id) {
						delete room.audioSsrc2userNodeId[key];
						break
					}
				}
			}
			for (var f = room.sdp, m = e.split("\r\n"), n = 0; n < m.length; n++) {
				var o = m[n] + "\r\n";
				f = f.replace(o, "")
			}
			f.indexOf(d) > 0 && (f = f.replace(d, "")), room.sdp = f
		}
		var u = {};
		u.sdp = f, u.type = "answer", u.sdp = h(u.sdp);
		var v = new RTCSessionDescription(u);
		room.traceablePeerConnection.getToMCUPeerConnection().createOffer(function(a) {
			a.sdp = updateSDPIceUfrag(a.sdp, room.iceUfrag), a.sdp = updateSDPIcePwd(a.sdp, room.icePwd), a.sdp = g(a.sdp), log.debug("updateSdp(), local sessionDescription:" + a.sdp), room.traceablePeerConnection.getToMCUPeerConnection().setLocalDescription(a, function() {
				log.debug("updateSdp(), remote sessionDescription:" + u.sdp), room.traceablePeerConnection.getToMCUPeerConnection().setRemoteDescription(v, function() {
					room.masterServer.subRoomResourceMsg(b, c)
				}, function(a) {
					log.error(a)
				})
			}, k)
		}, i, this.constraints)
	}
	function e(a, b, c) {
		room.traceablePeerConnection.getToMCUPeerConnection().removeStream(c);
		room.traceablePeerConnection.getToMCUPeerConnection().createOffer(function(d) {
			d.sdp = updateSDPIceUfrag(d.sdp, room.iceUfrag), d.sdp = updateSDPIcePwd(d.sdp, room.icePwd), d.sdp = g(d.sdp), log.debug("reduceSdp(), local sessionDescription:" + d.sdp), room.traceablePeerConnection.getToMCUPeerConnection().setLocalDescription(d, j, k);
			var e = {};
			e.sdp = room.sdp, e.type = "answer", e.sdp = h(e.sdp), log.debug("reduceSdp(), remote sessionDescription:" + e.sdp);
			var f = new RTCSessionDescription(e);
			room.masterServer.unpubRoomResourceMsg(a, c.id, b), setTimeout(function() {
				room.traceablePeerConnection.getToMCUPeerConnection().setRemoteDescription(f, function() {}, function(a) {
					log.error(a)
				})
			}, 200)
		}, i, this.constraints)
	}
	function f(a, b) {
		var c = a,
			d = c.split("\r\n");
		if (d.length > 9) {
			var e = "",
				f = d[4];
			if (f.indexOf(b) > 0) for (var g = 0; g < 9; g++)"" == e ? e = d[g] : e += "\r\n" + d[g];
			else for (var g = 9; g < 18; g++)"" == e ? e = d[g] : e += "\r\n" + d[g];
			return e
		}
		return c
	}
	function g(a) {
		if (null == a || "" == a) return !1;
		var b = a;
		return b = b.replace(/a=sendonly/g, "a=recvonly"), b = b.replace(/a=inactive/g, "a=recvonly"), navigator.mozGetUserMedia && (b = b.replace(/a=recvonly/g, "a=sendrecv")), b
	}
	function h(a) {
		if (null == a || "" == a) return !1;
		var b = a;
		return navigator.mozGetUserMedia && (b = b.replace(/a=sendrecv/g, "a=sendonly")), videoCoding == VideoCodingType.VP8 || (videoCoding == VideoCodingType.VP9 ? b = b.replace("m=video 9 RTP/SAVPF 100 101 107", "m=video 9 RTP/SAVPF 101 100 107") : videoCoding == VideoCodingType.H264 && (b = b.replace("m=video 9 RTP/SAVPF 100 101 107", "m=video 9 RTP/SAVPF 107 100 101"))), b
	}
	function i() {}
	function j() {}
	function k() {}
	var l = function() {
			iceServers && iceServers.length > 0 ? this.iceConfig = {
				iceServers: [{
					url: stunUrl
				}, {
					url: trunUrl,
					credential: iceCredential,
					username: iceusername
				}]
			} : this.iceConfig = {
				iceServers: []
			}, this.pcConstraints = {
				optional: [{
					googImprovedWifiBwe: !0
				}]
			}, this.constraints = {
				offerToReceiveAudio: !0,
				offerToReceiveVideo: !0,
				voiceActivityDetection: !1
			}
		};
	l.prototype.getToMCUPeerConnection = function() {
		return room.reconnectionCount > 0 ? (null == room.toMCUReconnectionPC && (room.toMCUReconnectionPC = this.createMCUPeerConnection()), room.toMCUReconnectionPC) : (null == room.selfUser.toMCUPC && (room.selfUser.toMCUPC = this.createMCUPeerConnection()), room.selfUser.toMCUPC)
	}, l.prototype.createMCUPeerConnection = function() {
		var a = new RTCPeerConnection(this.iceConfig, this.pcConstraints);
		return this.handleMCUPeerConnection(a), a
	}, l.prototype.handleMCUPeerConnection = function(a) {
		var b = when.defer();
		return a.msgQueue = [], a.forLog = !1, a.onicecandidate = function(a) {}, a.onopen = function() {}, a.onaddstream = function(a) {
			if ("default" !== a.stream.id) {
				if (a.stream.getVideoTracks().length > 0) {
					var b = room.selfUser.subVideoStream2ResourceInfo[a.stream.id],
						c = room.selfUser.subScreenStream2ResourceInfo[a.stream.id];
					if (null != b) {
						log.debug("onaddstream(),MCU stream type: video");
						var d = room.selfUser.getUserByVideoStreamLabel(a.stream.id),
							e = d.getVideo(b.resource_id),
							f = room.traceablePeerConnection.isContainsReconnectionSub(e.id, room.selfUser.reconnectionSubVideoIds);
						if (f) {
							var g = e.element;
							attachMediaStream(g, a.stream), g.play();
							var h = room.selfUser.reconnectionSubVideoIds.indexOf(e.id);
							h > -1 && room.selfUser.reconnectionSubVideoIds.splice(h, 1)
						} else d.eventEmitter.emit(UserCallback.subscrible_camera_result, a.stream, d.id, d.name, b.resource_id)
					}
					if (null != c) {
						log.debug("onaddstream(), MCU  stream type: screen");
						var d = room.selfUser.getUserByScreenStreamLabel(a.stream.id),
							i = d.getScreen(c.resource_id),
							f = room.traceablePeerConnection.isContainsReconnectionSub(i.id, room.selfUser.reconnectionSubScreenIds);
						if (f) {
							var j = i.element;
							attachMediaStream(j, a.stream), j.play();
							var k = room.selfUser.reconnectionSubScreenIds.indexOf(i.id);
							k > -1 && room.selfUser.reconnectionSubScreenIds.splice(k, 1)
						} else d.eventEmitter.emit(UserCallback.subscrible_screen_result, a.stream, d.id, d.name, c.resource_id)
					}
				} else if (a.stream.getAudioTracks().length > 0) {
					log.debug("onaddstream(),MCU stream type: audio");
					var b = room.selfUser.subAudioStream2ResourceInfo[a.stream.id],
						d = room.selfUser.getUserByAudioStreamLabel(a.stream.id),
						l = d.getAudio(b.resource_id);
					l.stream = a.stream;
					var f = room.traceablePeerConnection.isContainsReconnectionSub(l.id, room.selfUser.reconnectionSubAudioIds);
					if (f) {
						var m = l.element;
						attachMediaStream(m, a.stream), m.play();
						var n = room.selfUser.reconnectionSubAudioIds.indexOf(l.id);
						n > -1 && room.selfUser.reconnectionSubAudioIds.splice(n, 1)
					} else d.eventEmitter.emit(UserCallback.subscrible_microphone_result, a.stream, d.id, d.name)
				}
			} else log.info("recvonly remote stream ignored:" + a.stream + " - " + a.stream.id)
		}, a.onremovestream = function(a) {
			log.debug("onremovestream(),MCU stream lable:" + a.stream.id);
			var b = room.selfUser.subVideoStream2ResourceInfo[a.stream.id],
				c = room.selfUser.getUserByVideoStreamLabel(a.stream.id);
			null != c && (delete room.selfUser.subVideoStream2ResourceInfo[a.stream.id], c.eventEmitter.emit(UserCallback.unsubscrible_camera_result, c.id, c.name, b.resource_id));
			var d = room.selfUser.subScreenStream2ResourceInfo[a.stream.id],
				e = room.selfUser.getUserByScreenStreamLabel(a.stream.id);
			null != e && (delete room.selfUser.subScreenStream2ResourceInfo[a.stream.id], e.eventEmitter.emit(UserCallback.unsubscrible_screen_result, e.id, e.name, d.resource_id));
			var f = room.selfUser.subAudioStream2ResourceInfo[a.stream.id],
				g = room.selfUser.getUserByAudioStreamLabel(a.stream.id);
			if (null != g) {
				var h = g.getAudio(f.resource_id);
				h.stream = null, delete room.selfUser.subAudioStream2ResourceInfo[a.stream.id], g.eventEmitter.emit(UserCallback.unsubscrible_microphone_result, g.id, g.name)
			}
		}, a.ondatachannel = function(a) {}, a.oniceconnectionstatechange = function(c) {
			var d = c.target.iceConnectionState;
			switch (log.info("oniceconnectionstatechange(),MCU iceConnectionState :" + d), d) {
			case "disconnected":
				break;
			case "failed":
				var e = "Create MCU PeerConnection  failed. ";
				log.error(e), b.reject(e);
				break;
			case "completed":
				room.audioLevel = new AudioLevel(a, 500), room.connectionInfoCollector = new ConnectionInfoCollector(a, 1e3), room.eventEmitter.emit(RoomCallback.mcu_peerconnection_completed, MCUPeerConnectionStatus.completed);
				break;
			case "connected":
				break;
			case "closed":
			}
		}, a.onsignalingstatechange = function(b) {
			log.debug("onsignalingstatechange(), MCU signalingState :" + b.target.signalingState), "stable" == b.target.signalingState && 0 == a.forLog && (a.forLog = !0, a.intervalSet(a))
		}, a.intervalSet = function(a) {
			window.setInterval(function() {
				a.processSignalingMessage(a)
			}, 400)
		}, a.processSignalingMessage = function(a) {
			if ("stable" == a.signalingState && a.msgQueue.length > 0) {
				var b = a.msgQueue.shift();
				log.debug("MCU 操作对列:" + b.operationType), "add" == b.operationType ? c(b.para1, b.para2, b.para3, b.para4) : "update" == b.operationType ? d(b.para1, b.para2, b.para3) : "reduce" == b.operationType && e(b.para1, b.para2, b.para3)
			}
		}, b.promise
	}, l.prototype.close = function(a) {
		a && "closed" != a.signalingState && a.close()
	}, l.prototype.getInviteRoomReq1ByFirefox = function() {
		var a = when.defer();
		return this.getToMCUPeerConnection().createOffer(function(b) {
			var c = b.sdp,
				d = preferLineSdp(c, "a=", "ice-ufrag");
			if (null != d && d.length > 0) for (var e = 0; e < d.length; e++) {
				var f = d[e];
				log.debug("==========local ice-ufrag=======" + f);
				var g = f.split(":");
				room.iceUfragLocal = g[1];
				break
			}
			var d = preferLineSdp(c, "a=", "ice-pwd");
			if (null != d && d.length > 0) for (var e = 0; e < d.length; e++) {
				var f = d[e];
				log.debug("=================local ice-pw=============" + f);
				var g = f.split(":");
				room.icePwdLocal = g[1];
				break
			}
			a.resolve()
		}, function(a) {}, this.constraints), a.promise
	}, l.prototype.doSetLocalDescription = function() {
		var a = when.defer(),
			b = this;
		return b.getToMCUPeerConnection().createOffer(function(c) {
			c.sdp = updateSDPIceUfrag(c.sdp, room.iceUfrag), c.sdp = updateSDPIcePwd(c.sdp, room.icePwd), c.sdp = g(c.sdp), log.debug("doSetLocalDescription(), local sessionDescription:" + c.sdp), b.getToMCUPeerConnection().setLocalDescription(c, function() {
				log.info("doSetLocalDescription(), set local sessionDescription success"), a.resolve()
			}, function(a) {
				log.error("doSetLocalDescription(), set local sessionDescription error: " + a.toString())
			})
		}, function(a) {
			log.error("doSetLocalDescription(), createOffer error:" + a.toString())
		}, this.constraints), a.promise
	}, l.prototype.doSetRemoteDescription = function() {
		sdp = updateSDPFingerPrint(remoteSDPInit, room.fingerPrint), sdp = updateSDPIceUfrag(sdp, room.iceUfrag), sdp = updateSDPIcePwd(sdp, room.icePwd), sdp = updateSDPSetup(sdp, room.setup), room.sdp = sdp;
		var a = {};
		a.sdp = room.sdp, a.type = "answer", a.sdp = h(a.sdp), log.debug("doSetRemoteDescription ,remote  sessionDescription:" + a.sdp);
		var b = new RTCSessionDescription(a);
		room.sdp = a.sdp;
		this.getToMCUPeerConnection().setRemoteDescription(b, function() {
			if (log.info("doSetRemoteDescription(), set remote sessionDescription success"), setRemoteDescriptionSuccess = !0, null != addIcecandidateList && addIcecandidateList.length > 0) {
				for (var a = 0; a < addIcecandidateList.length; a++) {
					var b = addIcecandidateList[a];
					room.masterServer.setAddIcecandidate(b)
				}
				addIcecandidateList = []
			}
		}, function(a) {
			log.error("doSetRemoteDescription(), setRemoteDescription error:" + a)
		})
	}, l.prototype.doAddIceCandidate = function(a) {
		var b = "";
		a.candidate.indexOf("=") > -1 && (b = a.candidate.split("=")[1]);
		var c = "audio",
			d = "video";
		navigator.mozGetUserMedia && (c = "sdparta_0", d = "sdparta_1");
		var e = new RTCIceCandidate({
			sdpMLineIndex: a.sdp_mline_index,
			sdpMid: c,
			candidate: b
		});
		this.getToMCUPeerConnection().addIceCandidate(e, m, n);
		var f = new RTCIceCandidate({
			sdpMLineIndex: 1,
			sdpMid: d,
			candidate: b
		});
		this.getToMCUPeerConnection().addIceCandidate(f, m, n)
	}, l.prototype.addSdp = function(a, c, d, e) {
		this.getToMCUPeerConnection().msgQueue.unshift(b("add", a, c, d, e))
	}, l.prototype.updateSdp = function(a, c, d) {
		this.getToMCUPeerConnection().msgQueue.unshift(b("update", a, c, d))
	}, l.prototype.reduceSdp = function(a, c, d) {
		this.getToMCUPeerConnection().msgQueue.unshift(b("reduce", a, c, d))
	}, l.prototype.isContainsReconnectionSub = function(a, b) {
		var c = !1;
		if (null != b && b.length > 0) for (var d = 0; d < b.length; d++) {
			var e = b[d];
			if (a == e) {
				c = !0;
				break
			}
		}
		return c
	};
	var m = function() {},
		n = function(a) {
			log.error("onAddIceCandidateError(),Failed to add remote candidate: " + a.toString())
		};
	return l
}), ModuleBase.define("TraceableP2PPeerConnection", ["Error"], function(a) {
	function b() {}
	function c() {}
	function d(a, b) {
		var c = a,
			d = c.split("\r\n");
		if (d.length > 9) {
			var e = "",
				f = d[4];
			if (f.indexOf(b) > 0) for (var g = 0; g < 9; g++)"" == e ? e = d[g] : e += "\r\n" + d[g];
			else for (var g = 9; g < 18; g++)"" == e ? e = d[g] : e += "\r\n" + d[g];
			return e
		}
		return c
	}
	function e(a, b, c, d, e) {
		var f = {};
		return f.operationType = a, f.para1 = b, f.para2 = c, f.para3 = d, f.para4 = e, f
	}
	function f(a) {
		if ("default" != a.id) {
			var b = room.selfUser.subVideoStream2ResourceInfo[a.id],
				c = room.selfUser.getUserByVideoStreamLabel(a.id);
			null != c && (delete room.selfUser.subVideoStream2ResourceInfo[a.id], c.eventEmitter.emit(UserCallback.unsubscrible_camera_result, c.id, c.name, b.resource_id));
			var d = room.selfUser.subScreenStream2ResourceInfo[a.id],
				e = room.selfUser.getUserByScreenStreamLabel(a.id);
			null != e && (delete room.selfUser.subScreenStream2ResourceInfo[a.id], e.eventEmitter.emit(UserCallback.unsubscrible_screen_result, e.id, e.name, d.resource_id));
			var f = room.selfUser.subAudioStream2ResourceInfo[a.id],
				g = room.selfUser.getUserByAudioStreamLabel(a.id);
			if (null != g) {
				var h = g.getAudio(f.resource_id);
				h.stream = null, delete room.selfUser.subAudioStream2ResourceInfo[a.id], g.eventEmitter.emit(UserCallback.unsubscrible_microphone_result, g.id, g.name)
			}
		}
	}
	var g = function() {
			iceServers && iceServers.length > 0 ? this.iceConfig = {
				iceServers: [{
					url: stunUrl
				}, {
					url: trunUrl,
					credential: iceCredential,
					username: iceusername
				}]
			} : this.iceConfig = {
				iceServers: []
			}, this.pcConstraints = {
				optional: [{
					googImprovedWifiBwe: !0
				}]
			}, this.constraints = {
				offerToReceiveAudio: !0,
				offerToReceiveVideo: !0,
				voiceActivityDetection: !1
			}
		};
	g.prototype.getToP2PPeerConnection = function(a) {
		var b = room.selfUser.toP2PPCs[a];
		return null == b && (b = this.createP2PPeerConnection(a), room.selfUser.toP2PPCs[a] = b, room.selfUser.nodeId < a && this.sendOfferP2P(b, a)), b
	}, g.prototype.createP2PPeerConnection = function(a) {
		var b = new RTCPeerConnection(this.iceConfig, this.pcConstraints);
		return this.handleP2PPeerConnection(a, b), b
	}, g.prototype.sendOfferP2P = function(a, d, e) {
		var f = this.constraints;
		1 == e ? f.iceRestart = !0 : f.iceRestart = !1;
		var g = this;
		a.createOffer(function(e) {
			log.debug("sendOfferP2P(): P2P  local sessionDescription:" + e.sdp), a.setLocalDescription(e, b, c), room.masterServer.sendOfferP2P(e.sdp, d), g.constraints.iceRestart = !1
		}, function(a) {}, f)
	}, g.prototype.setRemoteP2P = function(a) {
		var d = {};
		d.sdp = a.sdp, d.type = "offer";
		var e = new RTCSessionDescription(d);
		room.sdp = d.sdp, log.debug("setRemoteP2P(): P2P  session Description:" + d.sdp);
		var f = this.getToP2PPeerConnection(a.node_id);
		f.setRemoteDescription(e, function() {
			log.info("setRemoteP2P(): P2P  Set remote session description success."), f.createAnswer(function(d) {
				log.debug("setRemoteP2P(): createAnswer  P2P  local sessionDescription:" + d.sdp), f.setLocalDescription(d, b, c), room.masterServer.setRemoteP2P(d.sdp, a.node_id)
			}, function(a) {
				log.error("setRemoteP2P(): createAnswer  P2P  local sessionDescription false.event:" + a)
			}, this.constraints)
		}, function(a) {
			log.error("setRemoteP2P(): P2P  Set remote session description false.event:" + a)
		})
	}, g.prototype.setAnswerP2P = function(a) {
		var b = {};
		b.sdp = a.sdp, b.type = "answer";
		var c = new RTCSessionDescription(b);
		log.debug("setAnswerP2P():  P2P  session Description:" + b.sdp);
		var d = this.getToP2PPeerConnection(a.node_id);
		d.setRemoteDescription(c, function() {
			log.debug("setAnswerP2P(): P2P  Set remote session description success.")
		}, function(a) {
			log.error("setAnswerP2P(): P2P  Set remote session description false.event:" + a)
		})
	}, g.prototype.addIceCandidateP2P = function(a) {
		var b = this.getToP2PPeerConnection(a.node_id);
		log.debug("addIceCandidateP2P(), P2P candidate:" + a.candidate);
		var c = new RTCIceCandidate({
			sdpMLineIndex: a.sdp_mline_index,
			sdpMid: a.sdp_mid,
			candidate: a.candidate
		});
		b.addIceCandidate(c, i, j)
	}, g.prototype.addStreamP2P = function(a) {
		var b = this.getToP2PPeerConnection(a.sub_node_id),
			c = a.info.resource_id;
		if (1 == a.info.stream.type) {
			var d = room.splitPDUDeviceId(c),
				e = room.selfUser.getVideo(d),
				f = e.stream;
			null != f && (b.addStream(f), room.selfUser.subMyVideosP2P.push(a.sub_node_id))
		} else if (2 == a.info.stream.type) {
			var d = room.splitPDUDeviceId(c),
				g = room.selfUser.getAudio(d),
				h = g.stream;
			null != h && (b.addStream(h), room.selfUser.subMyAudiosP2P.push(a.sub_node_id))
		} else if (3 == a.info.stream.type) {
			var d = room.splitPDUDeviceId(c),
				i = room.selfUser.getScreen(d),
				j = i.stream;
			null != j && (b.addStream(j), room.selfUser.subMyScreensP2P.push(a.sub_node_id))
		}
	}, g.prototype.sendSubSdpOfferP2P = function(a, b) {
		var c;
		"offerSub" == a ? c = this.getToP2PPeerConnection(b.info.owner_id) : "answerSub" == a && (c = this.getToP2PPeerConnection(b.sub_node_id)), c.msgQueue.unshift(e("sub", c, a, b, null))
	}, g.prototype.sendSubSdpAnswerP2P = function(a, e, f, g, i, j) {
		var k = i.stream.sdp,
			l = {};
		l.sdp = k, l.type = "offer";
		var m = new RTCSessionDescription(l),
			n = "sendSubSdpAnswerP2P(), P2P remote sessionDescription:";
		log.debug(n + l.sdp), log.debug("sendSubSdpAnswerP2P(): P2P  signalingState: " + e.signalingState), e.setRemoteDescription(m, function() {
			log.debug("sendSubSdpAnswerP2P(): P2P  Set remote session description success."), room.selfUser.sdpP2PMap[i.owner_id] = k;
			var g, l = new SdpSerializer(k);
			"video" == f ? (g = l._inner.video.ssrcStr, g = d(g, i.stream.stream_name), log.debug("sendSubSdpAnswerP2P(), new add video sdp:" + g), room.selfUser.videoSdpSsrcMapP2PMap[i.owner_id] = g) : "audio" == f ? (g = l._inner.audio.ssrcStr, log.debug("sendSubSdpAnswerP2P(), new add audio sdp:" + g), room.selfUser.audioSdpSsrcP2PMap[i.owner_id] = g) : "desktop" == f && (g = l._inner.video.ssrcStr, g = d(g, i.stream.stream_name), log.debug("sendSubSdpAnswerP2P(), new add screen sdp:" + g), room.selfUser.screenSdpSsrcP2PMap[i.owner_id] = g), e.createAnswer(function(d) {
				log.debug("sendSubSdpAnswerP2P(), P2P local sessionDescription:" + d.sdp), e.setLocalDescription(d, b, c), room.masterServer.sendSubSdpAnswerP2P(a, i, d.sdp, j)
			}, h, this.constraints)
		}, function(a) {
			log.error(a)
		})
	}, g.prototype.getSubSdpAnswerP2P = function(a) {
		var b = {};
		b.sdp = a.info.stream.sdp, b.type = "answer";
		var c = new RTCSessionDescription(b);
		log.debug("getSubSdpAnswerP2P(): P2P  session Description:" + b.sdp), room.selfUser.sdpP2PMap[a.info.owner_id] = a.info.stream.sdp;
		var d = this.getToP2PPeerConnection(a.sub_node_id);
		d.setRemoteDescription(c, function() {
			log.info("getSubSdpAnswerP2P(): P2P  Set remote session description success.")
		}, function(a) {
			log.error("getSubSdpAnswerP2P(): P2P  Set remote session description false.event:" + a)
		})
	}, g.prototype.getSubSdpAnswerP2PByRep = function(a) {
		var b = {};
		b.sdp = a.info.stream.sdp, b.type = "answer";
		var c = new RTCSessionDescription(b);
		log.debug("getSubSdpAnswerP2PByRep(): P2P  session Description:" + b.sdp), room.selfUser.sdpP2PMap[a.info.owner_id] = a.info.stream.sdp;
		var d = this.getToP2PPeerConnection(a.info.owner_id);
		d.setRemoteDescription(c, function() {
			log.info("getSubSdpAnswerP2PByRep(): P2P  Set remote session description success.")
		}, function(a) {
			log.error("getSubSdpAnswerP2PByRep(): P2P  Set remote session description false.event:" + a)
		})
	}, g.prototype.removeStreamP2P = function(a, b, c) {
		var d = this.getToP2PPeerConnection(b);
		"video" == a ? null != d && "closed" != d.signalingState && null != c && (d.removeStream(c), log.debug("removeStreamP2P(): P2P  remove video  stream")) : "audio" == a ? null != d && "closed" != d.signalingState && null != c && (d.removeStream(c), log.debug("removeStreamP2P(): P2P  remove audio  stream")) : "screen" == a && null != d && "closed" != d.signalingState && null != c && (d.removeStream(c), log.debug("removeStreamP2P(): P2P  remove screen  stream"))
	}, g.prototype.sendUnSubSdpOfferP2P = function(a, b, c, d) {
		var f = this.getToP2PPeerConnection(c);
		null != f && "closed" != f.signalingState && f.msgQueue.unshift(e("unsub", f, a, b, d))
	}, g.prototype.sendUnSubSdpAnswerP2P = function(a, b, d, e) {
		var f, g = this.getToP2PPeerConnection(d),
			i = {};
		if ("unsubAnswer" == a) {
			var j, k = e.stream.stream_name;
			"video" == b ? j = room.selfUser.videoSdpSsrcMapP2PMap[e.owner_id] : "audio" == b ? j = room.selfUser.audioSdpSsrcP2PMap[e.owner_id] : "screen" == b && (j = room.selfUser.screenSdpSsrcP2PMap[e.owner_id]);
			for (var l = room.selfUser.sdpP2PMap[e.owner_id], m = j.split("\r\n"), n = 0; n < m.length; n++) {
				var o = m[n] + "\r\n";
				l = l.replace(o, "")
			}
			l.indexOf(k) > 0 && (l = l.replace(k, "")), room.selfUser.sdpP2PMap[e.owner_id] = l, i.sdp = l, i.type = "offer", f = new RTCSessionDescription(i)
		} else "unpubAnswer" == a && (i.sdp = g.remoteDescription.sdp, i.type = "offer", f = new RTCSessionDescription(i));
		log.debug("sendUnSubSdpAnswerP2P(): P2P  Remote sessionDescription:" + f.sdp), g.setRemoteDescription(f, function() {
			log.info("sendUnSubSdpAnswerP2P(): P2P  Set remote session description success.")
		}, function(a) {
			log.error(a)
		}), g.createAnswer(function(a) {
			room.sdp = a.sdp, log.debug("sendUnSubSdpAnswerP2P(): P2P  local sessionDescription:" + room.sdp), g.setLocalDescription(a, function() {
				log.info("sendUnSubSdpAnswerP2P(): P2P  Set local session description success.")
			}, c)
		}, h, this.constraints)
	}, g.prototype.handleP2PPeerConnection = function(a, b) {
		var c = when.defer();
		return b.msgQueue = [], b.forLog = !1, b.nodeId = a, b.onicecandidate = function(b) {
			b.candidate ? (log.debug("onicecandidate(),P2P event.candidate.candidate :" + b.candidate.candidate), room.masterServer.sendCandidateMsgP2P(b.candidate, a)) : log.debug("P2P  End of candidates.")
		}, b.onopen = function() {}, b.onaddstream = function(a) {
			if (log.debug("onaddstream(), P2P  stream id:" + a.stream.id), "default" != a.stream.id) if (a.stream.getVideoTracks().length > 0) {
				var b = room.selfUser.subVideoStream2ResourceInfo[a.stream.id],
					c = room.selfUser.subScreenStream2ResourceInfo[a.stream.id];
				if (null != b) {
					log.debug("onaddstream(), P2P  stream type: video");
					var d = room.selfUser.getUserByVideoStreamLabel(a.stream.id);
					d.getVideo(b.resource_id);
					d.eventEmitter.emit(UserCallback.subscrible_camera_result, a.stream, d.id, d.name, b.resource_id)
				}
				if (null != c) {
					log.debug("onaddstream(), P2P  stream type: screen");
					var d = room.selfUser.getUserByScreenStreamLabel(a.stream.id);
					d.getScreen(c.resource_id);
					d.eventEmitter.emit(UserCallback.subscrible_screen_result, a.stream, d.id, d.name, c.resource_id)
				}
			} else if (a.stream.getAudioTracks().length > 0) {
				log.debug("onaddstream(), P2P  stream type: audio");
				var b = room.selfUser.subAudioStream2ResourceInfo[a.stream.id],
					d = room.selfUser.getUserByAudioStreamLabel(a.stream.id),
					e = d.getAudio(b.resource_id);
				e.stream = a.stream, d.eventEmitter.emit(UserCallback.subscrible_microphone_result, a.stream, d.id, d.name)
			}
		}, b.onremovestream = function(a) {
			f(a.stream)
		}, b.ondatachannel = function(a) {}, b.oniceconnectionstatechange = function(a) {
			var c = a.target.iceConnectionState;
			switch (log.info("oniceconnectionstatechange(),P2P iceConnectionState :" + c), c) {
			case "disconnected":
				room.isMcu() || room.selfUser.nodeId < b.nodeId && (log.debug("=======PeerConnection reconnection，send off.  self user nodeId:" + room.selfUser.nodeId + " ----> download user nodeId:" + b.nodeId), room.traceableP2PPeerConnection.sendOfferP2P(b, b.nodeId, !0));
				break;
			case "failed":
				break;
			case "completed":
				break;
			case "connected":
				break;
			case "closed":
			}
		}, b.onsignalingstatechange = function(a) {
			log.debug("onsignalingstatechange(), P2P signalingState :" + a.target.signalingState), "stable" == a.target.signalingState && 0 == b.forLog && (b.forLog = !0, b.intervalSet(b))
		}, b.intervalSet = function(a) {
			window.setInterval(function() {
				a.processSignalingMessage(a)
			}, 400)
		}, b.processSignalingMessage = function(a) {
			if ("stable" == a.signalingState && a.msgQueue.length > 0) {
				var b = a.msgQueue.shift();
				log.debug("P2P 操作对列:" + b.operationType), "sub" == b.operationType ? room.traceableP2PPeerConnection.sendSubSdpOfferP2PHandle(b.para1, b.para2, b.para3, b.para4) : "unsub" == b.operationType && room.traceableP2PPeerConnection.sendUnSubSdpOfferP2PHandle(b.para1, b.para2, b.para3, b.para4)
			}
		}, c.promise
	}, g.prototype.sendSubSdpOfferP2PHandle = function(a, d, e) {
		a.createOffer(function(f) {
			log.debug("sendSubSdpOfferP2P():  P2P  local sessionDescription:" + f.sdp), room.sdp = f.sdp, a.setLocalDescription(f, b, c), room.masterServer.sendSubSdpOfferP2P(e, f.sdp, d)
		}, h, this.constraints)
	}, g.prototype.sendUnSubSdpOfferP2PHandle = function(a, b, d, e) {
		a.createOffer(function(g) {
			log.debug("sendUnSubSdpOfferP2PHandle(): P2P  local sessionDescription:" + g.sdp), a.setLocalDescription(g, function() {
				log.info("sendUnSubSdpOfferP2PHandle(): P2P  Set local session description success.");
				var c, g = {};
				if ("unpubOffer" == b) {
					log.debug("sendUnSubSdpOfferP2PHandle(): offerType:unpubOffer"), g.sdp = a.remoteDescription.sdp, g.type = "answer";
					var c = new RTCSessionDescription(g)
				} else if ("unsubOffer" == b) {
					log.debug("sendUnSubSdpOfferP2PHandle(): offerType:unsubOffer");
					var h, i = a.remoteDescription.sdp,
						j = new SdpSerializer(i);
					"video" == d ? h = j._inner.video.ssrcStr : "audio" == d ? h = j._inner.audio.ssrcStr : "screen" == d && (h = j._inner.video.ssrcStr);
					for (var k = h.split("\r\n"), l = 0; l < k.length; l++) {
						var m = k[l] + "\r\n";
						i = i.replace(m, "")
					}
					var n = e.stream.stream_name;
					i.indexOf(n) > 0 && (i = i.replace(n, "")), g.sdp = i, g.type = "answer", c = new RTCSessionDescription(g)
				}
				log.debug("sendUnSubSdpOfferP2PHandle(): P2P  remote  sessionDescription:" + g.sdp), a.setRemoteDescription(c, function() {
					if (log.info("sendUnSubSdpOfferP2PHandle(): P2P  Set remote session description success."), "unsubOffer" == b) {
						var c = a.getRemoteStreams();
						if (c.length > 0) for (l = 0; l < c.length; l++) {
							var d = c[l];
							"default" != d.id && (d.onremovetrack = function(a) {
								f(d)
							})
						}
					}
				}, function(a) {
					log.error("sendUnSubSdpOfferP2PHandle(): P2P  Set remote session description false.event:" + a)
				})
			}, c)
		}, h, this.constraints)
	};
	var h = function() {},
		i = function() {},
		j = function(a) {
			log.error("onAddIceCandidateError(),Failed to add remote  P2P  candidate: " + a.toString())
		};
	return g
}), ModuleBase.define("SignalFactory", ["TraceableWebsocket"], function(a) {
	var b = function() {};
	return b.prototype.getDataChannel = function(b) {
		var c;
		switch (b) {
		case SignalType.websocket:
			c = new a
		}
		return c
	}, b
}), ModuleBase.define("MessageManager", ["CmdProtobufCoded", "User", "Error"], function(a, b, c) {
	function d(a, b) {
		var c = room.getUserByNodeId(a),
			d = new Object,
			e = new Date;
		return e.setMinutes(e.getMinutes() + e.getTimezoneOffset()), d.timestamp = e.getTime(), d.fromId = c.id, d.fromName = c.name, d.message = b, d
	}
	var e = function() {};
	return e.prototype.OnWebSocketMessage = function(e) {
		var f;
		null == room.cmdProtobufCoded ? (f = new a, room.cmdProtobufCoded = f) : f = room.cmdProtobufCoded;
		var g = f.getRoomPduTypeEnum(),
			h = f.getMediaTypeEnum(),
			i = f.getResourceStatusEnum(),
			j = f.getResourceOptEnum(),
			k = f.decodePacket(e),
			l = k.type;
		switch (l) {
		case g.OPEN_REP:
			var m = f.decodeBody(e);
			if (0 == m.result) log.info("======openRep.result：0=========="), room.reconnectionState ? (log.debug("======OPEN_REP：重连成功======="), room.reconnectionState = !1, room.masterServer.pingIntervalHandle(), room.masterServer.pingTimeoutHandle()) : (log.debug("======OPEN_REP：连接成功======="), room.pingInterval = m.ping_interval, room.pingTimeout = m.ping_timeout, room.signalTocken = m.signal_tocken, room.masterServer.pingIntervalHandle(), room.masterServer.pingTimeoutHandle(), room.masterServer.inviteRoomReqSend()), room.reconnectionOpenRep402 = !1, room.eventEmitter.emit(RoomCallback.connection_status, ConnectionStatus.connected);
			else if (402 == m.result) log.info("======openRep.result：402=========="), room.reconnectionState = !1, room.reconnectionOpenRep402 = !0, setRemoteDescriptionSuccess = !1, addIcecandidateList = [], room.eventEmitter.emit(RoomCallback.connection_status, ConnectionStatus.connectFailed);
			else {
				log.info("OPEN_REP,openRep.result: " + m.result + ",openRep.description:" + m.description), room.reconnectionState = !1;
				var n = new c(m.result, m.description);
				room.eventEmitter.emit(EngineCallback.room_join_error, n)
			}
			break;
		case g.PONG:
			room.pingCountTime = 0;
			break;
		case g.INVITE_ROOM_REP1:
			var o = f.decodeBody(e);
			if (0 == o.result) {
				if (room.fingerPrint = o.finger_print, room.iceUfrag = o.ice_ufrag, room.icePwd = o.ice_pwd, room.setup = o.setup, room.roomTocken = o.room_tocken, room.roomInfo = o.room_info, room.masterServer.sendOffer(), 0 == room.reconnectionCount) {
					room.selfUser.nodeId = o.node_id, room.selfUser.role = 1, null != o.role && (room.selfUser.role = o.role);
					var p = room.avdEngine.cameraMap;
					for (var q in p) {
						var r = p[q];
						room.selfUser.initVideo(q, r)
					}
					null != room.avdEngine.checkMicrophoneId && room.selfUser.initAudio(room.avdEngine.checkMicrophoneId, room.avdEngine.checkMicrophoneName), room.selfUser.initScreen(), room.addUser(room.selfUser), log.info("join room  Success! your nodeId:" + room.selfUser.nodeId + "; roomId:" + room.id)
				} else {
					var p = room.avdEngine.cameraMap;
					for (var q in p) {
						var r = p[q];
						room.selfUser.initVideo(q, r)
					}
					null != room.avdEngine.checkMicrophoneId && room.selfUser.initAudio(room.avdEngine.checkMicrophoneId, room.avdEngine.checkMicrophoneName), room.selfUser.initScreen(), room.selfUser.reconnectionSubVideoIds = room.selfUser.subVideoIds.slice(0), room.selfUser.reconnectionSubAudioIds = room.selfUser.subAudioIds.slice(0), room.selfUser.reconnectionSubScreenIds = room.selfUser.subScreenIds.slice(0), room.selfUser.reconnectionUsers.push(room.selfUser), room.eventEmitter.emit(RoomCallback.connection_status, ConnectionStatus.connected), log.info("reconnection,join room  Success!"), room.traceablePeerConnection.close(room.selfUser.toMCUPC), room.selfUser.toMCUPC = room.toMCUReconnectionPC, setTimeout(function() {
						for (var a in room.selfUser.videos) {
							var b = room.selfUser.videos[a];
							if (b.status == StreamStatus.published) {
								var c = b.stream.clone();
								b.stream = c, b.publish()
							}
						}
						var d = room.selfUser.screen;
						null != d && d.status == StreamStatus.published && d.publish();
						var e = room.selfUser.audio;
						null != e && e.status == StreamStatus.published && e.openMicrophone()
					}, 2e3), setTimeout(function() {
						var a = arrayUtil.chajiObject(room.participants, room.selfUser.reconnectionUsers);
						if (null != a && a.length > 0) for (var b = 0; b < a.length; b++) {
							var c = a[b],
								d = room.getUserByNodeId(c);
							null != d && (room.removeUser(d.id), room.eventEmitter.emit(RoomCallback.user_leave_notify, 1, null, d))
						}
						room.reconnectionCount = 0, room.selfUser.reconnectionUsers = []
					}, 2e4)
				}
				room.eventEmitter.emit(EngineCallback.room_join_success, room);
				break
			}
			log.info("INVITE_ROOM_REP1,inviteRoomRep1.result: " + o.result + ",inviteRoomRep1.description:" + o.description);
			var n = new c(o.result, o.description);
			room.eventEmitter.emit(EngineCallback.room_join_error, n);
			break;
		case g.CANDIDATE_MSG1:
			var s = f.decodeBody(e);
			log.info("mcu send  CANDIDATE_MSG1:" + s.candidate), setRemoteDescriptionSuccess ? room.masterServer.setAddIcecandidate(s) : addIcecandidateList.push(s);
			break;
		case g.ROOM_RESOURCE_INFOS:
			var t = f.decodeBody(e),
				u = t.resource_infos;
			for (var q in u) {
				var v = u[q],
					w = v.stream.type;
				switch (w) {
				case h.video:
					log.info("accept video  JOIN_REP(PUB_ROOM_RESOURCE): " + v.owner_id + "------>" + room.selfUser.nodeId);
					var x = room.traceablePeerConnection.isContainsReconnectionSub(v.resource_id, room.selfUser.subVideoIds);
					if (x) {
						var y = room.getUserByNodeId(v.owner_id),
							z = y.getVideo(v.resource_id);
						z.resourceInfo = v, z.subscrible()
					} else {
						var y = room.getUserByNodeId(v.owner_id),
							z = y.getVideo(v.resource_id);
						null == z && (z = y.createVideo(v.resource_id, "")), z.resourceInfo = v, z.ownerId = y.id, room.pubVideos.push(z);
						var A = [];
						A.push(z), y.eventEmitter.emit(UserCallback.camera_status_notify, z.status, z.id, z.name, y.id), y.eventEmitter.emit(UserCallback.publish_camera_notify, A)
					}
					break;
				case h.audio:
					log.info("accept audio  JOIN_REP(PUB_ROOM_RESOURCE): " + v.owner_id + "------>" + room.selfUser.nodeId);
					var x = room.traceablePeerConnection.isContainsReconnectionSub(v.resource_id, room.selfUser.subAudioIds);
					if (x) room.masterServer.audioSubscribleHandle(v);
					else {
						var y = room.getUserByNodeId(v.owner_id),
							B = y.getAudio(v.resource_id);
						null == B && (B = y.createAudio(v.resource_id, "")), B.resourceInfo = v, room.pubAudios.push(B), room.selfUser.subAudioStream2ResourceInfo[v.stream.stream_name] = v, room.selfUser.subAudioIds.push(B.id), room.masterServer.audioSubscribleHandle(v), y.eventEmitter.emit(UserCallback.microphone_status_notify, B.status, B.id, B.name, y.id)
					}
					break;
				case h.desktop:
					log.info("accept desktop  JOIN_REP(PUB_ROOM_RESOURCE): " + v.owner_id + "------>" + room.selfUser.nodeId);
					var x = room.traceablePeerConnection.isContainsReconnectionSub(v.resource_id, room.selfUser.subScreenIds);
					if (x) {
						var y = room.getUserByNodeId(v.owner_id),
							C = y.getScreen(v.resource_id);
						C.resourceInfo = v, C.subscrible()
					} else {
						var y = room.getUserByNodeId(v.owner_id),
							C = y.getScreen(v.resource_id);
						null == C && (C = y.createScreen(v.resource_id, "")), C.resourceInfo = v, C.ownerId = y.id, room.pubScreens.push(C);
						var D = [];
						D.push(C), y.eventEmitter.emit(UserCallback.screen_status_notify, C.status, C.id, C.name, y.id), y.eventEmitter.emit(UserCallback.publish_screen_notify, D)
					}
				}
			}
			break;
		case g.USER_INFO_MSG:
			log.debug("messageManager: roomPduType.USER_INFO_MSG");
			var E = f.decodeBody(e);
			if (null == E) return;
			var F = [],
				G = E.user;
			G.forEach(function(a) {
				var c = new b(a.user_id, a.user_name, null, null);
				c.nodeId = a.node_id, c.role = a.role, c.data = a.user_data, room.reconnectionCount > 0 && room.selfUser.reconnectionUsers.push(c), a.webcams.forEach(function(a) {
					var b = c.createVideo(a.id, a.name);
					b.status = a.status, b.cameraType = a.ctype, b.level = a.level, b.description = a.description
				}), a.speakers.forEach(function(a) {
					var b = c.createAudio(a.id, a.name);
					b.status = a.status
				}), a.desktops.forEach(function(a) {
					var b = c.createScreen(a.id, a.name);
					b.status = a.status, b.level = a.level, b.description = a.description
				}), room.hasUser(c.id) || (room.addUser(c), F.push(c)), room.isMcu() || room.p2pServer.createP2PPeerConnection(c.nodeId)
			}), room.eventEmitter.emit(RoomCallback.user_join_notify, F);
			break;
		case g.ADD_WEBCAM_MSG:
			log.debug("messageManager: roomPduType.ADD_WEBCAM_MSG");
			var H = f.decodeBody(e),
				y = room.getUserByNodeId(H.node_id);
			if (y) {
				var I = H.webcam,
					z = y.createVideo(I.id, I.name);
				z.status = I.status, z.cameraType = I.ctype, z.level = I.level, z.description = I.description, y.eventEmitter.emit(UserCallback.camera_status_notify, I.status, I.id, I.name, y.id)
			}
			break;
		case g.ADD_SPEAKER_MSG:
			log.debug("messageManager: roomPduType.ADD_SPEAKER_MSG");
			var J = f.decodeBody(e),
				y = room.getUserByNodeId(J.node_id);
			if (y) {
				var K = J.speaker,
					B = y.createAudio(K.id, K.name);
				B.status = K.status, y.eventEmitter.emit(UserCallback.microphone_status_notify, K.status, K.id, K.name, y.id)
			}
			break;
		case g.ADD_DESKTOP_MSG:
			log.debug("messageManager: roomPduType.ADD_DESKTOP_MSG");
			var L = f.decodeBody(e),
				y = room.getUserByNodeId(L.node_id);
			if (y) {
				var M = L.desktop,
					C = y.createScreen(M.id, M.name);
				C.status = M.status, C.level = M.level, C.description = M.description, y.eventEmitter.emit(UserCallback.screen_status_notify, M.status, M.id, M.name, y.id)
			}
			break;
		case g.REMOVE_WEBCAM_MSG:
			var N = f.decodeBody(e),
				y = room.getUserByNodeId(N.node_id),
				O = y.getVideo(N.resource_id);
			y.eventEmitter.emit(UserCallback.camera_status_notify, StreamStatus.none, O.id, O.name, y.id), arrayUtil.objectSplice(y.videos, N.resource_id);
			break;
		case g.REMOVE_SPEAKER_MSG:
			var P = f.decodeBody(e),
				y = room.getUserByNodeId(P.node_id);
			y.eventEmitter.emit(UserCallback.microphone_status_notify, StreamStatus.none, y.audio.id, y.audio.name, y.id), y.audio.id == P.resource_id && (y.audio = null);
			break;
		case g.REMOVE_DESKTOP_MSG:
			var Q = f.decodeBody(e),
				y = room.getUserByNodeId(Q.node_id);
			y.eventEmitter.emit(UserCallback.screen_status_notify, StreamStatus.none, y.screen.id, y.screen.name, y.id), y.screen.id == Q.resource_id && (y.screen = null);
			break;
		case g.UPDATE_SPEAKER_MSG:
			var R = f.decodeBody(e),
				y = room.getUserByNodeId(R.node_id),
				B = y.getAudio(R.resource_id);
			B.status = R.speaker.status, y.eventEmitter.emit(UserCallback.microphone_status_notify, B.status, B.id, B.name, y.id);
			break;
		case g.UPDATE_WEBCAM_MSG:
			var S = f.decodeBody(e),
				y = room.getUserByNodeId(S.node_id),
				z = y.getVideo(S.resource_id);
			z.level = S.webcam.level, z.description = S.webcam.description, y.eventEmitter.emit(UserCallback.camera_data_notify, z.level, z.description, z.id, z.name, y.id);
			break;
		case g.UPDATE_DESKTOP_MSG:
			var T = f.decodeBody(e),
				y = room.getUserByNodeId(T.node_id),
				C = y.getScreen(T.resource_id);
			C.level = T.desktop.level, C.description = T.desktop.description, y.eventEmitter.emit(UserCallback.screen_data_notify, C.level, C.description, C.id, C.name, y.id);
			break;
		case g.PUB_ROOM_RESOURCE_MSG:
			var U = f.decodeBody(e),
				v = U.info;
			if (v.stream.type == h.video) {
				log.info("accept video  PUB_ROOM_RESOURCE_MSG: " + v.owner_id + "------>" + room.selfUser.nodeId);
				var x = room.traceablePeerConnection.isContainsReconnectionSub(v.resource_id, room.selfUser.reconnectionSubVideoIds);
				if (x) {
					var y = room.getUserByNodeId(v.owner_id),
						z = y.getVideo(v.resource_id);
					z.resourceInfo = v, z.subscrible()
				} else {
					var A = [],
						y = room.getUserByNodeId(v.owner_id),
						z = y.getVideo(v.resource_id);
					null == z && (z = y.createVideo(v.resource_id, "")), z.resourceInfo = v, z.status = StreamStatus.published, z.ownerId = y.id, A.push(z), room.pubVideos.push(z), y.eventEmitter.emit(UserCallback.camera_status_notify, z.status, z.id, z.name, y.id), y.eventEmitter.emit(UserCallback.publish_camera_notify, A)
				}
			} else if (v.stream.type == h.audio) {
				log.info("accept audio  PUB_ROOM_RESOURCE_MSG: " + v.owner_id + "------>" + room.selfUser.nodeId);
				var y = room.getUserByNodeId(v.owner_id),
					B = y.getAudio(v.resource_id);
				null == B && (B = y.createAudio(v.resource_id, "")), B.resourceInfo = v, B.status = StreamStatus.published, room.pubAudios.push(B), y.eventEmitter.emit(UserCallback.microphone_status_notify, B.status, B.id, B.name, y.id), room.selfUser.subAudioStream2ResourceInfo[v.stream.stream_name] = v, room.selfUser.subAudioIds.push(B.id), room.masterServer.audioSubscribleHandle(v)
			} else if (v.stream.type == h.desktop) {
				log.info("accept screen  PUB_ROOM_RESOURCE_MSG: " + v.owner_id + "------>" + room.selfUser.nodeId);
				var x = room.traceablePeerConnection.isContainsReconnectionSub(v.resource_id, room.selfUser.reconnectionSubScreenIds);
				if (x) {
					var y = room.getUserByNodeId(v.owner_id),
						C = y.getScreen(v.resource_id);
					C.resourceInfo = v, C.subscrible()
				} else {
					var D = [],
						y = room.getUserByNodeId(v.owner_id),
						C = y.getScreen(v.resource_id);
					null == C && (C = y.createScreen(v.resource_id, "")), C.resourceInfo = v, C.status = StreamStatus.published, C.ownerId = y.id, D.push(C), room.pubScreens.push(C), y.eventEmitter.emit(UserCallback.screen_status_notify, C.status, C.id, C.name, y.id), y.eventEmitter.emit(UserCallback.publish_screen_notify, D)
				}
			}
			break;
		case g.PUB_ROOM_RESOURCE_MSG_REP:
			var V = f.decodeBody(e),
				W = V.id,
				X = V.result,
				Y = V.description;
			if (0 == X) room.eventEmitter.emit(EngineCallback.pub_roomresourcemsg_rep_success, W);
			else {
				log.info("pubRoomResourceMsgRep.result: " + X + ",pubRoomResourceMsgRep.description:" + Y);
				var Z = new c(X, Y);
				room.eventEmitter.emit(EngineCallback.pub_roomresourcemsg_rep_error, Z, W)
			}
			break;
		case g.UNPUB_ROOM_RESOURCE_MSG:
			var $ = f.decodeBody(e),
				v = $.info;
			if (v.stream.type == h.video) {
				log.info("accept video  UNPUB_ROOM_RESOURCE_MSG: " + v.owner_id + "------>" + room.selfUser.nodeId);
				var y = room.getUserByNodeId(v.owner_id),
					z = y.getVideo(v.resource_id);
				z.status = i.init, y.eventEmitter.emit(UserCallback.camera_status_notify, z.status, z.id, z.name, y.id), y.eventEmitter.emit(UserCallback.unpublish_camera_notify, z), arrayUtil.objectSplice(room.pubVideos, v.resource_id)
			} else if (v.stream.type == h.audio) {
				log.info("accept audio  UNPUB_ROOM_RESOURCE_MSG: " + v.owner_id + "------>" + room.selfUser.nodeId);
				var y = room.getUserByNodeId(v.owner_id),
					B = y.getAudio(v.resource_id);
				B.status = i.init, y.eventEmitter.emit(UserCallback.microphone_status_notify, B.status, B.id, B.name, y.id), arrayUtil.baseSplice(room.selfUser.subAudioIds, this.id), room.masterServer.audioUnsubscribleHandle(v), arrayUtil.objectSplice(room.pubAudios, v.resource_id)
			} else if (v.stream.type == h.desktop) {
				log.info("accept screen  UNPUB_ROOM_RESOURCE_MSG: " + v.owner_id + "------>" + room.selfUser.nodeId);
				var y = room.getUserByNodeId(v.owner_id),
					C = y.getScreen(v.resource_id);
				C.status = i.init, y.eventEmitter.emit(UserCallback.screen_status_notify, C.status, C.id, C.name, y.id), y.eventEmitter.emit(UserCallback.unpublish_screen_notify, C), arrayUtil.objectSplice(room.pubScreens, v.resource_id)
			}
			break;
		case g.VIDEO_INDICTION:
			var _ = f.decodeBody(e),
				aa = room.splitPDUDeviceId(_.resource_id),
				z = room.selfUser.getVideo(aa);
			_.opt == j.pub ? z.publish() : _.opt == j.unpub && z.unpublish();
			break;
		case g.AUDIO_INDICTION:
			var _ = f.decodeBody(e),
				ba = room.splitPDUDeviceId(_.resource_id),
				B = room.selfUser.getAudio(ba);
			_.opt == j.pub ? B.openMicrophone() : _.opt == j.unpub && B.closeMicrophone();
			break;
		case g.PUBLIC_TEXT_MSG:
			var ca = f.decodeBody(e),
				da = d(k.src, ca.content);
			room.eventEmitter.emit(RoomCallback.public_message, da);
			break;
		case g.PRIVATE_TEXT_MSG:
			var ca = f.decodeBody(e),
				da = d(k.src, ca.content);
			room.eventEmitter.emit(RoomCallback.private_message, da);
			break;
		case g.PUBLIC_DATA:
			var ea = f.decodeBody(e),
				y = room.getUserByNodeId(k.src);
			room.eventEmitter.emit(RoomCallback.public_data, ea.content.toArrayBuffer(), y.id);
			break;
		case g.PRIVATE_DATA:
			var ea = f.decodeBody(e),
				y = room.getUserByNodeId(k.src);
			room.eventEmitter.emit(RoomCallback.private_data, ea.content.toArrayBuffer(), y.id);
			break;
		case g.UPDATE_USER_DATA_MSG:
			var fa = f.decodeBody(e),
				y = room.getUserByNodeId(fa.node_id);
			y.data = fa.user_data, room.eventEmitter.emit(RoomCallback.user_data_notify, fa.user_data, y.id);
			break;
		case g.ROOM_DATA_INFO:
			var ga = f.decodeBody(e);
			room.eventEmitter.emit(RoomCallback.app_data_notify, ga.kvs);
			var ha = ga.kvs;
			if (null != ha) for (var ia = 0; ia != ha.length; ++ia) {
				var ja = ha[ia];
				room.appData[ja.key] = ja.value
			}
			break;
		case g.USER_INDICTION:
			var ka = f.decodeBody(e);
			if (ka.type == g.USER_MSG) {
				var la = f.decodeUserMsg(ka.body),
					ma = room.getUserId(ka.operator_id);
				room.eventEmitter.emit(RoomCallback.leave_indication, la.reason, ma);
				var na = !0;
				room.leave(la.reason, na)
			}
			break;
		case g.USER_MSG:
			var la = f.decodeBody(e),
				y = room.getUserByNodeId(la.node_id);
			if (null != y) {
				if (null != y.videos && y.videos.length > 0) for (var q in y.videos) {
					var z = y.videos[q];
					null != room.pubVideos && room.pubVideos.length > 0 && arrayUtil.objectSplice(room.pubVideos, z.id), null != room.selfUser.subVideoIds && room.selfUser.subVideoIds.length > 0 && arrayUtil.baseSplice(room.selfUser.subVideoIds, z.id)
				}
				return null != y.audio && (null != room.pubAudios && room.pubAudios.length > 0 && arrayUtil.objectSplice(room.pubAudios, y.audio.id), null != room.selfUser.subAudioIds && room.selfUser.subAudioIds.length > 0 && arrayUtil.baseSplice(room.selfUser.subAudioIds, y.audio.id)), null != y.screen && (null != room.pubScreens && room.pubScreens.length > 0 && arrayUtil.objectSplice(room.pubScreens, y.screen.id), null != room.selfUser.subScreenIds && room.selfUser.subScreenIds.length > 0 && arrayUtil.baseSplice(room.selfUser.subScreenIds, y.screen.id)), room.removeUser(y.id), void room.eventEmitter.emit(RoomCallback.user_leave_notify, la.opt, la.reason, y)
			}
			null != room.selfUser && la.node_id == room.selfUser.nodeId && (room.selfUser.mulLanding = !0, room.masterServer.pingInit(), room.eventEmitter.emit(RoomCallback.leave_indication, ErrorConstant.mulLanding_error.message, room.selfUser.id));
			break;
		case g.OFFER_REQ:
			log.debug("P2P acception Offer,send answer");
			var oa = f.decodeBody(e);
			room.traceableP2PPeerConnection.setRemoteP2P(oa);
			break;
		case g.OFFER_REP:
			log.debug("P2P acception OFFER_REP");
			var pa = f.decodeBody(e);
			room.traceableP2PPeerConnection.setAnswerP2P(pa);
			break;
		case g.CANDIDATE_MSG:
			log.debug("P2P acception candidate,send candidate");
			var s = f.decodeBody(e);
			room.traceableP2PPeerConnection.addIceCandidateP2P(s);
			break;
		case g.SUB_ROOM_RESOURCE_REQ:
			log.debug("P2P acception SUB_ROOM_RESOURCE_REQ");
			var qa = f.decodeBody(e);
			if (room.selfUser.nodeId > qa.sub_node_id) {
				room.traceableP2PPeerConnection.addStreamP2P(qa);
				var ra = qa.info,
					sa = room.traceableP2PPeerConnection.getToP2PPeerConnection(qa.sub_node_id);
				ra.stream.type == h.video ? (log.info("accept video P2P SUB_ROOM_RESOURCE_REQ: " + qa.sub_node_id + "------>" + room.selfUser.nodeId), room.selfUser.subVideoStream2ResourceInfo[ra.stream.stream_name] = ra, room.traceableP2PPeerConnection.sendSubSdpAnswerP2P("offerSub", sa, "video", 1, ra, qa.sub_node_id)) : ra.stream.type == h.audio ? (log.info("accept audio P2P SUB_ROOM_RESOURCE_REQ: " + qa.sub_node_id + "------>" + room.selfUser.nodeId), room.selfUser.subAudioStream2ResourceInfo[ra.stream.stream_name] = ra, room.traceableP2PPeerConnection.sendSubSdpAnswerP2P("offerSub", sa, "audio", 1, ra, qa.sub_node_id)) : ra.stream.type == h.desktop && (log.info("accept desktop P2P  SUB_ROOM_RESOURCE_REQ: " + qa.sub_node_id + "------>" + room.selfUser.nodeId), room.selfUser.subScreenStream2ResourceInfo[ra.stream.stream_name] = ra, room.traceableP2PPeerConnection.sendSubSdpAnswerP2P("offerSub", sa, "desktop", 1, ra, qa.sub_node_id))
			} else room.traceableP2PPeerConnection.addStreamP2P(qa), room.traceableP2PPeerConnection.sendSubSdpOfferP2P("answerSub", qa);
			break;
		case g.SUB_ROOM_RESOURCE_REP:
			log.debug("P2P acception SUB_ROOM_RESOURCE_REP, TO sub");
			var ta = f.decodeBody(e);
			if (room.selfUser.nodeId > ta.info.owner_id) {
				var ra = ta.info,
					sa = room.traceableP2PPeerConnection.getToP2PPeerConnection(ra.owner_id);
				ra.stream.type == h.video ? (room.selfUser.subVideoStream2ResourceInfo[ra.stream.stream_name] = ra, room.traceableP2PPeerConnection.sendSubSdpAnswerP2P("answerSub", sa, "video", 1, ra, ra.owner_id)) : ra.stream.type == h.audio ? (room.selfUser.subAudioStream2ResourceInfo[ra.stream.stream_name] = ra, room.traceableP2PPeerConnection.sendSubSdpAnswerP2P("answerSub", sa, "audio", 1, ra, ra.owner_id)) : ra.stream.type == h.desktop && (room.selfUser.subScreenStream2ResourceInfo[ra.stream.stream_name] = ra, room.traceableP2PPeerConnection.sendSubSdpAnswerP2P("answerSub", sa, "desktop", 1, ra, ra.owner_id))
			} else room.traceableP2PPeerConnection.getSubSdpAnswerP2PByRep(ta);
			break;
		case g.SUB_ROOM_RESOURCE_MSG:
			log.debug("P2P acception SUB_ROOM_RESOURCE_MSG");
			var ua = f.decodeBody(e);
			room.traceableP2PPeerConnection.getSubSdpAnswerP2P(ua);
			break;
		case g.ANNOTATION_MSG:
			log.debug("acception ANNOTATION_MSG")
		}
	}, e
}), ModuleBase.define("User", ["Video", "Audio", "Screen", "Error"], function(a, b, c, d) {
	var e = function(a, b, c, d) {
			this.id = a, this.name = b, this.data = c, this.password = d, this.nodeId = null, this.role = null, this.videos = [], this.audio, this.screen, this.toMCUPC, this.mulLanding = !1, this.eventEmitter = new EventEmitter, this.videoSdpSsrc, this.audioSdpSsrc, this.screenSdpSsrc, this.subVideoStream2ResourceInfo = {}, this.subAudioStream2ResourceInfo = {}, this.subScreenStream2ResourceInfo = {}, this.subVideoIds = [], this.subAudioIds = [], this.subScreenIds = [], this.reconnectionSubVideoIds = null, this.reconnectionSubAudioIds = null, this.reconnectionSubScreenIds = null, this.reconnectionUsers = [], this.toP2PPCs = {}, this.sdpP2PMap = {}, this.videoSdpSsrcMapP2PMap = {}, this.audioSdpSsrcP2PMap = {}, this.screenSdpSsrcP2PMap = {}, this.subMyVideosP2P = [], this.subMyAudiosP2P = [], this.subMyScreensP2P = []
		};
	return e.prototype.createVideo = function(b, c) {
		var d = new a(b, c);
		return this.videos.push(d), d
	}, e.prototype.createAudio = function(a, c) {
		var d = new b(a, c);
		return this.audio = d, d
	}, e.prototype.createScreen = function(a, b) {
		var d = new c(a, b);
		return this.screen = d, d
	}, e.prototype.initScreen = function() {
		var a = "screen-" + this.id,
			b = this.name + "-screen",
			c = this.createScreen(a, b);
		c.level = 0, c.description = "", this.eventEmitter.emit(UserCallback.screen_status_notify, c.status, c.id, c.name, this.id);
		var d = room.composePDUDeviceId(this.id, a);
		room.masterServer.addScreenMsg(d, c)
	}, e.prototype.initVideo = function(a, b) {
		var c = this.createVideo(a, b);
		c.cameraType = CameraType.unknown, c.level = 0, c.description = "", this.eventEmitter.emit(UserCallback.camera_status_notify, c.status, c.id, c.name, this.id);
		var d = room.composePDUDeviceId(this.id, a);
		room.masterServer.addWebcamMsg(d, c)
	}, e.prototype.deleteVideo = function(a) {
		var b = this.getVideo(a);
		if (null != b) {
			b.status == StreamStatus.opened ? b.unpreview() : b.status == StreamStatus.published && b.unpublish(), arrayUtil.objectSplice(this.videos, a), this.eventEmitter.emit(UserCallback.camera_status_notify, StreamStatus.none, b.id, b.name, this.id);
			var c = room.composePDUDeviceId(this.id, a);
			room.masterServer.removeWebcamMsg(c)
		}
	}, e.prototype.initAudio = function(a, b) {
		var c = this.createAudio(a, b);
		room.avdEngine.checkAudioId = a, room.avdEngine.checkAudioName = b, this.eventEmitter.emit(UserCallback.microphone_status_notify, c.status, c.id, c.name, this.id);
		var d = room.composePDUDeviceId(this.id, a);
		room.masterServer.addSpeakerMsg(d, c)
	}, e.prototype.deleteAudio = function(a) {
		var b = this.getAudio(a);
		if (null != b) {
			b.status == StreamStatus.published && video.closeMicrophone(), this.audio = null, this.eventEmitter.emit(UserCallback.microphone_status_notify, StreamStatus.none, b.id, b.name, this.id);
			var c = room.composePDUDeviceId(this.id, a);
			room.masterServer.removeSpeakerMsg(c)
		}
	}, e.prototype.getVideo = function(a) {
		for (var b = null, c = 0; c < this.videos.length; c++) {
			var d = this.videos[c];
			if (d.id == a) {
				b = d;
				break
			}
		}
		return b
	}, e.prototype.getScreen = function(a) {
		"undefined" == typeof a && (a = "screen-" + this.id);
		var b = null;
		return null != this.screen && this.screen.id == a && (b = this.screen), b
	}, e.prototype.getAudio = function(a) {
		var b = null;
		return null != this.audio && this.audio.id == a && (b = this.audio), b
	}, e.prototype.openCameraAndMicrophone = function(a, b, c, e) {
		var f = when.defer(),
			g = this;
		return null != a && null == b ? a.publish() : null == a && null != b ? b.openMicrophone() : null != a && null != b && obtainUserMedia(b, a, function(d) {
			var h = getRandomNum(1, 3e3);
			a.status = StreamStatus.opened, a.stream = d.videoStream;
			var i = room.composePDUDeviceId(g.id, a.id);
			room.masterServer.videoPublishHandle(i, a.stream, h), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(b) {
				b == h && (a.element = c, attachMediaStream(c, d.videoStream), a.status = StreamStatus.published, room.pubVideos.push(a), g.eventEmitter.emit(UserCallback.camera_status_notify, a.status, a.id, a.name, g.id))
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, b) {
				b == h && f.reject(a)
			});
			var j = getRandomNum(30001, 6e3);
			b.state = StreamStatus.opened, b.stream = d.audioStream;
			var k = room.composePDUDeviceId(g.id, b.id);
			room.masterServer.audioPublishHandle(k, b.stream, j), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_success, function(a) {
				a == j && (b.element = e, attachMediaStream(e, d.audioStream), b.status = StreamStatus.published, room.pubAudios.push(b), g.eventEmitter.emit(UserCallback.microphone_status_notify, b.status, b.id, b.name, g.id))
			}), room.addCallback(EngineCallback.pub_roomresourcemsg_rep_error, function(a, b) {
				b == j && f.reject(a)
			})
		}, function(a) {
			var b = new d(ErrorConstant.failed_access_localMedia);
			f.reject(b)
		}), f.promise
	}, e.prototype.remotecmdPublishCamera = function(a) {
		var b = room.splitUserId(a.id),
			c = room.getNodeId(b);
		room.masterServer.videoIndiction(!0, a.id, c)
	}, e.prototype.remotecmdUnpublishCamera = function(a) {
		var b = room.splitUserId(a),
			c = room.getNodeId(b);
		room.masterServer.videoIndiction(!1, a, c)
	}, e.prototype.remotecmdOpenMicrophone = function(a) {
		var b = room.getUser(a),
			c = room.getNodeId(a);
		room.masterServer.audioIndiction(!0, b.audio.id, c)
	}, e.prototype.remotecmdCloseMicrophone = function(a) {
		var b = room.getUser(a),
			c = room.getNodeId(a);
		room.masterServer.audioIndiction(!1, b.audio.id, c)
	}, e.prototype.updateUserData = function(a) {
		this.data = a, room.masterServer.updateUserDataMsg(a)
	}, e.prototype.getUserData = function(a) {
		if ("undefined" == typeof a || null == a || "" == a) return this.data;
		var b = room.getUser(a);
		return null != b ? b.data : void 0
	}, e.prototype.attachVideoElementMediaStream = function(a, b) {
		if (null != b) {
			var c = this.subVideoStream2ResourceInfo[b.id],
				d = this.getUserByVideoStreamLabel(b.id),
				e = d.getVideo(c.resource_id);
			e.element = a
		}
		attachMediaStream(a, b)
	}, e.prototype.attachScreenElementMediaStream = function(a, b) {
		if (null != b) {
			var c = this.subScreenStream2ResourceInfo[b.id],
				d = this.getUserByScreenStreamLabel(b.id),
				e = d.getScreen(c.resource_id);
			e.element = a
		}
		attachMediaStream(a, b)
	}, e.prototype.attachAudioElementMediaStream = function(a, b) {
		if (null != b) {
			var c = this.subAudioStream2ResourceInfo[b.id],
				d = this.getUserByAudioStreamLabel(b.id),
				e = d.getAudio(c.resource_id);
			e.element = a
		}
		attachMediaStream(a, b)
	}, e.prototype.addCallback = function(a, b) {
		this.eventEmitter.addListener(a, b)
	}, e.prototype.getUserByVideoStreamLabel = function(a) {
		var b = this.subVideoStream2ResourceInfo[a];
		if (null != b) {
			var c = b.owner_id;
			return room.getUserByNodeId(c)
		}
		return null
	}, e.prototype.getUserByAudioStreamLabel = function(a) {
		var b = this.subAudioStream2ResourceInfo[a];
		if (null != b) {
			var c = b.owner_id;
			return room.getUserByNodeId(c)
		}
		return null
	}, e.prototype.getUserByScreenStreamLabel = function(a) {
		var b = this.subScreenStream2ResourceInfo[a];
		if (null != b) {
			var c = b.owner_id;
			return room.getUserByNodeId(c)
		}
		return null
	}, e
}), ModuleBase.define("Record", ["RecordRestServer", "Error"], function(a, b) {
	var c = function(b) {
			this.restServerURI = b, this.recordRestServer = new a, this.recordInfo = {
				name: "",
				tag: "",
				roomId: "",
				userId: "",
				audioType: RecordEnum.AudioType.singleuser,
				videoType: RecordEnum.VideoType.mainflow,
				fileType: RecordEnum.FileType.mp4
			}
		};
	return c.prototype.createUserRecord = function(a, c) {
		var d = when.defer();
		if (!c) {
			var e = new b(ErrorConstant.params_require);
			return d.reject(e), d.promise
		}
		if ("" == c.roomId) {
			var e = new b(ErrorConstant.roomId_required);
			return d.reject(e), d.promise
		}
		if ("" == c.userId) {
			var e = new b(ErrorConstant.userId_required);
			return d.reject(e), d.promise
		}
		return this.recordRestServer.createUserRecord(this.restServerURI, a, c).then(function(a) {
			d.resolve(a)
		}).otherwise(function(a) {
			d.reject(a)
		}), d.promise
	}, c.prototype.stopRecord = function(a, b) {
		var c = when.defer();
		return this.recordRestServer.stopRecord(this.restServerURI, a, b).then(function(a) {
			c.resolve(a)
		}).otherwise(function(a) {
			c.reject(a)
		}), c.promise
	}, c.prototype.getRecord = function(a, b) {
		var c = when.defer();
		return this.recordRestServer.getRecord(this.restServerURI, a, b).then(function(a) {
			c.resolve(a)
		}).otherwise(function(a) {
			c.reject(a)
		}), c.promise
	}, c.prototype.deleteRecord = function(a, b) {
		var c = when.defer();
		return this.recordRestServer.deleteRecord(this.restServerURI, a, b).then(function(a) {
			c.resolve(a)
		}).otherwise(function(a) {
			c.reject(a)
		}), c.promise
	}, c.prototype.findRecords = function(a, b, c, d) {
		var e = when.defer();
		return this.recordRestServer.findRecords(this.restServerURI, a, b, c, d).then(function(a) {
			e.resolve(a)
		}).otherwise(function(a) {
			e.reject(a)
		}), e.promise
	}, c
}), ModuleBase.define("RecordRestServer", ["Error"], function(a) {
	var b = function() {};
	return b.prototype.createUserRecord = function(b, c, d) {
		var e = when.defer(),
			f = document.location.protocol,
			g = f + "//" + b + "/avd/api/record/createUserRecord?accessToken=" + c + "&callback=?";
		return console.log(g), $.ajax({
			type: "post",
			url: g,
			dataType: "jsonp",
			data: d,
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) e.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					e.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/record/createUserRecord) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var f = new a(b.status, b.statusText);
				e.reject(f)
			}
		}), e.promise
	}, b.prototype.stopRecord = function(b, c, d) {
		var e = when.defer(),
			f = document.location.protocol,
			g = f + "//" + b + "/avd/api/record/stop?id=" + d + "&accessToken=" + c + "&callback=?";
		return $.ajax({
			type: "get",
			url: g,
			dataType: "jsonp",
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) e.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					e.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/record/stop) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var f = new a(b.status, b.statusText);
				e.reject(f)
			}
		}), e.promise
	}, b.prototype.getRecord = function(b, c, d) {
		var e = when.defer(),
			f = document.location.protocol,
			g = f + "//" + b + "/avd/api/record/getRecord?id=" + d + "&accessToken=" + c + "&callback=?";
		return $.ajax({
			type: "get",
			url: g,
			dataType: "jsonp",
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) e.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					e.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/record/getRecord) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var f = new a(b.status, b.statusText);
				e.reject(f)
			}
		}), e.promise
	}, b.prototype.deleteRecord = function(b, c, d) {
		var e = when.defer(),
			f = document.location.protocol,
			g = f + "//" + b + "/avd/api/record/delete?id=" + d + "&accessToken=" + c + "&callback=?";
		return $.ajax({
			type: "get",
			url: g,
			dataType: "jsonp",
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) e.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					e.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/record/delete) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var f = new a(b.status, b.statusText);
				e.reject(f)
			}
		}), e.promise
	}, b.prototype.findRecords = function(b, c, d, e, f) {
		var g = when.defer(),
			h = document.location.protocol,
			i = h + "//" + b + "/avd/api/record/findRecords?begin=" + d + "&count=" + e + "&filter=" + f + "&accessToken=" + c + "&callback=?";
		return $.ajax({
			type: "get",
			url: i,
			dataType: "jsonp",
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) g.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					g.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/record/findRecords) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var e = new a(b.status, b.statusText);
				g.reject(e)
			}
		}), g.promise
	}, b
}), ModuleBase.define("Live", ["LiveRestServer", "Error"], function(a, b) {
	var c = function(b) {
			this.restServerURI = b, this.liveRestServer = new a, this.liveInfo = {
				name: "",
				tag: "",
				roomId: "",
				userId: "",
				audioType: LiveEnum.AudioType.singleuser,
				videoType: LiveEnum.VideoType.mainflow
			}
		};
	return c.prototype.createUserLive = function(a, c) {
		var d = when.defer();
		if (!c) {
			var e = new b(ErrorConstant.params_require);
			return d.reject(e), d.promise
		}
		if ("" == c.roomId) {
			var e = new b(ErrorConstant.roomId_required);
			return d.reject(e), d.promise
		}
		if ("" == c.userId) {
			var e = new b(ErrorConstant.userId_required);
			return d.reject(e), d.promise
		}
		return this.liveRestServer.createUserLive(this.restServerURI, a, c).then(function(a) {
			d.resolve(a)
		}).otherwise(function(a) {
			d.reject(a)
		}), d.promise
	}, c.prototype.stopLive = function(a, b) {
		var c = when.defer();
		return this.liveRestServer.stopLive(this.restServerURI, a, b).then(function(a) {
			c.resolve(a)
		}).otherwise(function(a) {
			c.reject(a)
		}), c.promise
	}, c.prototype.getLive = function(a, b) {
		var c = when.defer();
		return this.liveRestServer.getLive(this.restServerURI, a, b).then(function(a) {
			c.resolve(a)
		}).otherwise(function(a) {
			c.reject(a)
		}), c.promise
	}, c.prototype.deleteLive = function(a, b) {
		var c = when.defer();
		return this.liveRestServer.deleteLive(this.restServerURI, a, b).then(function(a) {
			c.resolve(a)
		}).otherwise(function(a) {
			c.reject(a)
		}), c.promise
	}, c.prototype.findLives = function(a, b, c, d) {
		var e = when.defer();
		return this.liveRestServer.findLives(this.restServerURI, a, b, c, d).then(function(a) {
			e.resolve(a)
		}).otherwise(function(a) {
			e.reject(a)
		}), e.promise
	}, c
}), ModuleBase.define("LiveRestServer", ["Error"], function(a) {
	var b = function() {};
	return b.prototype.createUserLive = function(b, c, d) {
		var e = when.defer(),
			f = document.location.protocol,
			g = f + "//" + b + "/avd/api/live/createUserLive?accessToken=" + c + "&callback=?";
		return console.log(g), $.ajax({
			type: "post",
			url: g,
			dataType: "jsonp",
			data: d,
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) e.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					e.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/live/createUserLive) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var f = new a(b.status, b.statusText);
				e.reject(f)
			}
		}), e.promise
	}, b.prototype.stopLive = function(b, c, d) {
		var e = when.defer(),
			f = document.location.protocol,
			g = f + "//" + b + "/avd/api/live/stop?id=" + d + "&accessToken=" + c + "&callback=?";
		return $.ajax({
			type: "get",
			url: g,
			dataType: "jsonp",
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) e.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					e.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/live/stop) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var f = new a(b.status, b.statusText);
				e.reject(f)
			}
		}), e.promise
	}, b.prototype.getLive = function(b, c, d) {
		var e = when.defer(),
			f = document.location.protocol,
			g = f + "//" + b + "/avd/api/live/getLive?id=" + d + "&accessToken=" + c + "&callback=?";
		return $.ajax({
			type: "get",
			url: g,
			dataType: "jsonp",
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) e.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					e.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/live/getLive) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var f = new a(b.status, b.statusText);
				e.reject(f)
			}
		}), e.promise
	}, b.prototype.deleteLive = function(b, c, d) {
		var e = when.defer(),
			f = document.location.protocol,
			g = f + "//" + b + "/avd/api/live/delete?id=" + d + "&accessToken=" + c + "&callback=?";
		return $.ajax({
			type: "get",
			url: g,
			dataType: "jsonp",
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) e.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					e.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/live/delete) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var f = new a(b.status, b.statusText);
				e.reject(f)
			}
		}), e.promise
	}, b.prototype.findLives = function(b, c, d, e, f) {
		var g = when.defer(),
			h = document.location.protocol,
			i = h + "//" + b + "/avd/api/live/findLives?begin=" + d + "&count=" + e + "&filter=" + f + "&accessToken=" + c + "&callback=?";
		return $.ajax({
			type: "get",
			url: i,
			dataType: "jsonp",
			timeout: 5e3,
			success: function(b) {
				if (b && 0 == b.result) g.resolve(b.data);
				else {
					var c = new a(b.result, b.err);
					g.reject(c)
				}
			},
			error: function(b, c, d) {
				log.info("ajax (/avd/api/live/findLives) errorCode:" + b.status + ",errorMsg:" + b.statusText);
				var e = new a(b.status, b.statusText);
				g.reject(e)
			}
		}), g.promise
	}, b
});