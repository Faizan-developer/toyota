var vehicleGallery = vehicleGallery || {};

vehicleGallery.API = {
    gallery: [],
    GalleryContainerId: '',
    GalleryTemplateId: 'galleryTemplate',
    getGalleryItems: function (id) {
        $("#galleryContainer-" + id).closest(".tt-gallery-block").addClass("loading");
        $.ajax({
            url: '/api/Vehicle/GetAlbum',
            method: 'GET',
            async: false,
            data: {
                albumId: $('#parentId-' + id).val(),
                skip: parseInt($('#skipValue-' + id).val()),
                take: parseInt($('#takeValue-' + id).val()),
            },
            success: function (response) {

                if (response.AlbumItems.length > 0) {
                    vehicleGallery.API.gallery = response.AlbumItems
                    vehicleGallery.API.renderGallery();
                    $('#skipValue-' + id).val(parseInt($('#skipValue-' + id).val()) + parseInt($('#takeValue-' + id).val()));
                    var length = $("#galleryContainer-" + id + " > div").length;
                    if (length >= response.count) {
                        $('#loadmore-' + id).hide();
                    }
                    $("#galleryContainer-" + id).find('.vbox-item').attr('data-gall', id);

                    app.venobox();
                }
                $("#galleryContainer-" + id).closest(".tt-gallery-block").removeClass("loading");
            },
            error: function (error) {
                console.log("Json post failed");
                $("#galleryContainer-" + id).closest(".tt-gallery-block").removeClass("loading");
            }

        });
    },
    renderGallery: function () {
        for (var index = 0; index < vehicleGallery.API.gallery.length; index++) {
            vehicleGallery.API.renderMarkup(vehicleGallery.API.GalleryTemplateId, vehicleGallery.API.GalleryContainerId, vehicleGallery.API.gallery[index]);
        }
    },
    renderMarkup: function (templateId, containerId, data) {
        var template = document.getElementById(templateId).innerHTML;
        var html = Mustache.to_html(template, data);
        $('#' + containerId).append(html);
    },
    init: function (id) {
        this.getGalleryItems(id);
    },
}


$(document).ready(function () {
    if ($("#galleryTemplate").length > 0) {
        $(".component.gallery.tt-gallery-block").each(function () {
            var galleryId = $(this).find(".row.main-row.galleryContainer").attr("id").replace('galleryContainer-', '');
            vehicleGallery.API.GalleryContainerId = "galleryContainer-" + galleryId;
            vehicleGallery.API.getGalleryItems(galleryId);

            $(this).find('#loadmore-' + galleryId).on('click', function () {
                //vehicleGallery.API.GalleryContainerId =  $(this).parent().parent().parent().find(".row.main-row.galleryContainer").attr("id");
                vehicleGallery.API.GalleryContainerId = "galleryContainer-" + galleryId;
                vehicleGallery.API.init(galleryId);
            });
        });
    }
});
$(document).ajaxComplete(function () {
    app.venobox();
});
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
(function(n,t){if(typeof exports=="object"&&exports)t(exports);else{var i={};t(i);typeof define=="function"&&define.amd?define(i):n.Mustache=i}})(this,function(n){function a(n,t){return l.call(n,t)}function y(n){return!a(v,n)}function u(n){return typeof n=="function"}function o(n){return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function b(n){return String(n).replace(/[&<>"'\/]/g,function(n){return w[n]})}function s(n){if(!e(n)||n.length!==2)throw new Error("Invalid tags: "+n);return[new RegExp(o(n[0])+"\\s*"),new RegExp("\\s*"+o(n[1]))]}function nt(t,i){function st(){if(ft&&!b)while(w.length)delete p[w.pop()];else w=[];ft=!1;b=!1}var a,f,e,nt,et,v,rt,ot;i=i||n.tags;t=t||"";typeof i=="string"&&(i=i.split(h));for(var l=s(i),u=new r(t),ut=[],p=[],w=[],ft=!1,b=!1;!u.eos();){if(a=u.pos,e=u.scanUntil(l[0]),e)for(rt=0,ot=e.length;rt<ot;++rt)nt=e.charAt(rt),y(nt)?w.push(p.length):b=!0,p.push(["text",nt,a,a+1]),a+=1,nt==="\n"&&st();if(!u.scan(l[0]))break;if(ft=!0,f=u.scan(g)||"name",u.scan(k),f==="="?(e=u.scanUntil(c),u.scan(c),u.scanUntil(l[1])):f==="{"?(e=u.scanUntil(new RegExp("\\s*"+o("}"+i[1]))),u.scan(d),u.scanUntil(l[1]),f="&"):e=u.scanUntil(l[1]),!u.scan(l[1]))throw new Error("Unclosed tag at "+u.pos);if(et=[f,e,a,u.pos],p.push(et),f==="#"||f==="^")ut.push(et);else if(f==="/"){if(v=ut.pop(),!v)throw new Error('Unopened section "'+e+'" at '+a);if(v[1]!==e)throw new Error('Unclosed section "'+v[1]+'" at '+a);}else f==="name"||f==="{"||f==="&"?b=!0:f==="="&&(l=s(i=e.split(h)))}if(v=ut.pop(),v)throw new Error('Unclosed section "'+v[1]+'" at '+u.pos);return it(tt(p))}function tt(n){for(var u=[],t,i,r=0,f=n.length;r<f;++r)t=n[r],t&&(t[0]==="text"&&i&&i[0]==="text"?(i[1]+=t[1],i[3]=t[3]):(u.push(t),i=t));return u}function it(n){for(var u=[],r=u,i=[],t,e,f=0,o=n.length;f<o;++f){t=n[f];switch(t[0]){case"#":case"^":r.push(t);i.push(t);r=t[4]=[];break;case"/":e=i.pop();e[5]=t[2];r=i.length>0?i[i.length-1][4]:u;break;default:r.push(t)}}return u}function r(n){this.string=n;this.tail=n;this.pos=0}function t(n,t){this.view=n==null?{}:n;this.cache={".":this.view};this.parent=t}function i(){this.cache={}}var l=RegExp.prototype.test,v=/\S/,p=Object.prototype.toString,e=Array.isArray||function(n){return p.call(n)==="[object Array]"},w={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},k=/\s*/,h=/\s+/,c=/\s*=/,d=/\s*\}/,g=/#|\^|\/|>|\{|&|=|!/,f;r.prototype.eos=function(){return this.tail===""};r.prototype.scan=function(n){var i=this.tail.match(n),t;return i&&i.index===0?(t=i[0],this.tail=this.tail.substring(t.length),this.pos+=t.length,t):""};r.prototype.scanUntil=function(n){var i=this.tail.search(n),t;switch(i){case-1:t=this.tail;this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,i);this.tail=this.tail.substring(i)}return this.pos+=t.length,t};t.prototype.push=function(n){return new t(n,this)};t.prototype.lookup=function(n){var t,i,r,f;if(n in this.cache)t=this.cache[n];else{for(i=this;i;){if(n.indexOf(".")>0)for(t=i.view,r=n.split("."),f=0;t!=null&&f<r.length;)t=t[r[f++]];else t=i.view[n];if(t!=null)break;i=i.parent}this.cache[n]=t}return u(t)&&(t=t.call(this.view)),t};i.prototype.clearCache=function(){this.cache={}};i.prototype.parse=function(n,t){var r=this.cache,i=r[n];return i==null&&(i=r[n]=nt(n,t)),i};i.prototype.render=function(n,i,r){var u=this.parse(n),f=i instanceof t?i:new t(i);return this.renderTokens(u,f,r,n)};i.prototype.renderTokens=function(t,i,r,f){function y(n){return v.render(n,i,r)}for(var c,a,h="",v=this,s,o,l=0,p=t.length;l<p;++l){s=t[l];switch(s[0]){case"#":if(o=i.lookup(s[1]),!o)continue;if(e(o))for(c=0,a=o.length;c<a;++c)h+=this.renderTokens(s[4],i.push(o[c]),r,f);else if(typeof o=="object"||typeof o=="string")h+=this.renderTokens(s[4],i.push(o),r,f);else if(u(o)){if(typeof f!="string")throw new Error("Cannot use higher-order sections without the original template");o=o.call(i.view,f.slice(s[3],s[5]),y);o!=null&&(h+=o)}else h+=this.renderTokens(s[4],i,r,f);break;case"^":o=i.lookup(s[1]);(!o||e(o)&&o.length===0)&&(h+=this.renderTokens(s[4],i,r,f));break;case">":if(!r)continue;o=u(r)?r(s[1]):r[s[1]];o!=null&&(h+=this.renderTokens(this.parse(o),i,r,o));break;case"&":o=i.lookup(s[1]);o!=null&&(h+=o);break;case"name":o=i.lookup(s[1]);o!=null&&(h+=n.escape(o));break;case"text":h+=s[1]}}return h};n.name="mustache.js";n.version="0.8.1";n.tags=["{{","}}"];f=new i;n.clearCache=function(){return f.clearCache()};n.parse=function(n,t){return f.parse(n,t)};n.render=function(n,t,i){return f.render(n,t,i)};n.to_html=function(t,i,r,f){var e=n.render(t,i,r);if(u(f))f(e);else return e};n.escape=b;n.Scanner=r;n.Context=t;n.Writer=i});
var modelSpot = modelSpot || {};

modelSpot.API = {
    fullSpecLink: $('#fullSpecLink'),
    updateQueryString: function (key, value, url) {
        if (!url) url = window.location.href;
        var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
            hash;

        if (re.test(url)) {
            if (typeof value !== 'undefined' && value !== null)
                return url.replace(re, '$1' + key + "=" + value + '$2$3');
            else {
                hash = url.split('#');
                url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                    url += '#' + hash[1];
                return url;
            }
        }
        else {
            if (typeof value !== 'undefined' && value !== null) {
                var separator = url.indexOf('?') !== -1 ? '&' : '?';
                hash = url.split('#');
                url = hash[0] + separator + key + '=' + value;
                if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                    url += '#' + hash[1];
                return url;
            }
            else
                return url;
        }
    },
    onFullSpecLinkClick: function () {
        this.fullSpecLink.click(function () {
            var vehicleId = $('.swiper-slide-active').data('id');
            var url = modelSpot.API.fullSpecLink.attr('href');
            if (!(url == 'javascript:void(0)' || url == 'javascript:void(0);')) {
                var updatedUrl = modelSpot.API.updateQueryString('id', vehicleId, url);
                window.location.href = updatedUrl;
            }
            return false;
        })
    },
    init: function () {
        this.onFullSpecLinkClick();
    }
}

$(document).ready(function () {
    modelSpot.API.init();
});