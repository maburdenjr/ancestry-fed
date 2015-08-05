(function() {

    var ancestry = ancestry || {};

    $('body').on('click', '#subscribe', function() {
        ancestry.showModal();
    });
    
    $('body').on('click', '#close', function() {
        ancestry.closeModal();
    });

    ancestry.showModal = function() {
        $('#modal-wrapper').fadeIn();
    };
    ancestry.closeModal = function() {
        $('#modal-wrapper').fadeOut();
    };

})();