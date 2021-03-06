// format phone number
let phoneFormatter = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return '(' + match[1] + ')' + match[2] + '-' + match[3]
    };

    return null
};

;(function() {

    // Get elements by ID.
    var title = document.getElementById('input-title');
    var info = document.getElementById('input-info');

    var ownerName = document.getElementById('input-owner-name');
    var ownerPhone = document.getElementById('input-owner-phone');
    var ownerEmail = document.getElementById('input-owner-email');
    var tearOffChecked = document.getElementById('input-tearoff');

    var finishPosterBtn = document.getElementById('finish-poster');
    // var nextBtn = document.getElementById('next-button');

    // Add event listeners.
    title.addEventListener('input', onPosterTitleUpdate);
    info.addEventListener('input', onPosterInfoUpdate);
    ownerName.addEventListener('input', onOwnerUpdate);
    ownerPhone.addEventListener('input', onOwnerUpdate);
    ownerEmail.addEventListener('input', onOwnerUpdate);
    tearOffChecked.addEventListener('change', onOwnerUpdate);
    finishPosterBtn.addEventListener('click', function(e) {
        e.preventDefault();

        var previewTitle = document.getElementById('preview-title').textContent;
        var previewInfo = document.getElementById('preview-info').textContent;
        var previewOwnerName = document.getElementById('preview-owner-name').textContent;
        var previewOwnerPhone = document.getElementById('preview-owner-phone').textContent;
        var previewOwnerEmail = document.getElementById('preview-owner-email').textContent;
        var img = document.getElementById('preview-image').getElementsByTagName('img')[0].src;

        var doc = new jspdf.jsPDF({
            format: 'letter'
        });

        var docWidth = doc.internal.pageSize.getWidth();
        var imageProps = doc.getImageProperties(img);
        var width = imageProps.width;

        console.log(docWidth, width);


        // var height = (imageProps.height * width) / width;

        // console.log(imageProps);
        // console.log(width, height);

        doc.setFontSize(40);
        doc.text(previewTitle, 105, 25, { align: 'center' })

        doc.addImage(img, "JPEG", (docWidth - 150) / 2, 40, 150, 100);

        doc.setFontSize(12);
        doc.text(previewInfo, 105, 150, { align: 'center', maxWidth: 180 });

        doc.setFontSize(20);
        doc.text("Please Contact:", 105, 175, { align: 'center', maxWidth: 180 });

        doc.setFontSize(12);
        doc.text(previewOwnerName, 105, 180, { align: 'center', maxWidth: 180 });
        doc.text(previewOwnerPhone, 105, 185, { align: 'center', maxWidth: 180 });
        doc.text(previewOwnerEmail, 105, 190, { align: 'center', maxWidth: 180 });

               
        
        if (document.getElementById('input-tearoff').checked) {
            const clipLength = 8;
            let offset = 10;

            for (let clip = 0; clip < clipLength; clip ++) {
                doc.text(previewOwnerName, 15 + offset, 275, { align: 'center', maxWidth: 225, angle: 90, rotationDirection: 1 });
                doc.text(previewOwnerPhone, 22 + offset, 275, { align: 'center', maxWidth: 225, angle: 90, rotationDirection: 1 });
                doc.text(previewOwnerEmail, 32 + offset, 275, { align: 'center', maxWidth: 225, angle: 90, rotationDirection: 1 });
                offset += 25;
            }
        }
        // doc.autoPrint();
        doc.save('poster.pdf');
    });
    // nextBtn.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     var posterPreview = document.getElementById('poster-preview'); 
    //     posterPreview.classList.toggle('full-screen');
    // });

    // Update all elements.
    updateAll();

    // Image drop zone.
    var drop = document.getElementById('preview-image');
    dropZoneListener(drop);
})();

function updateAll() {
    var updatedTitle = document.getElementById('input-title').value;
    if (updatedTitle !== '') {
        var previewTitle = document.getElementById('preview-title');
        previewTitle.textContent = updatedTitle;
    }

    var updatedInfo = document.getElementById('input-info').value;
    if (updatedInfo !== '') {
        var previewInfo = document.getElementById('preview-info');
        previewInfo.textContent = updatedInfo;
    }

    var ownerName = document.getElementById('input-owner-name').value;
    var ownerPhone = document.getElementById('input-owner-phone').value;
    var ownerEmail = document.getElementById('input-owner-email').value;

    var previewOwnerName = document.getElementById('preview-owner-name');
    previewOwnerName.textContent = ownerName;
    var previewOwnerPhone = document.getElementById('preview-owner-phone');
    previewOwnerPhone.textContent = ownerPhone;
    var previewOwnerEmail = document.getElementById('preview-owner-email');
    previewOwnerEmail.textContent = ownerEmail;
}

function onPosterTitleUpdate(e) {
    var newTitle = e.target.value;
    var previewTitle = document.getElementById('preview-title');
    previewTitle.textContent = newTitle;
}

function onPosterInfoUpdate(e) {
    var newInfo = e.target.value;
    var previewInfo = document.getElementById('preview-info');
    previewInfo.textContent = newInfo;
}

function onOwnerUpdate(e) {
    console.log(document.getElementById('input-tearoff').checked);
    var ownerName = document.getElementById('input-owner-name').value;
    var ownerPhone = document.getElementById('input-owner-phone').value;
    var ownerEmail = document.getElementById('input-owner-email').value;

    var previewOwnerName = document.getElementById('preview-owner-name');
    previewOwnerName.textContent = ownerName;
    var previewOwnerPhone = document.getElementById('preview-owner-phone');
    previewOwnerPhone.textContent = phoneFormatter(ownerPhone);
    var previewOwnerEmail = document.getElementById('preview-owner-email');
    previewOwnerEmail.textContent = ownerEmail;

    // render the tabs if checked
    const previewTabs = document.getElementById("preview-tabs");
    previewTabs.innerHTML = "";

    if (document.getElementById('input-tearoff').checked) {
        const tabCount = 8
        
        for (let tab = 0; tab < tabCount; tab++) {
            const newDiv = document.createElement("div");

            const newP = document.createElement("p");
            newP.textContent = ownerName;
            newDiv.appendChild(newP);
            const newP2 = document.createElement("p");
            newP2.textContent = phoneFormatter(ownerPhone);
            newDiv.appendChild(newP2);
            const newP3 = document.createElement("p");
            newP3.textContent = ownerEmail;
            newDiv.appendChild(newP3);
        
            previewTabs.appendChild(newDiv);
        } 
    }
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

                drop.classList.remove('border');
                // var posterPreview = document.getElementById('poster-preview');
                // posterPreview.classList.remove('border');
            });
        }
    });
}
