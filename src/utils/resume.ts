const fileName = 'VICTOR ALMEIDA.pdf'

export const downloadResume = async () => {
    const res = await fetch(fileName)
    const blob = await res.blob()
    // Creating new object of PDF file
    const fileURL = window.URL.createObjectURL(blob);
    // Setting various property values
    let alink = document.createElement('a')
    alink.href = fileURL;
    alink.download = fileName;
    alink.click();
}
