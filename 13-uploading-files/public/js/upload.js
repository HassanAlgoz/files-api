function setProgress(progressBar, amount) {
    progressBar.textContent = `${amount}%`
    progressBar.style = `width: ${amount}%;`
}

window.addEventListener('load', function() {
    const uploadButton = document.getElementById('uploadButton')
    const uploadInput = document.getElementById('uploadInput')
    const progressBar = document.getElementById('progressBar')
    
    uploadButton.onclick = function() {
        uploadInput.click();
        setProgress(progressBar, 0)
    }

    uploadInput.addEventListener('change', function(evt) {
        let files = evt.target.files;
        if (!files.length > 0) {return;}

        let formData = new FormData();
        Array.from(files).forEach(file => formData.append('files', file, file.name))

        // Send data (files) to the server
        let xhr = new XMLHttpRequest();
        xhr.open("post", "/upload")
        xhr.send(formData)

        xhr.addEventListener('progress', function(evt) {
            if (evt.lengthComputable) {
                let percentComplete = Math.round(100 * evt.loaded / evt.total);
                setProgress(progressBar, percentComplete)

                if (percentComplete === 100) {
                    progressBar.textContent = "Done"
                }
            }
        })

    })
})