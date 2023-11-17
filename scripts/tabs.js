//button Next and Back
function button_next(e) {
    
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    let panelId=e.parentNode.parentNode.id
    let numPanelId = parseInt(panelId.match(/\d+/))
    
    document.getElementById('panel-'+numPanelId).hidden = true
    document.getElementById('panel-'+(numPanelId+1)).hidden = false
    document.getElementById('prog_list_'+numPanelId).classList.replace('prog_list_active','prog_list_def')
    document.getElementById('prog_list_'+(numPanelId+1)).classList.replace('prog_list_un','prog_list_active')



}

function button_back(e) {
    
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

    let panelId=e.parentNode.parentNode.id
    let numPanelId = parseInt(panelId.match(/\d+/))
    
    document.getElementById('panel-'+(numPanelId-1)).hidden = false
    document.getElementById('panel-'+numPanelId).hidden = true
    document.getElementById('prog_list_'+numPanelId).classList.replace('prog_list_active','prog_list_un')
    document.getElementById('prog_list_'+(numPanelId-1)).classList.replace('prog_list_def','prog_list_active')
    

}

//button clear
const test = document.querySelectorAll('.field_name_a > ul')
test.forEach(function (el) {
    if (el.parentNode.classList.contains('check')) {

        let input_elem = el.querySelectorAll('input[type="radio"]')
        input_elem.forEach(function (e) {
            e.addEventListener('mousedown', function() {
                this.isChecked=this.checked
            })
            e.addEventListener('click', function() {         
                this.checked=!this.isChecked
                clearRadio(this)
            })
        })
        
        let label_elem = el.querySelectorAll('li > label')
        label_elem.forEach(function (e) {
            let sv = e.children[0].tagName=='INPUT' ? e.children[0] : ''
            if (sv) {

                e.addEventListener('mousedown', function() {
                    sv.isChecked=sv.checked
                    
                })
                e.addEventListener('click', function() {
                    sv.checked=!sv.isChecked
                })
            }
        })

    }
})

function clearRadio(el) {
    let par_div = el.parentElement.parentElement.parentElement.parentElement.classList.contains('check') ? el.parentElement.parentElement.parentElement.parentElement: ""
    
    let oldDiv = par_div.querySelectorAll('div[class="clearRadioAll"]')
    oldDiv.forEach(function(e) {
        e.remove()
    })

    if (!el.isChecked) {
        if (par_div) {
            let newDiv = document.createElement('div')
            newDiv.innerHTML = '<div class="clearRadioAll">Очистить выбор</div>'
            par_div.append(newDiv)

            all_radio = document.querySelectorAll('input[name="'+el.name+'"')
            newDiv.addEventListener('click',function(){
                all_radio.forEach(function() {
                    el.checked = false
                })

                par_div.removeChild(newDiv)
            })
        }
    }
}

// validation

function validNext(e) {
    let goNext = true
    let panelId=document.getElementById(e.parentNode.parentNode.id)
    let allReqPage = panelId.querySelectorAll('.req')
    allReqPage.forEach(function(elem) {
        let valueName = elem.querySelector('input').name
        switch (elem.querySelector('input').type) {
            case 'radio':
                if (!document.querySelector('input[name="'+valueName+'"]:checked')) {
                    elem.querySelector('.error').classList.add('conf')
                    goNext = false
                }
                else {
                    if ((elem.querySelector('input[name="'+valueName+'"]:checked').value=='Другое') 
                    && (elem.querySelector('input[name="'+valueName+'.other_option"').value == '')) {
                        elem.querySelector('.error').classList.add('conf')
                        goNext = false
                    }
                }
                break;
            case 'text':
            case 'date':
            case 'checkbox':
                if (!document.querySelector('input[name="'+valueName).validity.valid) {
                    elem.querySelector('.error').classList.add('conf')
                    goNext = false
                }
                break
            

        }
    })

    if (goNext) {
        if (panelId.id != 'panel-4') {
            button_next(e)
        }
        else {
            return true
        }
    }
    else {
        document.querySelector('.conf').parentElement.querySelector('input').focus()
    }
}

const allReq = document.querySelectorAll('.req')
allReq.forEach(function(el) {
    let reqInp = el.querySelectorAll('input')
    reqInp.forEach(function(element) {
        element.addEventListener('change', function() {
            if (!element.validity.valid) {
                el.querySelector('.error').classList.add('conf')
            }
            else {
                el.querySelector('.error').classList.remove('conf')
            }
        })
    })
})