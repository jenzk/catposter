;(function() {

    // Get elements by ID.
    var title = document.getElementById('input-title');
    var info = document.getElementById('input-info');

    var ownerName = document.getElementById('input-owner-name');
    var ownerPhone = document.getElementById('input-owner-phone');
    var ownerEmail = document.getElementById('input-owner-email');

    // Add event listeners.
    title.addEventListener('input', onPosterTitleUpdate);
    info.addEventListener('input', onPosterInfoUpdate);
    ownerName.addEventListener('input', onOwnerUpdate);
    ownerPhone.addEventListener('input', onOwnerUpdate);
    ownerEmail.addEventListener('input', onOwnerUpdate);


    // Image drop zone.
    var drop = document.getElementById('preview-image');
    dropZoneListener(drop);
})();

function onPosterTitleUpdate(e) {
    var newTitle = e.target.value;
    console.debug('updating; ', newTitle);

    var previewTitle = document.getElementById('preview-title');
    previewTitle.textContent = newTitle;
}

function onPosterInfoUpdate(e) {
    var newInfo = e.target.value;
    console.debug('updating; ', newInfo);

    var previewInfo = document.getElementById('preview-info');
    previewInfo.textContent = newInfo;
}

function onOwnerUpdate(e) {
    var ownerName = document.getElementById('input-owner-name').value;
    var ownerPhone = document.getElementById('input-owner-phone').value;
    var ownerEmail = document.getElementById('input-owner-email').value;
    var text = ownerName + " at " + ownerPhone + " or " + ownerEmail;

    var previewOwnerInfo = document.getElementById('preview-owner-info');
    previewOwnerInfo.textContent = text;
}

function dropZoneListener(drop) {
    drop.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    drop.addEventListener('dragenter', function(e) {
        e.preventDefault();
    });
    drop.addEventListener('drop', function(e) {
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.addEventListener('loadend', function() {
                var bin = this.result;
                var imgEl = document.createElement('img');
                imgEl.src = bin;
                drop.innerHTML = '';
                drop.appendChild(imgEl);
            });
        }
    });
}