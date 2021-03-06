﻿/**************************************************************************
 *  02application.jsx
 *  DESCRIPTION: Инициализация рабочих областей окна приложения (всех кроме области документов)
 *  @@@BUILDINFO@@@ 09initMainWindow.jsx 1.83 Thu Aug 07 2014 00:53:56 GMT+0300
 * 
 * NOTICE: 
 * 
/**************************************************************************
 * © Вячеслав aka SlavaBuck, 07.08.2014.  slava.boyko#hotmail.com
 */

// =================== 
// Инициализация рабочих областей окна приложения

BuilderApplication.prototype.initMainWindow = function() {
    var app = this,
        w = app.window,
        CLRS = COLORSTYLES[app.options.appcolor],
        LStr = app.LStr.uiApp;
    // Настройка главного окна:
    SUI.initSeparator(w.pMain.sp, true);
    var gfx = w.graphics;
    each(CLRS, function(key) {
        gfx[key] = key.match(/foreground/i) ? gfx.newPen(_PSOLID, toRGBA(parseInt(CLRS[key])), 1) : 
                                              gfx.newBrush(_BSOLID, toRGBA(parseInt(CLRS[key])));   });
    // Формирование представлений для главного окна и контейнера документов (docView)
    app.progressBar.hit(localize(LStr[36]));
    app.buildCaption(w.pCaption);               // id:"Caption"
    app.progressBar.hit(localize(LStr[37]));
    app.buildControlsBtns(w.pMain.LeftPnl, 2);  // id:"Controls" (аргументом 2 регулируем кол-во столбцов с кнопками)
    app.progressBar.hit(localize(LStr[38]));
    app.buildTreeView(w.pMain.RightPnl);        // id:"Tree"
    app.buildDocsView(w.pMain.MainPnl);         // id:"Documents" - Общий View-контейнер для всех документов
    app.progressBar.hit(localize(LStr[39]));
    app.buildTabs(w.pBottom.pTabs);             // id:"Tab"
    app.progressBar.hit(localize(LStr[40]));
    app.buildSettingsWindow();                  // Окно для управления настройками app.settingsWindow
    app.progressBar.hit(localize(LStr[41]));
    app.buldStatusBar(w.pStatusBar);            // id:"SBar"
    // Инициализация списков (цветовых наборов, шрифтов и картинок)
    app.initControls();
};

// =================== 
// Строим заголовок
BuilderApplication.prototype.buildCaption = function(cont) {
    var app = this,
        img = app.resources.images,
        uiApp = app.LStr.uiApp,
        stl = "toolbutton",
        g = cont.add("group { alignment:['fill', 'top'], spacing:0 }");
    // Кнопки в верхней панели:
    var btNew = g.add("iconbutton { label:'new', helpTip:'"+uiApp[6]+"', enabled:true, properties:{style:'"+stl+"', toggle:false }}");
        btNew.image =  img.btNew;
    var btOpen = g.add("iconbutton { label:'open', helpTip:'"+uiApp[7]+"', enabled:true, properties:{style:'"+stl+"', toggle:false }}");
        btOpen.image =  img.btOpen;
    var btSave = g.add("iconbutton { label:'save', helpTip:'"+uiApp[9]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        btSave.image = img.btSave;
    var btSaveAs = g.add("iconbutton { label:'saveAs', helpTip:'"+uiApp[16]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        btSaveAs.image = img.btSaveAs;
    var btClose = g.add("iconbutton { label:'close', helpTip:'"+uiApp[8]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        btClose.image = img.btClose;
    var btSettings = g.add("iconbutton { label:'settings', helpTip:'"+uiApp[10]+"', enabled:true, properties:{style:'"+stl+"', toggle:false }}");
        btSettings.image = img.btSettings;
        g.addSeparator();
    var btCut = g.add("iconbutton { label:'cut', helpTip:'"+uiApp[50]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        btCut.image = img.btCut;
    var btCopy = g.add("iconbutton { label:'copy', helpTip:'"+uiApp[51]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        btCopy.image = img.btCopy;
    var btPaste = g.add("iconbutton { label:'paste', helpTip:'"+uiApp[52]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        app.btPaste = btPaste;
        btPaste.image = img.btPaste;
        g.addSeparator();
    var btEval = g.add("iconbutton { label:'eval', helpTip:'"+uiApp[14]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        btEval.image = img.btEval;
    var btCode = g.add("iconbutton { label:'code', helpTip:'"+uiApp[15]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        btCode.image = img.btCode;
    var btOpenIn = g.add("iconbutton { label:'openIn', helpTip:'"+uiApp[17]+"', enabled:false, properties:{style:'"+stl+"', toggle:false }}");
        btOpenIn.image = img.btOpenIn;
        g.addSeparator();
    var grp = g.add("group { margins:[2,0,2,0], spacing:1, alignment:['left', 'fill'], alignChildren:['left', 'center'], orientation:'column', \
                             st:StaticText { text:'"+uiApp[20]+"' }, g:Group { spacing:1 }}");
        grp.st.graphics.font = ScriptUI.newFont("dialog:8.5");
        
    app.btBOLD = grp.g.bBOLD = grp.g.add("iconbutton { label:"+_BOLD+", preferredSize:[23,23], properties:{style:'button', toggle:true }}"); // Кнопка управления BOLD
    app.btBOLD.image = img.bBOLD;
    app.btITALIC = grp.g.bITALIC = grp.g.add("iconbutton { label:"+_ITALIC+", preferredSize:[23,23], properties:{style:'button', toggle:true }}"); // Кнопка управления ITALIC
    app.btITALIC.image = img.bITALIC;
    app.fontStyle = new MVC.View("fontStyle", grp.g);
    app.views.add(app.fontStyle);
    g.addSeparator();
        // Группа управления стилем шрифта
        grp = g.add("Group {  margins:[2,0,2,0], spacing:0, alignChildren:['left', 'center'], orientation:'column',   \
                        g1:Group { spacing:2, \
                            st:StaticText {text:'"+uiApp[21]+"', characters:6},  \
                            dd:DropDownList {preferredSize:['90', '18']},  \
                            et:EditText {preferredSize:['38', '18']}},  \
                        g2:Group { spacing:2, \
                            st:StaticText {text:'"+uiApp[22]+"', characters:6},  \
                            dd:DropDownList { preferredSize:['90', '18']}, \
                            bt:IconButton {helpTip:'"+uiApp[23]+"', preferredSize:[38,20], properties:{style:'button', toggle:false }}}}");
        grp.g1.et.graphics.font = ScriptUI.newFont("dialog-bold:11");
        grp.g1.st.graphics.font = grp.g2.st.graphics.font = ScriptUI.newFont("dialog:10");
        grp.g1.dd.graphics.font = ScriptUI.newFont("dialog-bold:9");
        grp.g2.dd.graphics.font = ScriptUI.newFont("dialog-bold:8.5");
    app.btClearFont = grp.g2.bt;
    app.btClearFont.image = img.bCancel;
    app.fontName = new MVC.View("fontName", grp.g1.dd); // View для управления именем шрифта текста
    app.views.add(app.fontName); app._editors.add(app.fontName);
    app.fontSize = new MVC.View("fontSize", grp.g1.et); // View для управления размером текста
    app.views.add(app.fontSize); app._editors.add(app.fontSize);    
    app.fontColor = new MVC.View("fontColor", grp.g2.dd); // View для управления цветом текста
    app.fontColor.control.__key = 'foregroundColor';
    app.views.add(app.fontColor); app._editors.add(app.fontColor); 
    app._ceditors.add(app.fontColor);

    cont.addSeparator();
    var btInfo = cont.add("iconbutton { label:'about', helpTip:'"+uiApp[11]+"', preferredSize:[32, 32], alignment:['right', 'fill'], properties:{style:'"+stl+"', toggle:false }}");
        btInfo.image = img.btInfo;          
    
    app._enableButtons  = function() { app._setCaptionButtonsTo(true); }
    app._disableButtons = function() { app._setCaptionButtonsTo(false); }
    app._setCaptionButtonsTo = function(bEnabled) { 
        btCut.enabled = btCopy.enabled = btPaste.enabled = btClose.enabled = btSave.enabled = btSaveAs.enabled = btCode.enabled = btEval.enabled = btOpenIn.enabled = bEnabled;
    };
    // Обработка кликов по кнопкам-меню:
    cont.addEventListener(CP.CLICK, function (e) {
        if (e.target.type == 'iconbutton') {
            switch (e.target.label) {
                case "new":     app.addDocument(); app._enableButtons();         break;
                case "open":    if (app.openDocument()) app._enableButtons();    break; // возвращает activeDocument, если загрузка удачная
                case "close":   if (!app.closeDocument()) app._disableButtons(); break; // возвращает activeDocument, null - если всё закрыто.
                case "openIn":  app.openInESTK();       break;
                case "save":    app.saveDocument();     break;
                case "saveAs":  app.saveAsDocument();   break;
                case "settings":app.showSettings();     break;
                case "cut":     app.cut();              break;
                case "copy":    app.copy();             break;
                case "paste":   app.paste();            break;
                case "eval":    app.evalDialog();       break;
                case "code":    app.showCode();         break;
                case "about":   app.about();            break;
                default:
            }
        }
    });  

    // Формирование объекта View
    return app.views.add(new MVC.View("Caption", cont));
};

// ===================
// Строим дерево
BuilderApplication.prototype.buildTreeView = function(cont) {
    // Получаем локальные ссылки
    var app = this,
        img = app.resources.images,
        LStr = app.LStr;
    // Дерево контролов
    var tree = app.addView({
        id:"Tree",
        parent:cont,
        view:"treeview { alignment:['fill','fill']}",
        Init:function() { this.preferredSize[0] = 140; },
        selectItem:function(model) { // model - объект model в области видимости Document (doc.activeControl)
            var tree = this.control;
            tree.activeItem = tree.findItem (model, 'model');
            tree.selectItem(tree.activeItem); 
            tree.activeNode = (tree.activeItem.type == 'node') ? tree.activeItem : tree.activeItem.parent;
            tree.active = true;
            return tree.activeItem;
        },
        refreshItems:function(doc) { // Обновление текущего представление данными диалога текущего документа
            // Функция полного обновления дерева элементов, вызывается при смене активного документа (передаётся через doc так как вызов проис-
            // ходит из обработчика watch и до конца выполнения данной функции указатель activeDocument указывает на старое значение и обновиться 
            // он только после выхода из данной функции);
            var tree = this.control;
            tree.activeNode = tree.activeItem = null;
            tree.removeAll();
            if (!doc || doc.window.children.length == 0) return;
            //delete tree['onChange']; // временно заглушаем! 
            (function _buildTree(node, doc, cont) {
                var model = doc.findController(cont).model,
                       item = node.add("node", model.control.jsname),
                       _item = null;
                item.model = model;
                for (var i=0; i<cont.children.length; i++) {
                    if (SUI.isContainer(cont.children[i]) && !cont.children[i].isSeparator && !cont.children[i].isUnitBox) _buildTree(item, doc, cont.children[i]); else {
                        model = doc.findController(cont.children[i]).model;
                        _item = item.add("item", model.control.jsname);
                        _item.model = model;
                    }
                }
            }(tree, doc, doc.window.children[0]));
            // upd: Были проблемы с doc.activeControl!!!
            try {
            app.treeView.selectItem(doc.activeControl);
            if (tree.activeItem.type == "node") tree.activeNode = tree.activeItem; else tree.activeNode = tree.activeItem.parent;
            tree.activeNode.expanded = true;
            doc.activeContainer = tree.activeNode.model.view.control;
            } catch(e) { trace(e, "refreshItems:" ) }
        },
        addItem:function(item) { // Вызывается из doc.addItem()
            var tree = this.control, 
                type = (item.control.type == 'Container') ? "node" : "item";
            if (tree.activeNode)  tree.activeItem = tree.activeNode.add( type, item.control.jsname ); else {
                tree.activeNode = tree.activeItem = tree.add( type, item.control.jsname );
            }
            tree.activeItem.model = item;
            tree.selectItem(tree.activeItem);
            tree.active = true;
        },
        removeItem:function(item) {
            if (item && item.parent) item.parent.remove(item);
        },
        swapItems:function(parent, index1, index2) { // parent - контейнер, index1, index2 - меняемые местами элементы
            // функция будет производит перемещение активного элемента
            var tree = this.control,
                model = parent.items[index1].model;
            parent.items[index1].model = parent.items[index2].model;
            parent.items[index1].text = parent.items[index2].text;
            parent.items[index2].model = model;
            parent.items[index2].text = model.control.jsname;
        },
        copyBranch:function(src /* node */, dest /* node */) {
            var tree = this.control,
                item = null;
            dest.text = src.text;
            dest.model = src.model;
            for (var i=0, max = src.items.length; i<max; i++) {
                if (src.items[i].type == "item") {
                    item = dest.add("item", src.items[i].text);
                    item.model = src.items[i].model;
                } else {
                    this.copyBranch(src.items[i], dest.add("node", src.items[i].text));
                }
            }
        },
        control:{
            activeItem:null, // Соответствует doc.activeControl
            activeNode:null, // Соответствует doc.activeContainer
            onChanging:false,
            onChange:false,
            selectItem:function (item) { // Выделение объекта ListItem в дереве с разворачиванием всей родительской цепочки ветвей, содержащих элемент
                var node = item;
                while (node.parent) { node.parent.expanded = true; node = node.parent; } // предварительно развернём все родительские группы
                this.selection = item;
            },
            findItem:function(item, prop) {
                // Функция поиска укзанных данных в дереве. Поиск производиться по всей глубине ветвей дерева. Возвращает первый обнаруженный 
                // объект ListItem (указатель на него) либо null если соответствие отсутствует.
                // item - любой объект данных, который требуется найти в дереве; prop - свойство объекта ListItem по которому будет происходить сравнение
                // с искомым аргументом item.
                var prop = (prop)||'text',
                      cursor = this.items[0], 
                      res = null;
                res = (function _find(item, cursor, prop) {
                    var res = null; 
                    if (cursor[prop] === item) return cursor;
                    for (var i=0; i<cursor.items.length; i++) {
                        if(cursor.items[i].type == 'node') res = _find(item, cursor.items[i], prop); else {
                            if (cursor.items[i][prop] === item) res = cursor.items[i];
                        }
                        if (res) break;
                    }
                    return res;
                })(item, cursor, prop); // _find
                return res;
            }
        }
    });
    // Группа с кнопками управления контролами (под деревом элементов)
    var g = cont.add("group { margins:[1,4,1,4], spacing:5, alignment:['fill','bottom'] }" ),
        st = "button", sz = [24,24],
        hlpStr = localize (LStr.uiApp[49]),
    bt = g.add("iconbutton", undefined, img.btDel, {style:st, toggle:false});
    bt.label = "Del"; bt.alignment = ['left','bottom']; bt.helpTip = LStr.uiApp[2]; bt.preferredSize = sz;
    // группа для кнопки Reload:
    app.grpReload = g.add("group { alignment:['left','center'], bt:IconButton { label:'Reload', helpTip:'"+hlpStr+"' } }");
    app.grpReload.bt.preferredSize = sz; app.grpReload.bt.image = img.btReloadGrn;
    // кнопки Up/Down
    bt = g.add("iconbutton", undefined, img.btUp, {style:st, toggle:false});
    bt.label = "Up"; bt.alignment = ['right','bottom']; bt.helpTip = LStr.uiApp[3]; bt.preferredSize = sz;
    bt = g.add("iconbutton", undefined, img.btDown, {style:st, toggle:false});
    bt.label = "Down"; bt.alignment = ['right','bottom']; bt.helpTip = LStr.uiApp[4]; bt.preferredSize = sz;
    
    // Установка красной иконки для кнопки
    app.grpReload.setRed = function() {
        this.remove(0);
        app.getViewByID("Controls").control.enabled = false;
        app.getViewByID("Tab").control.enabled = false;
        app.getViewByID("Caption").control.enabled = false;
        var bt = this.add("iconbutton", undefined, img.btReloadRed, {style:st, toggle:false});
        bt.label = "Reload"; bt.helpTip = hlpStr; bt.preferredSize = sz;
        this.layout.layout(true);
    };
    // Установка синей иконки для кнопки
    app.grpReload.setGreen = function() { 
        this.remove(0);
        app.getViewByID("Controls").control.enabled = true;
        app.getViewByID("Tab").control.enabled = true;
        app.getViewByID("Caption").control.enabled = true;
        var bt = this.add("iconbutton", undefined, img.btReloadGrn, {style:st, toggle:false});
        bt.label = "Reload"; bt.helpTip = hlpStr; bt.preferredSize = sz;
        this.layout.layout(true);
    };

    // Обработка кликов по кнопкам:
    g.addEventListener (CP.CLICK, function (e) {
        tree.control.active = true;
        if (!app.activeDocument || e.target.type != 'iconbutton') return;
        var doc = app.activeDocument,
            index = tree.control.selection.index;
        switch (e.target.label) {
            case 'Del'   : if (doc.activeControl && doc.activeControl.view.item != "Window") { doc.removeItem(doc.activeControl); } break;
            case 'Up'    : doc.swapItems(index, index-1);  break;
            case 'Down'  : doc.swapItems(index, index+1);  break;
            case 'Reload': doc.reload();                   break;
        }
    });

    // onChange для дерева
    var handler = CC_FLAG ? "change" : "click";
    tree.control.addEventListener(handler, function (e) {
        // При клике по дереву переустнавливаются все активные указатели как в самом дереве (this.activeNode & this.activeItem), так и в документе
        // (doc.activeContainer & doc.activeControl), что также приведёт к автоматической переустановке указателя приложения app.activeControl и
        // переустановки всех полей редактирования свойств.
        var sel = this.selection,
            doc = app.activeDocument;
         if (sel) {
            this.activeItem = sel;
            if (sel.model !== doc.activeControl) doc.activeControl = sel.model;
            if (doc.activeControl.control.type == "Container") this.activeNode = this.activeItem; else this.activeNode = this.activeItem.parent;
            doc.activeContainer = this.activeNode.model.view.control;
            if (e.detail == 2) app.showModelCode(this.activeItem.model);
            //if (e.detail == 2) this.activeItem.model.getCode();
        }              
    });
    return app.treeView = tree;
};

// =================== 
// Строим панель кнопок (Добавляем кнопки исходя из содержимого controls.jsxinc -> uiControls)
BuilderApplication.prototype.buildControlsBtns = function(cont, columns) {
    // Получаем локальные ссылки
    var app = this,
        uiControls = app.uiControls,
        img = app.resources.images,
        prop, i, j, max, jmax,
        ctrls_arr = [],          // Все элементы
        grps_arr = [],           // Группы по типам элементов
        columns = (columns)||2;  // Кол-во кнопок в строке, в левой панели кнопок
    // Формируем массивы контролов и групп
    for (prop in uiControls) {
        if (uiControls.hasOwnProperty(prop)) {
            ctrls_arr.push(prop);
            if (grps_arr.toString().indexOf(uiControls[prop].type) == -1) grps_arr.push(uiControls[prop].type);
        }
    }
    var btns = {};
    // Формируем хеш из групп с массивами входящих в них контролов btns.группа.[контролы]
    for (i=0, max=grps_arr.length; i<max; i++) {
        btns[grps_arr[i]] = [];
        for (prop in uiControls)
            if (uiControls.hasOwnProperty(prop) && uiControls[prop].type == grps_arr[i] && prop != 'Window') btns[grps_arr[i]].push(uiControls[prop]);
    }
    // Добавляем контролы в Панель с группировкой по группам
    var grpRes = "group {text:'', margins:[0,0,0,0], spacing:0, alignChildren:['Left','top'], orientation:'row' }",
        grp = null, sp = null, bt = null;
    for (prop in btns) {
        if (!btns.hasOwnProperty(prop)) continue;
        sp = cont.addSeparator(false, 5); 
        SUI.initSeparator(sp.line); sp.line.visible = true;
        // в пределах группы группируем по колонкам
        for (i in btns[prop]) {
            if (! (i%columns)) grp = cont.add(grpRes);
            bt = grp.add("iconbutton", undefined,  img[btns[prop][i].icon], {style: "button", toggle:false}); 
            bt.helpTip = btns[prop][i].description;
            bt.label = btns[prop][i].label; // метка кнопки соответствует названию элемента управления
        }
    }
    // Обработка кликов по контролам:
    cont.addEventListener (CP.CLICK, function (e) {
        if (e.target.type == 'iconbutton' && app.activeDocument) app.activeDocument.addItem(e.target.label);
    });
    // Формирование объекта View
    return app.views.add(new MVC.View("Controls", cont));
};

// =================== 
// Строим панель вкладок Properties
BuilderApplication.prototype.buildTabs = function(cont) {
    // Получаем локальные ссылки
    var app = this,
        uiCategories = this.uiCategories,
        uiProperties = this.uiProperties,
        uiControls = this.uiControls,
        controllers = this.controllers,
        models = this.models,
        views = this.views,
        Lstr = this.LStr.uiApp,
        CPROPS = COLORSTYLES.CS,
        // Кол-во и имена вкладок соответствуют списку категорий в uiCategories
        prop, tabs = [], maxlength, val, tval, i, j, n, max, t, p, g, text, view, lt, type, hstr, ctrl, ch;
    var chrs = 20, mstr = (new Array(chrs+1)).join("0"); // общая длинна в символах группы полей редактирования (и подстановочная строка той же длинны)
//~     var stBtn = ScriptUI.newImage(dir + "btClear16_RO.png", undefined, dir + "btClear16.png", dir + "btClear16.png"),
//~     st = "toolbutton", sz = [22, 22];                       // Кнопка "очистка" для группы полей редактирования
    var tb = cont.add("tabbedpanel"),
        gfx = tb.graphics,
        oxy = gfx.measureString(mstr),  // Длинна символа и высота символа в точках текущим шрифтом + поправка (пока расчёт только на моноширинные шрифты)
        oy = oxy[1] + 5,    // Поправка на dropdownlist-ы (edittext-ы уже на 5 тч.)
        ps = 175,               // общая ширина для группы ввода (без подписи и кнопки)
        counts = 0, scrl,
        hgt = 4*(5+oy),
        view = null;  // дежурный view для связывания полей ввода с model
    // =============== Добавляем табы по кол-ву категорий в модели (соответствует uiCategories)
    for (prop in uiCategories) if (uiCategories.hasOwnProperty(prop)) { 
        // hit при инициализации
        app.progressBar.hit(localize(Lstr[39]) + uiCategories[prop].label);        
        // добавляем вкладку группы:
        t = tb.add("tab { text:'"+uiCategories[prop].label+"', helpTip:'"+uiCategories[prop].description+"', margins:[5,5,5,5], spacing:0, alignChildren:['Left','top'] }");
        g = t.add("group", [0, 5, 550, hgt]);
        extend (g, { margins:0, spacing:0, alignChildren:['left','top'], orientation:'row' } );  
        // упреждающий просмотр для определения самой длинной строки label в точках
        maxlength = counts = 0;  
        for (p in uiProperties) if (uiProperties.hasOwnProperty(p) && uiProperties[p].category == prop ) { maxlength = Math.max(maxlength, gfx.measureString(p)[0]); counts++ };       
        // ==== Добавляем в таб скроллируемую панель, если кол-во групп настройки больше 4 (counts*5) ======
        if (prop == "Image") {
            // Специальная обработка для Image: учитываем размер группы дополнительных настроек для скроллируемой панели:
            // 550, 110 - внешние видимые размеры панели;
            // 487, 226 - опытно определены для Additional settings panel
            // к размерам Additional settings panel прибавляем высоты одной стандартной группы image:
            scrl = SUI.addScrollablePanel(g, 0, 0, 550, 100, false, 210 + oy, 20); // oy - высота image:
            extend (scrl, { margins:[5, 0, 0, 0], spacing:0, alignChildren:['left','center'], orientation:'column' } );
        } else {
            if ((counts)*oy+counts*5 > hgt) {
                scrl = SUI.addScrollablePanel(g, 0, 0, 485, hgt-4, false, (counts)*oy+counts, 20);
                extend (scrl, { margins:[5, 0, 0, 0], spacing:0, alignChildren:['left','center'], orientation:'column' } );
            } else {
                scrl = g; scrl.orientation = 'column'; scrl.margins = [15,10,0,0];
            }
        }
        // ==== Заполняем табы ======
        for (p in uiProperties) if (uiProperties.hasOwnProperty(p) && uiProperties[p].category == prop ) {
            hstr =  uiProperties[p].description + "\n" + Lstr[0]+uiProperties[p].type + "\n" + Lstr[1] + uiProperties[p].defvalue;
            g = scrl.add("group");      // Общая группа редактирования свойства, включает подпись + группа полей ввода + чекбокс
            extend (g, { margins:0, spacing:5, alignChildren:['left','top'], orientation:'row', helpTip:hstr, label:p } );
            with (g.add("statictext { text:'"+p+":'}")) { preferredSize[0] = maxlength+5; helpTip = hstr };             // Подпись
            grp =  extend(g.add("group",[0, 0, ps, oy]), { margins:[0,0,0,0], spacing:5, alignChildren:['fill','fill'], orientation:'row' } ); // Общая группа для полей ввода
            ch = g.add("checkbox { helpTip:'"+localize(Lstr[5])+"', enabled:false }"); ch.label = p;     // Флажок "Определить";
            // Заполняем группу полями ввода:
            g = grp;
            val = uiProperties[p].value;   // Представляет объект из uiProperties.value типа '' или массив (['',''] или ['','','',''])
            tval = uiProperties[p].values; // Представляет объект из uiProperties.values типа undefined или массив предустановленных значений ['',''] или ['','','','']
            // Специальная обработка для вкладки Graphics:
            if (prop == "Graphics") {
                if (p == "font") {
                    view = this.addView({ id:p, parent:g, view:"edittext { properties:{ readonly:true } }", check:ch, control:{ helpTip:hstr, enabled:false } });
                    this._editors.add(view);
                    continue; // for (p in uiProperties)...
                } else if (CPROPS.hasOwnProperty(p)) {
                    view = this.addView({ id:p, parent:g, view:"dropdownlist", check:ch, control:{ __key:p, helpTip:hstr, enabled:false } });
                    this._editors.add(view);
                    this._ceditors.add(view);   // отдельная коллекция контролов для управления цветом
                    continue; // for (p in uiProperties)...
                }
            } // Другие графические свойства (opacity... обрабатываем стандартно:)
            // Парсинг типа значения из uiProperties[p].values и добавления соответствующих полей ввода (dropdownlist для предустановленных значений 
            // и edittext - для всех прочих). Для каждого поля ввода - создаём объекты представлений (по одному на каждое поле ввода в группе).           
            if ( tval instanceof Array) {  // Для всех свойств с предустановленными значениями добавляем dropdownlist-ы
                if ( val instanceof Array) { // свойство массив (двухмерный) и имеет предустановленные знчения
                    for (i=0, n=val.length; i<n; i ++) {
                        view = this.addView({ id:p+i, parent:g, view:"dropdownlist", check:ch, control:{ helpTip:hstr, enabled:false } });
                        view.control.add("item", ""); // Для возможности обнуления списка!
                        for (j=0, max=tval.length; j<max; j++) { view.control.add("item", tval[j]); }; // Добавляем все значения из uiProperties.values
                        view.control.selection = 0;
                        this._editors.add(view); // общий список всех контроллёров свойств (для быстрого блокирования/разблокирования)
                    } // for
                } else { // val не массив также имеет предустановленные знчения
                    view = this.addView({ id:p, parent:g, view:"dropdownlist", check:ch, control:{ helpTip:hstr, enabled:false } });
                    view.control.add("item", ""); // Для возможности обнуления списка!
                    for (j=0, max=tval.length; j<max; j++) { view.control.add("item", tval[j]); }; // Добавляем все значения из uiProperties.values
                    view.control.selection = 0;
                    this._editors.add(view); // общий список всех контроллёров свойств (для быстрого блокирования/разблокирования)
                } // else
            } else { // tval не массив (предустановленных значений нет)
                if (val instanceof Array) { // свойство - массив без предустановленных значений
                    for (i=0, max=val.length; i<max; i++) {
                        view = (p in {'bounds':0, 'frameLocation':0, 'image':0}) ? 
                                this.addView({ id:p+i, parent:g, view:"edittext { properties:{ readonly:true } }", check:ch, control:{ helpTip:hstr, enabled:false } }) :
                                this.addView({ id:p+i, parent:g, view:"edittext", check:ch, control:{ helpTip:hstr, enabled:false } });
                        this._editors.add(view);
                        if (p == 'image') this._ieditors.add(view); // отдельная коллекция контролов для отображения имён картинок
                    }
                    // дополнительно для image добавляем панель Additional settings (view:imageSettings)
                    if (p == 'image') {
                        g.size = [430, oy+2];
                        g.ddImage = g.add("dropdownlist {preferredSize:['140', 23], enabled:false}");
                        app._initImageFields(g.ddImage);
                        // app.btImage инициализирцется в _initImageListView();
                        app.btImage = g.btImage = g.add("button {text:'Image...', helpTip:'"+Lstr[34]+"', enabled:false }");
                        g.parent.parent.orientation = 'column';
                        view = app.buildImageSettings(g.parent.parent.add("group { preferredSize:[500,200] }")); // создание view:imageSettings
                        // получаем подгруппу с дополнительными полями настройки Image
                        view.control.text += view.control.helpTip = ' (not implemented in this version)';
                        view.control.enabled = false;
                        //this._editors.add(view);
                    }
                } else { // свойство - значение без предустановленных значений
                    var viewEdit = "edittext { characters:18, properties:{ readonly:true } }",
                        btView = "button { text:'...', enabled:false, preferredSize:["+24+","+oy+"], alignment:'right', helpTip:'"+Lstr[27]+"' }";
                    if (p == 'items' ) {
                        view = this.addView({ id:p, parent:g, view:viewEdit, check:ch, control:{helpTip:hstr, enabled:false} });
                        app.btList = g.add(btView); 
                        app.btList.bname = 'btList';
                    } else if (p == 'columnWidths') {
                        view = this.addView({ id:p, parent:g, view:viewEdit, check:ch, control:{helpTip:hstr, enabled:false} });
                        app.btListCW = g.add(btView);
                        app.btListCW.bname = 'btListCW';                        
                    } else if (p == 'columnTitles') {
                        view = this.addView({ id:p, parent:g, view:viewEdit, check:ch, control:{helpTip:hstr, enabled:false} });
                        app.btListCT = g.add(btView);
                        app.btListCT.bname = 'btListCT';  
                    } else {
                        view = this.addView({ id:p, parent:g, view:"edittext", check:ch, control:{ helpTip:hstr, enabled:false } });
                    }
                    this._editors.add(view);
                }
            }
            //g.enabled = false; // По умолчанию все недоступно - будем включать в зависимости от добавляемого элемента
        } // for (p in uiCategories[prop])
    } // for (prop in uiCategories)  - Конец добавления табов
    p = app._getField('alignment0').control; p.remove('top'); p.remove('bottom');
    p = app._getField('alignment1').control; p.remove('left'); p.remove('right');
    p = app._getField('alignChildren0').control; p.remove('top'); p.remove('bottom');
    p = app._getField('alignChildren1').control; p.remove('left'); p.remove('right');    
    
    // Обработка чекбокса (установленный значок означает добавлять свойство в элемент при формировании диалога, снятый - игнорировать)
    tb.addEventListener ("click", function (e) {
            var model = app.activeControl;
            if (e.target.type == 'checkbox') { // && model && model.hasOwnProperty('control')) {
                var check = e.target, 
                       val = !check.value, // нужно, так как обработчик onClick вызывается до смены значения
                       label = check.label, // имя свойства управляемое данным чекбоксом (определяется на этапе добавления самого чекбокса)
                       //control = model.view.control,
                       control = model.control.properties,
                       prop = model.properties,
                       model_obj = model.control.properties;
            // Вносим метку в описательной части модели 
            if (!control.hasOwnProperty(label)) {
                if (!control.properties.hasOwnProperty(label)) {
                    if (!control.graphics.hasOwnProperty(label)) return; else { prop.graphics[label] = val; model_obj = model_obj.graphics; }
                } else { prop.properties[label] = val; model_obj = model_obj.properties; }
            } else { prop[label] = val; }
            // Красим текст в полях редактирования
            //for (var i=0, cont = check.parent.children[1].children, gfx = cont[i].graphics, S_CLR = gfx.PenType.SOLID_COLOR; i<cont.length; gfx = cont[i++].graphics) {
            for (var i=0, cont = check.parent.children[1].children, gfx = cont[i].graphics, S_CLR = gfx.PenType.SOLID_COLOR; i<cont.length; i++) {
                gfx = cont[i].graphics;
                gfx.foregroundColor = (val === true ? gfx.newPen(S_CLR, [0,0,0], 1) : gfx.newPen(S_CLR, toRGBA(app.options.disabledForegroundColor), 1));
                // При отжатом checkbox-е всё вырубается и наоборот:
                // TODO: пересмотреть перекрашивание в updateTabs...
                if ("button, dropdownlist".indexOf(cont[i].type) != -1) cont[i].enabled = val;
            }
        }
    });
    
    // Формирование объекта View
    return app.views.add(MVC.View("Tab", tb));
};

// =================== 
// строим родительский View документов
BuilderApplication.prototype.buildDocsView = function(cont) {
    var app = this,
        LStr = app.LStr;
    // Родительский View для документов основан на TabbedPanel, каждый Tab которого будет представлять родительский View самого документа
    var docView = app.addView({ id:"Documents", parent:cont, view:"tabbedpanel { alignment:['fill','fill'] }" });
    var gfx = docView.control.graphics,
        doccolor = toRGBA(parseInt(DOCVIEWCOLOR[app.options.doccolors]));
    gfx.backgroundColor = gfx.disabledBackgroundColor = gfx.newBrush(_BSOLID, doccolor);
    
    // Панелька содержащая подпись 'Имя элемента' и поле редактирования JsName
    var pPnl = cont.add("group { margins:[5,1,5,1], spacing:5, alignChildren:'left', alignment:['fill','bottom'], st:StaticText {text:'"+LStr.uiApp[12]+"'} }");
    // Собственно само поле редактирования JsName
    app.JsName = app.addView({ id:"JsName", parent:pPnl, view:"edittext { enabled:false, alignment:['fill','bottom'] }" });
    
    // Обеспечивает  в реальном времени обновление текста в дереве при редактировании имени переменной в поле JsName
    app.JsName.control.addEventListener("keyup", function (kb) { // под СС ??
        app.treeView.control.activeItem.text = this.text;
    });

    return app.JsName; // возвращаем родительский View документов
};
// =================== 
// строим панель для редактирования изображений
BuilderApplication.prototype.buildImageSettings = function(cont) {
    var app = this,
        LStr = app.LStr.uiApp,
        states = ['normal', 'disabled', 'pressed', 'rollower'],
        grpView = "group { stName:StaticText {text:'normal:', characters:8}," +
                            "etName:EditText {characters:20, properties:{readonly:true}}," +
                            "ddImage:DropDownList {preferredSize:['140', 23]}," +
                            "btImage:Button {text:'Image...'}," +
                            "ch:Checkbox { enabled:false }}";
    var parent = cont.add("panel { text:'"+localize(LStr[33])+"', alignChildren:['left', 'center'], orientation:'column', margins:[10, 15, 10, 5], spacing:1 }");
    // Группы для добавления картинок
    each(states, function(val, index, arr){
        var grp = parent.add(grpView);
        grp.stName.text = val + ":";
        app._initImageFields(grp.ddImage);
        // Добавляем управляющие вьюхи в коллекции
        var view = new MVC.View({id:val+"Image", control:grp.etName });
        app.views.add(view);
        app._editors.add(view);
        app._ieditors.add(view);
        
    });

    // Группа настроек опций включения
    var helpTip1 = localize(LStr[28]),
        helpTip2 = localize(LStr[29]),
        txtGrp = localize(LStr[30]),
        txtchToString = localize(LStr[31]),
        txtchFixSize = localize(LStr[32]);
    var grpViewOpt = "panel {text:'"+txtGrp+"', orientation:'row', alignment:['fill', 'center'], margins:[15, 10, 15, 5]," +
						"g0:Group {alignment:['left', 'center'], preferredSize:['100', '40']}," +
						"g1:Group {orientation:'column', alignChildren:['left', 'top'], spacing:5," +
							"ch0:Checkbox {text:'"+txtchToString+"', helpTip:'"+helpTip1+"'}," +
								"g3:Group {alignment:['fill', 'top'], alignChildren:['left', 'center'], spacing:5," +
									"ch1:Checkbox {text:'"+txtchFixSize+"', helpTip:'"+helpTip2+"'}," +
									"et0:EditText {characters:6} }}}";
    parent.imageSettings = parent.add(grpViewOpt);
    var view = new MVC.View("imageSettings", parent);
    app.views.add(view);
    // суммарный размер панели для 1.20 (build 0601) 487,199 px
    return view;
}

// =================== 
// Строим StatusBar
BuilderApplication.prototype.buldStatusBar = function(cont) {
    var app = this,
          LStr = app.LStr.uiApp;
    var g = cont.add("group { alignment:['fill','bottom'], spacing:5 }" );
    var st = g.add("statictext { text:'© Slava Boyko aka SlavaBuck | 2013-2014 | slava.boyko@hotmail.com', alignment:['left','center'] }");
    st.graphics.foregroundColor = st.graphics.newPen(_PSOLID, toRGBA(CC_FLAG ? COLORS.LightSteelBlue : COLORS.DarkBlue), 1);
    cont.addSeparator();
    var btClose = cont.add("button { text:'"+LStr[18]+"', alignment:['right','center'] }");
    
    btClose.onClick = function() { app.window.close(); }
    // Формирование объекта View
    return this.views.add(new MVC.View("SBar", g));
};

// =================== 
// Строим окно About
BuilderApplication.prototype.about = function() {
    var app = this,
        img = app.resources.images;
    //var w = new Window ("palette { preferredSize:[640,480], alignChildren:'stack', margins:0, properties:{ borderless: true } }"); //, properties:{ borderless: true } }");
    var sz1 = [80, 300],                // картинка
        sz2 = [370, sz1[1]-140];   // текст с описанием
    var w = new Window ("dialog { margins:0, properties:{ borderless: true }, \
                                           pPnl:Panel { margins:[0,0,1,1], orientation:'row', \
                                                gImg:Group { preferredSize:["+sz1[0]+","+sz1[1]+"], \
                                                    gPic:Group { preferredSize:["+(sz1[0]-36)+","+68+"], margins:[0,6,0,6], spacing:1, alignment:['center', 'top'], alignChildren:['center', 'bottom'], orientation:'column' } }, \
                                                gMain:Group { margins:10, spacing:10, orientation:'column', \
                                                    gCaption:Group { orientation:'row', margins:[0,0,0,0], spacing:4, alignment:['fill', 'fill'], alignChildren:['left','bottom'] }, \
                                                    sp1:"+SUI.Separator + ", \
                                                    about:Group { margins:0, spacing:2, orientation:'column' },\
                                                    sp2:"+SUI.Separator + ", \
                                                    btOk:Button { alignment:['right','bottom'], text:'Ok' } \
                                                } } }");
       var lic = { 
           // Creative Commons Attribution-NonCommercial-ShareAlike 3.0 - http://creativecommons.org/licenses/by-nc-sa/3.0/
           ru:"РАЗРЕШЕНО СВОБОДНОЕ ИСПОЛЬЗОВАНИЕ ПРОИЗВЕДЕНИЯ, ПРИ УСЛОВИИ УКАЗАНИЯ ЕГО АВТОРА, НО ТОЛЬКО В НЕКОММЕРЧЕСКИХ ЦЕЛЯХ. ТАКЖЕ ВСЕ ПРОИЗВОДНЫЕ ПРОИЗВЕДЕНИЯ, ДОЛЖНЫ РАСПРОСТРАНЯТЬСЯ ПОД ЛИЦЕНЗИЕЙ CC BY-NC-SA.", 
           en:"THE WORK (AS DEFINED BELOW) IS PROVIDED UNDER THE TERMS OF THIS CREATIVE COMMONS PUBLIC LICENSE (''CCPL'' OR ''LICENSE''). THE WORK IS PROTECTED BY COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED." 
       };
       var cpt =  " (© SlavaBuck, 2013-2014)\r";
       var libs =  MVC.name+ " v" + MVC.version + cpt +
                        MVC.DOM.name + " v" +MVC.DOM.version + cpt +
                        Collection.libname + " v" + Collection.libversion + cpt +
                        SUI.name + " v" +SUI.version + cpt +
                        PNGLib.name +" v"+PNGLib.version+" (© SlavaBuck, 2013-2014 - based on Marc Autret's and David Jones works)\r\r";
       var tittle = "Dialog Builder ver "+ app.version + " (ScriptUI 6.1.8)\r";
       var msg = { 
                    ru: tittle +
                        "Конструктор диалоговых окон для Adobe ESTK СS...\r\r" +
                        "Клавиатурные сокращения:\r" +
                        "------------------------\r"+
                        "Ctr + N: Новый документ\r" +
                        "Ctr + O: Открыть документ\r" +
                        "Ctr + W: Закрыть документ\r" +
                        "Ctr + S: Сохранить документ\r" +
                        "Ctr + K: Открыть настройки\r" +
                        "Ctr + X: Вырезать\r" +
                        "Ctr + C: Скопировать\r" +
                        "Ctr + V: Вставить\r" +
                        "Ctr + R: Выполнить\r" +
                        "Ctr + D: Показать код диалога\r" +
                        "Ctr + H: О программе...\r" +
                        "Ctr + Shift + S: Сохранить как...\r" +
                        "Ctr + Shift + E: Открыть jsx-файл в редакторе...\r\r" +
                        "Лицензионное соглашение Creative Commons:\rCC Attribution Non-Commercial ShareAlike (CC BY-NC-SA).\r\r" + 
                        lic.ru + "\rhttp://creativecommons.org/licenses/by-nc-sa/3.0/)" +
                        "\r\rБиблиотеки:\r" + libs + "© Slava Boyko aka SlavaBuck | 2013-2014 | slava.boyko@hotmail.com",
                    en: tittle +
                        "Designer of dialog boxes for Adobe ESTK CS...\r\r" +
                        "Keyboard shortcuts:\r" +
                        "------------------------\r"+
                        "Ctr + N: New document\r" +
                        "Ctr + O: Open document\r" +
                        "Ctr + W: Close document\r" +
                        "Ctr + S: Save document\r" +
                        "Ctr + K: Open settings\r" +
                        "Ctr + X: Cut\r" +
                        "Ctr + C: Copy\r" +
                        "Ctr + V: Paste\r" +
                        "Ctr + R: Eval dialog\r" +
                        "Ctr + D: Show code of dialog\r" +
                        "Ctr + H: About...\r" +
                        "Ctr + Shift + S: Save as...\r" +
                        "Ctr + Shift + E: Open jsx-file in editor...\r\r" +
                        "Creative Commons License agriment:\rCC Attribution Non-Commercial ShareAlike (CC BY-NC-SA).\r\r" + 
                        lic.en + "\rhttp://creativecommons.org/licenses/by-nc-sa/3.0/" +
                        "\r\rLibraries used:\r" + libs + "© Slava Boyko aka SlavaBuck | 2013-2014 | slava.boyko@hotmail.com"
    };
    //w.pPnl.img.add("image",undefined, dir + "About2.png");
    //w.pPnl.gImg.image = img.pAbout;
    var gfx = w.graphics;
    gfx.backgroundColor = gfx.newBrush(_BSOLID, toRGBA(COLORSTYLES.CS.backgroundColor));
    gfx = w.pPnl.gImg.graphics;
    gfx.backgroundColor =  gfx.newBrush(_BSOLID, [0.3843, 0.2039, 0.2235, 1]);
    gfx = w.pPnl.gImg.gPic.graphics;
    gfx.backgroundColor =  gfx.newBrush(_BSOLID, [1, 0, 0, 1]);
    var txt0 = w.pPnl.gImg.gPic.add("statictext { alignment:['center','top'] text:'S c r i p t U I'}");
    var txt1 = w.pPnl.gImg.gPic.add("statictext { text:'Dialog'}");
    var txt2 = w.pPnl.gImg.gPic.add("statictext { text:'Builder'}");
    txt0.graphics.font = ScriptUI.newFont ("Arial", "Bold", 7);
    txt1.graphics.font = ScriptUI.newFont ("Verdana", "Bold", 10);
    txt2.graphics.font = ScriptUI.newFont ("Verdana", "Bold", 9.5);
    txt0.graphics.foregroundColor = txt1.graphics.foregroundColor = txt2.graphics.foregroundColor = txt2.graphics.newPen (_PSOLID, [1, 1, 1, 1], 1);
    // Текст справа
    txt1 = w.pPnl.gMain.gCaption.add("statictext { text:'"+app.name+"'}");
    txt2 = w.pPnl.gMain.gCaption.add("statictext { text:'v"+app.version+"', alignment:['left','top']}");
    txt1.graphics.font = ScriptUI.newFont ("Helvetica", "Bold", 20);
    txt1.graphics.foregroundColor = txt1.graphics.newPen (_PSOLID, toRGBA(COLORS.Black), 1);
    txt2.graphics.font = ScriptUI.newFont ("Verdana", "Bold", 14); 
    txt2.graphics.foregroundColor = txt2.graphics.newPen (_PSOLID, toRGBA(COLORS.SlateGray), 1);
    w.pPnl.gMain.btOk.onClick = function() { w.close(); }
    var c = 0.1,
    txt = w.pPnl.gMain.about.add("statictext { preferredSize:["+sz2[0]+","+sz2[1]+"], properties:{ multiline:true, scrolling:true } }");
    txt.text = localize(msg); 
    txt.graphics.foregroundColor = w.graphics.newPen (_PSOLID, [c,c,c,1], 1);
    
    var wlink = w.pPnl.gMain.about.addWebLink("http://slavabuck.wordpress.com/").alignment = ['left','bottom'];
    SUI.initSeparator(w.pPnl.gMain.sp1);
    SUI.initSeparator(w.pPnl.gMain.sp2);
    
    w.show();
};

// Вспомогательная функция для быстрого получения полей редактирования свойств
BuilderApplication.prototype._getField = function(id) {
    return this._editors.getFirstByKeyValue('id', id);
};
