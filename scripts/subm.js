const scriptURL = 'https://script.google.com/macros/s/AKfycbyuyxDKZYASC3gg4Lj7n7fFLUGXt1U8sMeqqZicOCJFFRNDytbn26PiaUvJ7dyiiULIrQ/exec'
const form = document.forms['main_form']

form.addEventListener('keydown', function(event) {
  if(event.keyCode == 13) {
     event.preventDefault();
  }
});

form.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(form)
  const object = {};
  formData.forEach(function(value, key){ 
    if (value == 'Другое') {
       value = document.getElementsByName(key+'.other_option')[0].value
    }
    if (key.includes('.other_option')) {
      formData.delete(key+'.other_option')
    }
    else {
      object[key] = value;
    }
  });
            
  const file = form.file.files[0] ? form.file.files[0] : ""
  if (file) {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (f) => {
      const qs = new URLSearchParams({
        filename: file.name,
        mimeType: file.type,
      });
      fetch(`${scriptURL}?${qs}`, {
        method: "POST",
        body: JSON.stringify(Object.assign(object,{file: [...new Int8Array(f.target.result)]})),
      })
      .then(console.log('s1'))
      .then((res) => res.json())
      .then(console.log('s2'))
      .then(console.log)
      .catch(console.log);
    };
  }
  else {
    delete object.file
    fetch(scriptURL, { method: 'POST', body: JSON.stringify(object)})
    .then(console.log('s3'))
    .then(response => response.json())
    .then(console.log)
    .catch(error => console.error('Error!', error.message))
  }
})