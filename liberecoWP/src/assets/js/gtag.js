// gtag('event', 'conversion', { 'send_to': 'AW-823333007/g1jgCM2W95ABEI-hzIgD' });

function gtag_report_conversion(url) {
    var callback = function() {
        if (typeof(url) != 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-823333007/g1jgCM2W95ABEI-hzIgD',
        'event_callback': callback
    });
    return false;
}