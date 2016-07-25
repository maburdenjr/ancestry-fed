(function() {

    var ancestry = ancestry || {};
    var ancestryForm = $('#subscribeForm');

    $('body').on('click', '#subscribe', function(e) {
        e.preventDefault();
        ancestry.showModal();
    });

    $('body').on('click', '#close', function(e) {
        e.preventDefault();
        ancestry.closeModal();
    });

    $('body').on('click', '#getStarted', function(e) {
        e.preventDefault();
        var checkForm = ancestry.validateForm();
        if (checkForm) {
            ancestry.submitForm();
        }
    });

    ancestry.showModal = function() {
        var url = "http://www.filltext.com/?rows=1&fname=Michael&lname=Burden&email=someone@somebogusemail.com&pretty=true";
        ancestry.getRequest(url);
        $('#modal-wrapper').fadeIn();
    };
    ancestry.closeModal = function() {
        $('#modal-wrapper').fadeOut();
    };

    ancestry.getRequest = function(remoteUrl) {
        $.ajax({
            url: remoteUrl,
            type: 'GET',
            data: {
                format: 'json'
            },
            success: function(data) {
                ancestry.populateForm(data);
            },
            error: function(data) {
                alert('An unknown error has occured.');
            }
        })
    }

    ancestry.populateForm = function(data) {
        $('#firstName').val(data[0].fname);
        $('#lastName').val(data[0].lname);
        $('#emailAddress').val(data[0].email);
    }

    ancestry.validateForm = function() {
        var errorMatch = false;
        ancestryForm.find('input').removeClass('error').removeAttr('aria-invalid');
        ancestryForm.find('input').each(function(index) {
            if ($(this).val() == null || $(this).val().trim() == "") {
                $(this).addClass('error');
                $(this).attr('aria-invalid', 'true');
                errorMatch = true;
            }
        })
        if (errorMatch) { return false; }
        var emailCheck = ancestryForm.find('#emailAddress').val();
        if (ancestry.validateEmail(emailCheck)) {
            return true;
        } else {
            ancestryForm.find('#emailAddress').addClass('error');
            return false;
        }
    }

    ancestry.submitForm = function() {
        ancestryForm.find('input').val('').removeClass('error');
        ancestry.closeModal();
    }

    ancestry.validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

})();