function formatDateTime() {
    const now = new Date();

    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const isAM = hours < 12;

    hours = hours % 12 || 12;
    const ampm = isAM ? 'AM' : 'PM';


    const dateTimeString = `${dayOfWeek}, ${month} ${dayOfMonth} ${year} ${hours}:${minutes} ${ampm}`;


    document.getElementById('datetime').innerText = dateTimeString;
}


setInterval(formatDateTime, 1000);


formatDateTime();

let sections = [];
let id = 1;
function sect(){
    saveCurrentSection();
     

    document.querySelector('#table').style='display:block';
    
   var secName = document.querySelector('#secName').value
   var sectionDetails=document.querySelector('#secDetails').value
    if(sectionDetails.length > 69){
        var shortenedWords = sectionDetails.substr(0, 69) 
        $('tbody').append(
            '<tr style="text-wrap:nowrap;">\
                <td>' + id + '</td>\
                <td>' +secName+'</td>\
                <td>' +  shortenedWords+'........' + '</td>\
                <td><div style="display:flex;gap:8px;"><h2 onclick="edit(this)" data-bs-toggle="modal" data-bs-target="#editModal" style="cursor: pointer; font-size: 0.75rem; font-weight: 500;color:#0866FF;"><img src="static/images/NotePencil.svg" alt="" style="margin-top:-0.2rem;width:0.75rem;height:0.75rem;"> Edit</h2><h2 onclick ="removeTd(this)" style="cursor: pointer;font-weight: 500;color: red;font-size:0.75rem;"><img src="static/images/Delete.svg" alt="" style="margin-top:-0.2rem;width:0.75rem;height:0.75rem;"> Delete</h2></div></td>\</tr>');
    }else{
         $('tbody').append(
            '<tr style="text-wrap:nowrap;">\
                <td>' + id + '</td>\
                <td>' + secName + '</td>\
                <td>' + sectionDetails + '</td>\
                <td><div style="display:flex;gap:8px;"><h2 onclick="edit(this)" data-bs-toggle="modal" data-bs-target="#editModal" style="cursor: pointer; font-size: 0.75rem; font-weight: 500;color:#0866FF;"><img src="static/images/NotePencil.svg" alt="" style="margin-top:-0.2rem;width:0.75rem;height:0.75rem;"> Edit</h2><h2 onclick ="removeTd(this)" style="cursor: pointer;font-weight: 500;color: red;font-size:0.75rem;"><img src="static/images/Delete.svg" alt="" style="width:0.75rem;height:0.75rem;margin-top:-0.2rem;"> Delete</h2></div></td>\
            </tr>'
        );
    }



    id++;
    clearFields();
}

function saveCurrentSection() {
    let sectionData = {
        id:id,
        businessType: document.getElementById('businessType').value,
        secName: document.getElementById('secName').value,
        secDetails: document.getElementById('secDetails').value,
        hidden: document.getElementById('hidden').checked,
        fields: []
    };

    
    document.querySelectorAll('#moreField .row').forEach(function(row) {
        let field = {
            fieldName: row.querySelector('.option-input').value,
            fieldType: row.querySelector('.myDropdown').value,
            options: [],
            fieldDescription: row.querySelector('[name^="fieldDescription"]').value,
            fieldImportance: row.querySelector('[name^="fieldImportance"]').checked
        };
        if (field.fieldType === 'list') {
            const options = $(row).find(`#addOptions${$(row).attr('id')}`);
            options.find('input.option-input').each(function() {
                const optionValue = $(this).val();
                if (optionValue) {
                    field.options.push(optionValue);
                }
            });
        }else{
            field.options = [];
        }
        sectionData.fields.push(field);
    });
   

    
    sections.push(sectionData);
}

function clearFields() {
    document.getElementById('businessType').value= ''
    document.getElementById('secName').value = '';
    document.getElementById('secDetails').value = '';
    document.getElementById('hidden').checked = false;
    document.getElementById('moreField').innerHTML = ''; 
    addField(); 
}

function submitForm() {
    // Disable the button
    document.getElementById('submitButton').disabled = true;

    // Your existing logic
    saveCurrentSection();
    console.log('Form Submitted');
    console.log(sections);
}




function dependantField(){
    alert('Please select')
}



function removeTd(element) {
    const row = $(element).closest('tr');
    const rowId = parseInt(row.find('td:first').text(), 10);

    // Remove the section from the sections array
    sections = sections.filter(section => section.id !== rowId);

    // Remove the row from the table
    row.remove();

    // Update the row IDs and re-index the sections array after a row is removed
    updateRowIds();

    // If the table is empty, hide it and reset the ID counter
    if ($('#table tbody tr').length === 0) {
        $('#table').hide();
        id = 1;
    } else {
        // Re-index the sections array with updated IDs
        sections.forEach((section, index) => {
            section.id = index + 1;
        });
        id = sections.length + 1;
    }
}

function updateRowIds() {
    $('#table tbody tr').each(function(index) {
        $(this).find('td:first').text(index + 1);
    });
}





function edit(element) {
    const row = $(element).closest('tr');
    const rowId = parseInt(row.find('td:first').text(), 10);
    const selectedSection = sections.find(section => section.id === rowId);

    // Construct the HTML for editing the section
    let fieldHtml = `
        <div class="row">
            <div class="col-12 col-md-6">
                <label for="secName" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Section Name</label>
                <input type="text" class="form-control" name="secName" id="editsecName" value="" required>
            </div>
            <div class="col-12 col-md-6">
                <label for="secDetails" class="form-label" style="font-size:0.75rem; font-weight: 500; margin-bottom: 4px;">Section Description</label>
                <textarea class="form-control" name="secDetails" id="editsecDetails" rows="3" style="background-color:white;" required></textarea>
            </div>
            <div class="col-12" style="margin-top: 12px;">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="hide" name="secName_details" id="edithidden" style="margin-top: 0.46rem;">
                    <label class="form-check-label" for="invalidCheck" style="font-size: 0.75rem; font-weight: 500;">
                        Hide section name and section description
                    </label>
                </div>
            </div>
        </div>
        <div style="display: flex; margin-top: 32px; margin-bottom: 12px; justify-content: space-between;">
            <h3 style="font-weight: 600; font-size: 0.87rem;">Fields</h3> 
            <h3 onclick="editincreaseField()" style="cursor: pointer; font-weight: 400; font-size: 0.87rem; color:#0866FF;">
                <i class="bi bi-plus-square"></i> Add more field
            </h3>
        </div>  
        <div id="editmoreField"> 
        </div> 
    `;
    
    $('#editForm').html(fieldHtml);
    $('#editsecName').val(selectedSection.secName);
    $('#editsecDetails').val(selectedSection.secDetails);
    $('#edithidden').prop('checked', selectedSection.hidden);

    const editFieldsContainer = document.getElementById('editmoreField');
    editFieldsContainer.innerHTML = '';

    selectedSection.fields.forEach((field, fieldIndex) => {
        addFieldToEditContainer(field, fieldIndex + 1);
    });

    $('#saveEdit').off('click').on('click', function() {
        selectedSection.secName = $('#editsecName').val();
        selectedSection.secDetails = $('#editsecDetails').val();
        selectedSection.hidden = $('#edithidden').is(':checked');
        selectedSection.fields = [];

        document.querySelectorAll('#editmoreField .row').forEach((row, fieldIndex) => {
            let field = {
                fieldName: row.querySelector('.editoptioninut').value,
                fieldType: row.querySelector('.editmyDropdown').value,
                options: [],
                fieldDescription: row.querySelector(`[name^="editFieldDescription"]`).value,
                fieldImportance: row.querySelector(`[name^="editFieldImportance"]`).checked
            };

            if (field.fieldType === 'list') {
                const optionsContainer = row.querySelector(`#optionsContainer${fieldIndex + 1}`);
                
                if (optionsContainer) {
                    optionsContainer.querySelectorAll('input.option-input').forEach(optionInput => {
                        const optionValue = optionInput.value.trim();
                        if (optionValue) {
                            field.options.push(optionValue);
                        }
                    });
                }
            }
            
            selectedSection.fields.push(field);
        });

        // Update the table row with the new section name and description
        row.find('td:nth-child(2)').text(selectedSection.secName);
        const shortenedWords = selectedSection.secDetails.length > 69 
            ? selectedSection.secDetails.substr(0, 69) + '........' 
            : selectedSection.secDetails;
        row.find('td:nth-child(3)').text(shortenedWords);

        $("#editModal").modal("hide");
    });
}

function editincreaseField() {
    const editFieldsContainer = document.getElementById('editmoreField');
    const fieldIndex = editFieldsContainer.querySelectorAll('.row').length + 1;

    addFieldToEditContainer({}, fieldIndex);
}

function addFieldToEditContainer(field, fieldIndex) {
    const editFieldsContainer = document.getElementById('editmoreField');

    const fieldHtml = `
        <div class="row" id="fieldRow${fieldIndex}">
            <div class="col-12 col-md-6">
                <label for="editFieldName${fieldIndex}" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Field Name</label>
                <input type="text" class="form-control editoptioninut" id="editFieldName${fieldIndex}" name="editFieldName${fieldIndex}" value="${field.fieldName || ''}" required>
            </div>
            <div class="col-12 col-md-6">
                <label for="editInputType${fieldIndex}" style="font-size: 0.75rem;font-weight: 500;margin-bottom: 4px;">Field Type <span style="color: #EC2106;">*</span></label>
                <select onchange="updateOptionsVisibility(this)" class="form-select editmyDropdown" id="editInputType${fieldIndex}" name="editInputType${fieldIndex}" required>
                    <option selected></option>
                    <option value="text" ${field.fieldType === 'text' ? 'selected' : ''}>Text</option>
                    <option value="number" ${field.fieldType === 'number' ? 'selected' : ''}>Number</option>
                    <option value="file" ${field.fieldType === 'file' ? 'selected' : ''}>File</option>
                    <option value="list" ${field.fieldType === 'list' ? 'selected' : ''}>List</option>
                </select>
            </div>
            <div class="col-12 col-md-6 options-container" id="optionsContainer${fieldIndex}" style="display: ${field.fieldType === 'list' ? 'block' : 'none'};">
                ${field.fieldType === 'list' ? `
                    <div style="display: flex; margin-top: 24px; margin-bottom: 12px; justify-content: space-between;">
                        <h3 style="font-weight: 600; font-size: 0.87rem;">Options</h3>
                        <h3 onclick="editincreaseOption(${fieldIndex})" style="cursor: pointer; font-weight: 400; font-size: 0.87rem; color: #0866FF;">
                            <i class="bi bi-plus-square"></i> Add more option
                        </h3>
                    </div>
                    <div class="form-group">
                        <label for="option${fieldIndex}_1" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">
                            Option Name <span style="color: #EC2106;">*</span>
                        </label>
                        <input type="text" class="form-control option-input" name="option${fieldIndex}_1" id="option${fieldIndex}_1" value="">
                    </div>
                ` : ''}
            </div>
            <div class="col-12" style="margin-top: 12px;">
                <label for="editFieldDescription${fieldIndex}" class="form-label" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Field Description</label>
                <textarea class="form-control" id="editFieldDescription${fieldIndex}" name="editFieldDescription${fieldIndex}" rows="3" style="background-color:white;" required>${field.fieldDescription || ''}</textarea>
            </div>
            <div class="col-5" style="margin-top: 12px;">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="editFieldImportance${fieldIndex}" value="have" id="editFieldImportance${fieldIndex}" style="margin-top: 0.46rem;" ${field.fieldImportance ? 'checked' : ''}>
                    <label class="form-check-label" for="editFieldImportance${fieldIndex}" style="font-size: 0.75rem; font-weight: 500;">Required</label>
                </div>
            </div>  
            <div class="col-5" style="visibility: visible;">
                <h2 onclick="Delete(this)" style="cursor: pointer; font-size: 0.75rem; font-weight: 500;color: red;margin-top: 0.7rem;">
                <img src="static/images/Delete.svg" alt="" style="margin-top: -0.2rem;width: 0.75rem;height: 0.75rem;"> Delete
                </h2>
            </div> 
            <hr style="margin-top: 16px; border: 0; height: 1px; background-color: #DFE0EB;"/>
        </div>
    `;
    

    editFieldsContainer.insertAdjacentHTML('beforeend', fieldHtml);
    if (field.fieldType === 'list') {
        const optionsContainer = document.getElementById(`optionsContainer${fieldIndex}`);
        let optionsHtml = `
            <div style="display: flex; margin-top: 24px; margin-bottom: 12px; justify-content: space-between;">
                <h3 style="font-weight: 600; font-size: 0.87rem;">Options</h3>
                <h3 onclick="editincreaseOption(${fieldIndex})" style="cursor: pointer; font-weight: 400; font-size: 0.87rem; color: #0866FF;">
                    <i class="bi bi-plus-square"></i> Add more option
                </h3>
            </div>
        `;

        field.options?.forEach((option, optIndex) => {
            optionsHtml += `
                <div class="form-group">
                    <label for="option${fieldIndex}_${optIndex + 1}" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">
                        Option Name <span style="color: #EC2106;">*</span>
                    </label>
                    <input type="text" class="form-control option-input" name="option${fieldIndex}_${optIndex + 1}" id="option${fieldIndex}_${optIndex + 1}" value="${option}">
                </div>
            `;
        });

        optionsContainer.innerHTML = optionsHtml;
    }
}
function updateOptionsVisibility(selectElement) {
    const fieldIndex = $(selectElement).attr('name').replace(/\D/g, '');
    const optionsContainer = document.getElementById(`optionsContainer${fieldIndex}`);
    
    if (selectElement.value === 'list') {
        optionsContainer.style.display = 'block';
        
        // Ensure that the 'Add More Option' button is available
        if (!optionsContainer.querySelector('.add-option-button')) {
            const addOptionButtonHtml = `
                <div style="display: flex; margin-top: 24px; margin-bottom: 12px; justify-content: space-between;">
                    <h3 style="font-weight: 600; font-size: 0.87rem;">Options</h3>
                    <h3 onclick="editincreaseOption(${fieldIndex})" class="add-option-button" style="cursor: pointer; font-weight: 400; font-size: 0.87rem; color: #0866FF;">
                        <i class="bi bi-plus-square"></i> Add more option
                    </h3>
                </div>
            `;
            optionsContainer.insertAdjacentHTML('afterbegin', addOptionButtonHtml);

            // Automatically add the first input box for the list option
            editincreaseOption(fieldIndex);
        }
    } else {
        optionsContainer.style.display = 'none';
    }
}


function editincreaseOption(fieldIndex) {
    const optionsContainer = document.getElementById(`optionsContainer${fieldIndex}`);
    const optionCount = optionsContainer.querySelectorAll('.option-input').length + 1;

    const optionHtml = `
        <div class="form-group">
            <label for="option${fieldIndex}_${optionCount}" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">
                Option Name <span style="color: #EC2106;">*</span>
            </label>
            <input type="text" class="form-control option-input" name="option${fieldIndex}_${optionCount}" id="option${fieldIndex}_${optionCount}" value="">
        </div>
    `;

    optionsContainer.insertAdjacentHTML('beforeend', optionHtml);
}




function updateRowIds() {
    $('#table tbody tr').each(function(index) {
        $(this).find('td:first').text(index + 1);
    });
}
let run = 1
function addDependantField(){

run++;
$('#sow').css("visibility", "visible");
$('#moreDendantField').append(`
<div class="row" id="row${run}">
    <div class="col-12 col-md-6">
        <label for="fieldName${run}" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Field Name</label>
        <input type="text" class="form-control" id="fieldName${run}" name="dependantFieldName${run}" required>
    </div>
    <div class="col-12 col-md-6">
        <label for="inputType${run}" style="font-size: 0.75rem;font-weight: 500;margin-bottom: 4px;">Field Type <span style="color: #EC2106;">*</span></label>
        <select class="form-select myDropdown" id="inputType${run}" name="dependantInputType${run}" onchange="myFunction(this)" required>
            <option selected></option>
            <option value="1">Text</option>
            <option value="2">Number</option>
            <option value="3">File</option>
            <option value="4">List</option>
        </select>
    </div>
    <div id="option" class="col-12 col-md-6"></div>
    <div class="col-12" style="margin-top: 12px;">
        <label for="fieldDescription${run}" class="form-label" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Field Description</label>
        <textarea class="form-control" name="dependantFieldDescription${run}" rows="3" style="background-color:white;" required></textarea>
    </div>
    <div class="col-5" style="margin-top: 12px;">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="required" name="dependantFieldImportance${run}" id="invalidCheck${run}" style="margin-top: 0.46rem;" required>
            <label class="form-check-label" for="invalidCheck${run}" style="font-size: 0.75rem; font-weight: 500;">Required</label>
        </div>
    </div>  
    <div class="col-5" style="visibility: visible;">
        <h2 onclick="Delete(this)" style="cursor: pointer; font-size: 0.75rem; font-weight: 500;color: red;margin-top: 0.7rem;">
                <img src="static/images/Delete.svg" alt="" style="margin-top: -0.2rem;width: 0.75rem;height: 0.75rem;"> Delete
        </h2>
    </div>
</div>    
`);

console.log("Field added, total fields: " + run);
}

function Delet(element) {
const row = $(element).closest('.row');
const fieldName = row.find('input.option-input').val();

row.remove();
$('#fieldsChosen').find(`label:contains(${fieldName})`).closest('.col-12').remove();

run--;
console.log("Field removed, total fields: " + run);
}




let optionCount = 1;
let moreCount = 1;

function increaseOption(buttonId) {
    optionCount++;
    const addOptionsId = `#addOptions${buttonId}`;

    $(addOptionsId).append(`
        <label for="option${optionCount}" style="font-size: 0.75rem; font-weight: 500; margin-top: 12px; margin-bottom: 4px;">
            Option Name <span style="color: #EC2106;">*</span>
        </label>
        <input type="text" class="form-control option-input" name="option" id="option${optionCount}" required>
    `);
}  

function myFunction(dropdown) {
    const selectedValue = dropdown.value;
    const row = $(dropdown).closest('.row');
    const optionDiv = row.find('#option');
    const buttonId = row.attr('id');

    if (selectedValue === "list") {
        optionDiv.html(`
            <div style="display: flex; margin-top: 24px; margin-bottom: 12px; justify-content: space-between;">
                <h3 style="font-weight: 600; font-size: 0.87rem;">Options</h3>
                <h3 onclick="increaseOption('${buttonId}')" style="cursor: pointer; font-weight: 400; font-size: 0.87rem; color: #0866FF;">
                    <i class="bi bi-plus-square"></i> Add more option
                </h3>
            </div>
            <div id="addOptions${buttonId}">
                <label for="option1" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">
                    Option Name <span style="color: #EC2106;">*</span>
                </label>
                <input type="text" class="form-control option-input" name="option1" id="option1">
            </div>
        `);

        // Bind change event to the newly added checkboxes
        $(document).on('change', '#invalidCheck1', function() {
            if ($(this).is(":checked")) {
                $(this).closest('.col-12').append(`
                    <div class="dependent-fields">
                        <div style="display: flex; margin-top: 32px; margin-bottom: 12px; justify-content: space-between;">
                            <h3 style="font-weight: 600; font-size: 14px;">Fields</h3>
                            <h3 onclick="addDependantField()" style="cursor: pointer; font-weight: 400; font-size: 14px; color:#0866FF;">
                                <i class="bi bi-plus-square"></i> Add more field
                            </h3>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <label for="exampleFormControlInput3" style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">Field Name</label>
                                <input type="text" name="dependantFieldName1" class="form-control" id="exampleFormControlInput3">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="inputGroupSelect03" style="font-size: 12px;font-weight: 500;margin-bottom: 4px;">Field Type <span style="color: #EC2106;">*</span></label>
                                <select class="form-select myDropdown" name="dependantFieldType1" onchange="myFunction(this)">
                                    <option selected></option>
                                    <option value="1">Text</option>
                                    <option value="2">Number</option>
                                    <option value="3">File</option>
                                    <option value="4">List</option>
                                </select>
                            </div>
                            <div id="option" class="col-12 col-md-6"></div>
                            <div class="col-12" style="margin-top: 12px;">
                                <label for="exampleFormControlTextarea1" class="form-label" style="font-size: 12px; font-weight: 500; margin-bottom: 4px;">Field Description</label>
                                <textarea class="form-control" name="dependantFieldDescription1" rows="3" style="background-color:white;"></textarea>
                            </div>
                            <div class="col-5" style="margin-top: 12px;">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="dependantFieldImportance1" value="have" id="invalidCheck" style="margin-top: 8px;">
                                    <label class="form-check-label" for="invalidCheck" style="font-size: 12px; font-weight: 500;">Required</label>
                                </div>
                            </div>  
                            <div id="sow" class="col-5" style="visibility:visible;">
                                <h2 onclick="Delet(this)" style="cursor: pointer; font-size: 12px; font-weight: 500;color: red;margin-top: 20px;">
                                    <img src="static/images/Delete.svg" width="12px" height="12px" alt="" style="margin-top: -4px;"> Delete
                                </h2>
                            </div>
                        </div>
                        <div id="moreDendantField"></div>
                    </div>
                `);
            } else {
                $(this).closest('.col-12').find('.dependent-fields').remove();
            }
        });
    } else {
        optionDiv.empty();
        optionCount = 1;
    }
}


var mo = 1;

function editaddField() {
mo++;
$('#sow').css("visibility", "visible");
$('#editmoreField').append(`
<div class="row" id="row${mo}">
    <div class="col-12 col-md-6">
        <label for="fieldName${mo}" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Field Name</label>
        <input type="text" class="form-control editoptioninut" id="editFieldName" name="fieldName${mo}">
    </div>
    <div class="col-12 col-md-6">
        <label for="inputType${mo}" style="font-size: 0.75rem;font-weight: 500;margin-bottom: 4px;">Field Type <span style="color: #EC2106;">*</span></label>
        <select class="form-select editmyDropdown" id="inputType${mo}" name="inputType${mo}" onchange="myFunction(this)">
            <option selected></option>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="file">File</option>
            <option value="list">List</option>
        </select>
    </div>
    <div id="optionsContainer${fieldIndex + 1}" class="col-12 col-md-6"></div>
    <div class="col-12" style="margin-top: 12px;">
        <label for="editfieldDescription${mo}" class="form-label" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Field Description</label>
        <textarea class="form-control" name="editFieldDescription${mo}" rows="3" style="background-color:white;"></textarea>
    </div>
    <div class="col-5" style="margin-top: 12px;">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="required" name="editFieldImportance${mo}" id="invalidCheck${mo}" style="margin-top: 0.5rem;">
            <label class="form-check-label" for="invalidCheck${mo}" style="font-size: 0.75rem; font-weight: 500;">Required</label>
        </div>
    </div>  
    <div class="col-5" style="visibility: visible;">
        <h2 onclick="Delete(this)" style="cursor: pointer; font-size: 0.75rem; font-weight: 500; color: red; margin-top: 20px;">
            <img src="static/images/Delete.svg"  alt="" style="margin-top: -4px;width:0.75rem;height:0.75rem;"> Delete
        </h2>
    </div>
</div>    
`);

}

function addField() {
    moreCount++;
    $('#sow').css("visibility", "visible");
    $('#moreField').append(`
        <div class="row" id="row${moreCount}">
            <div class="col-12 col-md-6">
                <label for="fieldName${moreCount}" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Field Name</label>
                <input type="text" class="form-control option-input" id="fieldName${moreCount}" name="fieldName${moreCount}">
            </div>
            <div class="col-12 col-md-6">
                <label for="inputType${moreCount}" style="font-size: 0.75rem;font-weight: 500;margin-bottom: 4px;">Field Type <span style="color: #EC2106;">*</span></label>
                <select class="form-select myDropdown" id="inputType${moreCount}" name="inputType${moreCount}" onchange="myFunction(this)">
                    <option selected></option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="file">File</option>
                    <option value="list">List</option>
                </select>
            </div>
            <div id="option" class="col-12 col-md-6"></div>
            <div class="col-12" style="margin-top: 12px;">
                <label for="fieldDescription${moreCount}" class="form-label" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 4px;">Field Description</label>
                <textarea class="form-control" name="fieldDescription${moreCount}" rows="3" style="background-color:white;"></textarea>
            </div>
            <div class="col-5" style="margin-top: 12px;">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="required" name="fieldImportance${moreCount}" id="invalidCheck${moreCount}" style="margin-top: 0.46rem;">
                    <label class="form-check-label" for="invalidCheck${moreCount}" style="font-size: 0.75rem; font-weight: 500;">Required</label>
                </div>
            </div>  
            <div class="col-5" style="visibility: visible;">
                <h2 onclick="Delete(this)" style="cursor: pointer; font-size: 0.75rem; font-weight: 500;color: red;margin-top: 0.7rem;">
                <img src="static/images/Delete.svg" alt="" style="margin-top: -0.2rem;width: 0.75rem;height: 0.75rem;"> Delete
                </h2>
            </div>
        </div>    
    `);

    console.log("Field added, total fields: " + moreCount);
}
function Delete(element) {
const row = $(element).closest('.row');
const fieldName = row.find('input.option-input').val();

row.remove();
$('#fieldsChosen').find(`label:contains(${fieldName})`).closest('.col-12').remove();

more--;
console.log("Field removed, total fields: " + more);
}



function preview() {
var sectionName = document.querySelector('#secName').value;
var sectionDetails = document.querySelector('#secDetails').value;
console.log(sectionDetails);
console.log(sectionName);
$('#sectionsName').text(sectionName);

if (sectionDetails) {
$('#sectionsDetails').html(`<img src="static/images/Info.svg" alt="" style="width:0.75rem;height:0.8rem;margin-top:-0.1rem">` + sectionDetails);
}

let previewContent = '';

$('#moreField .row').each(function(index) {
const fieldName = $(this).find('input.option-input').val();
const inputType = $(this).find('select.myDropdown').val();
const fieldDescription = $(this).find('textarea').val();
console.log(fieldName);

if (inputType === 'list') {
    let optionsHtml = '';
    const options = $(this).find('#addOptions' + $(this).attr('id'));
        
    options.find('input.option-input').each(function() {
        const optionValue = $(this).val();
        optionsHtml += `<option value="${optionValue}">${optionValue}</option>`;
        });
    // $(`#addOptions .option-input`).each(function(optIndex) {
    //     const optionValue = $(this).val();
    //     const isDependantChecked = $(`#invalidCheck${optIndex + 1}`).is(':checked');

    //     optionsHtml += `<option value="${optionValue}" ${isDependantChecked ? `data-dependant="true"` : ''}>${optionValue}</option>`;
    // });

    previewContent += `
        <div class="col-12 col-md-6">
            <label for="fieldName${index}" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem;">${fieldName} <span style="color: #EC2106;"> *</span></label>
            <select class="form-select myDropdown" id="fieldName${index}" onchange="handleSelectChange(this)">
                <option selected></option>
                ${optionsHtml}
            </select>
        </div>
    `;
} else if (inputType) {
    previewContent += `
        <div class="col-12 col-md-6">
            <label for="fieldName${index}" style="font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem;">${fieldName}<span style="color: #EC2106;"> *</span></label>
            <input type="${inputType}" class="form-control" id="fieldName${index}">
        </div>
    `;
}
});

$('#fieldsChosen').html(previewContent);
}


function handleSelectChange(selectElement) {
const selectedOption = selectElement.options[selectElement.selectedIndex];
const optionValue = selectedOption.value;
const isDependant = selectedOption.getAttribute('data-dependant');

if (isDependant) {
handleDependantFields(optionValue);
}
}


// function handleDependantFields(optionValue) {
// alert(`Dependent fields triggered for option: ${optionValue}`);


// }


