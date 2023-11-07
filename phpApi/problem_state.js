
//скачивает все заявки
const api = new Api(getCookie('token'));
Window.onLoad = onLoad();

let problems;
let attachmentsProblemStatment= new Attachments();



function onLoad()
{  
    let count;
    let mode;
    try { 
     count = localStorage.getItem("countTask");
    document.getElementById("selectrCount").value = count;
    } catch (error) {
        
    }
    try
    {
      
        mode = localStorage.getItem("modeFilter");
        document.getElementById("selectFilter").value =  mode;
       
    }
    catch
    {
         count = "";
    }
  
   console.log(modul);
    if (modul == "problem_statements")
    {
        load_requests( count,"rights");
        loadStatistics();
    }
    else
    {
       
        load_requests(count);
        load_themes();
        load_unit();
    }
}

function  WorkWithGet()
{
 peer_id = findGetParameter("peer_id");
 text = findGetParameter("text");
 attachment = findGetParameter("attachment");
if(!department)
{

}

  
}

function uploadFile()
{
    var file = document.getElementById("filea");
    var FilesPanel = document.getElementById("FilesDock");
    var files = file.files;
    for (var i = 0; i < files.length; i++)
    {
        var upload_file = files[i];
        files;
        const form = new FormData();
        form.append("userfile", upload_file);
        var xhr = new XMLHttpRequest();
        xhr.open("post", "api/upload.php",false);
        xhr.upload.onprogress = function(event)
        {
            console.log('Загружено на сервер ' + event.loaded + ' байт из ' + event.total);
        }
        xhr.upload.onload = function()
        {
            console.log('Данные полностью загружены на сервер!');
        }
        xhr.upload.onerror = function()
            {
                console.log('Произошла ошибка при загрузке данных на сервер!');
            }
            //
        xhr.onreadystatechange = function()
        {
            if (this.readyState != 4) return;
            console.log(this.status);
            if (this.status==200)
            {
                if (this.responseText != "error")
                {
                    console.log(JSON.parse(this.responseText));
                    Jfile = JSON.parse(this.responseText).data[0];
                    console.log(Jfile);
                    attachmentsProblemStatment.addFile(Jfile.name, Jfile.src);
                    fileDiv = document.createElement("div");
                    fileDiv.innerHTML = Jfile.name + " загружен";
                    FilesPanel.appendChild(fileDiv);
                }
                else
                {
                    alert("При загрузке файлов произошла ошибка");
                }
            }
        }
        xhr.send(form);
    };
  
}


var themes;
async function load_themes()
{
data =  sessionStorage.getItem("themes");
if(data==null)
{ 

    themes = api.ProblemStatements.getThemes();
    sessionStorage.setItem("themes",JSON.stringify(themes));
}
else
{
    themes =  JSON.parse(data);
}
   
    selth = document.getElementById("themes");
    themes.forEach(element =>
    {
        option = document.createElement("option");
        option.value = element.id;
        option.innerText = element.title;
        selth.appendChild(option);
    });
    $(document).ready(function()
    {
        $('select').select2(
        {
            minimumResultsForSearch: -1
        });
        $('#themes').select2(
        {
            maximumSelectionLength: 2,
            language: "ru",
            allowClear: true,
            escapeMarkup: function(markup)
            {
                return markup;
            },
            placeholder: "Выберите тему обращения",
            tags: true,
            createTag: function(params)
            {
                return {
                    id: params.term,
                    text: params.term,
                    newOption: true
                }
            }
        });
    });
}

function GetSelectedThemes(id)
{
    department = document.getElementById("toDepartment");
    unitIn = document.getElementsByName("title")[0];
    try
    {
        actualThemes = themes.find(themes => themes.id === id);
        department.style.display = "none";
        $("[name='department']").val(actualThemes.department);
        $("[name='department']").trigger('change');
        unitIn.value = actualThemes.title;
    }
    catch
    {
        department.style.display = "block";
        unitIn.value = id;
    }
}
//Загрузка информации об отделе пользователя
async function load_unit()
{
   
    unit = GetUnit(0);
    contacts = document.getElementById("contacts");
    //имя отдела
    if(unit.name){
    unitIn = document.getElementById("unitLabel");
    unitP = document.getElementById("unit");
    unitP.style = "display:block;"; 
    unitIn.innerText = unit.name;
    }
    //кабинет
    unitIn = document.getElementsByName("classroom")[0];
    unitIn.value = unit.classroom ;
    //корпус
    unitIn = document.getElementsByName("building")[0];
    unitIn.value = unit.building;
    let text = "";
    // if(unit.email)
    // {
    // attachmentsProblemStatment.addContact(unit.email);
    // text +=(unit.email)+" ";
    // }
    if(unit.phone)
    {
    attachmentsProblemStatment.addContact(unit.phone);
    text +=(unit.phone)+" ";
    }
    if(unit.mobile)
    {
    attachmentsProblemStatment.addContact(unit.mobile);
    text +=(unit.mobile)+" ";
    }
    if((unit.email)||(unit.phone)||(unit.mobile))
    contacts.innerHTML ="<b>Информация вашего отдела :</b> "+text;
 
}

//Фильтр и сортировка списка заявок
async function filter(mode = null)
{
    clear();
    if (mode == null)
    {
        try
        {
            mode = localStorage.getItem("modeFilter");
            document.getElementById("selectFilter").value = mode;
        }
        catch
        {
            mode = "";
        }
    }
    else
    {
        localStorage.setItem("modeFilter", mode);
    }
    switch (mode)
    {
        //фильтр с начала не принятыми 
        case "status":
            request.sort(function(a, b)
            {
                return b.id - a.id
            })
            request.sort(function(a, b)
            {
                return a.status - b.status;
            })
            request.forEach(element =>
            {
                addItem(element)
            });
            break;
        case "statusReadyFirst":
            var data = request.filter((r) => r.status == "2");
            data.forEach(element =>
            {
                addItem(element)
            });
            break;
        case "statusCancelFirst":
            var data = request.filter((r) => r.status == "3");
            data.forEach(element =>
            {
                addItem(element)
            });
            break;
        case "statusInProcessFirst":
            var data = request.filter((r) => r.status == "1");
            data.forEach(element =>
            {
                addItem(element)
            });
            break;
        case "statusDeniedFirst":
            var data = request.filter((r) => r.status == "4");
            data.forEach(element =>
            {
                addItem(element)
            });
            break;
        case "statusSendingFirst":
            var data = request.filter((r) => r.status == "0");
            data.forEach(element =>
            {
                addItem(element)
            });
            break;
        case "dateUp":
            request.sort(function(a, b)
            {
                return b.id - a.id
            });
            request.forEach(element =>
            {
                addItem(element)
            });
            break;
        case "dateDown":
            request.sort(function(a, b)
            {
                return a.id - b.id
            });
            request.forEach(element =>
            {
                addItem(element)
            });
            break;
        default:
            request.sort(function(a, b)
            {
                return b.id - a.id
            });
            request.forEach(element =>
            {
                addItem(element)
            });
            break;
    }
}

//Получение списка заявок 
var request;
async function load_requests(count,id)
{ 
 
    request = api.ProblemStatements.get(count,id);
    filter();
}
//парсит куки
function getCookie(name)
{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

//Показывает окно Завершения/Отказа
function showDeniedWin(id,type)
{ 
  (document.querySelector(".deny")).style.display = "block";
document.querySelector(".denyWin").style.display = "block";
document.querySelector(".denyWin textarea").value = "";
sessionStorage.setItem("id", id);
  switch(type)
  {
    case"ready":
    document.getElementById("acessBTN").setAttribute("onclick","EditStatus("+id+",'ready')");
    break;
    case"deny":
    document.getElementById("acessBTN").setAttribute("onclick","EditStatus("+id+",'denied')");
    break;
  }
   
}

//Скрывает окно Завершения/Отказа
function closeDenyWin()
{
    (document.querySelector(".deny")).style.display = "none";
    document.querySelector(".denyWin").style.display = "none";
}

//Изменяет статус заявки
async function EditStatus(idR, status)
{
   closeDenyWin();
   await uploadFile();
    if (status == "denied")
    {
        
        idR = sessionStorage.getItem("id");
        api.ProblemStatements.updateStatus(idR, status, document.querySelector(".denyWin textarea").value,attachmentsProblemStatment.json);
    }
    else if(status == "ready")
    {
         idR = sessionStorage.getItem("id");
      api.ProblemStatements.updateStatus(idR, "up", document.querySelector(".denyWin textarea").value,attachmentsProblemStatment.json);
    }
    else
    {
        api.ProblemStatements.updateStatus(idR, status);
    }
   

    const count =  localStorage.getItem("countTask");
    if (modul == "problem_statements")
        load_requests(count,"rights");
        else
        load_requests(count);
  
}

//создает обьект заявки и добавляет  на страницу
function addItem(i)
{
    var item = document.createElement('div'); // is a node
    var DocSupp = document.getElementById("support_requests");
    item.innerHTML = createItemRequest(i);
    DocSupp.appendChild(item);
}

//Очищает список заявок
function clear(i)
{
    var DocSupp = document.getElementById("support_requests");
    DocSupp.innerHTML = " ";
}

//
function GetSelect(Val)
{
    var formWeb = document.getElementById("FromWebSupport");
    var formOther = document.getElementById("FormOtheSupport");
    if (Val == "WEBSITE")
    {
        formWeb.style.display = "block";
        formOther.style.display = "none";
    }
    else
    {
        formWeb.style.display = "none";
        formOther.style.display = "block";
    }
}

//отправляет заявку
function send_form()
{
    title = document.getElementsByName("title")[0].value;
    text = document.getElementsByName("text")[0].value;
    department = document.getElementsByName("department")[0].value;
    classRoom = document.getElementsByName("classroom")[0].value;
    building = document.getElementsByName("building")[0].value;
    unit = document.getElementsByName("unit")[0].value;
    url = document.getElementsByName("url")[0].value;
    if(document.getElementsByName("contact")[0].value)
    {
        attachmentsProblemStatment.addContact(document.getElementsByName("contact")[0].value);
    }
  
    new Promise((resolve, reject) => {
    uploadFile();
    });
    try{
        api.ProblemStatements.new(title, text, department, classRoom, building, unit, url,attachmentsProblemStatment.json);
    }
    catch
    {

    }
   
    attachmentsProblemStatment = new Attachments();
    window.location.reload();
}

function showAndHideStatistics()
{
    statistics = document.getElementById("statistics");
    if (statistics.style.display == "none")
    {
        statistics.style.display = "block";
    }
    else
    {
        statistics.style.display = "none";
    }
}

//статистика 
function loadStatistics(date = null)
{
    monthUI = document.getElementById("month");
    if (date == null)
    {
        date = new Date();
        monthUI.valueAsDate = date;
    }
    month = date.getMonth();
  
    s = api.ProblemStatements.getStatics(month)[0];
    document.getElementById("departmentName").innerText = s.department;
    document.getElementById("S_All").innerText = s.all;
    document.getElementById("S_Completed").innerText = s.completed;
    document.getElementById("S_InTheProcess").innerText = s.inTheProcess;
    document.getElementById("S_Denied").innerText = s.denied;
    document.getElementById("S_Canceled").innerText = s.canceled;
    document.getElementById("S_Sent").innerText = s.sent;
}

//открывает чат по peer_id 
function OpenChat(peer_id,req_id)
{
    var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
    var URL =  "/modules.php?name=msg&peer_id="+peer_id;
    if(req_id)
    {
        var att = new Attachments();
        att.addSupReq(req_id);
        URL +=  "&attachment="+att.json;
    }
    window.open(URL);
}

//Открывает страницу скачивания статистики
function GetFileStatistics()
{
    monthUI = document.getElementById("month");

    date = monthUI.valueAsDate;
    month = date.getMonth();
    token = api.ProblemStatements.token;
    window.open("/api/unloading/statistics.php?token=" + token + "&month=" + month);
}

function editCount(val)
{
   
        localStorage.setItem("countTask", val);

    if (modul == "problem_statements")
        load_requests(val,"rights");
        else
        load_requests(val);
    
}
