# ExtendScript DialogBuilder
***Status:*** *В разработке...* | ***Version:*** *1.20* | ***Last update:*** *25.05.2014*

Дизанер и конструктор диалоговых окон для **Adobe ExtendScript© & InDesign©**, написан на чистом **JavaScript** (**ExtendScript**).

![src/doc/DBuilder_tutorial.png](src/doc/DBuilder_tutorial.png)

### Установка
**DialogBuilder** базируется на библиотеках **ExtendScript**, представленных в отдельном [репозитарии](https://github.com/SlavaBuck/Includes). В данном репозитарии содержиться две папки ***./contrib*** и ***./src***. Последняя скомпилированная рабочая версия находится в папке ***./contrib***. Для использования программы достаточно поместить данную папку в папку со скриптами **InDesign** и с палитры скриптов запустить файл *DBuilder.jsx*:

[![Установка и работа с DialogBuilder](https://i1.ytimg.com/vi/i6P0OuBvmqI/3.jpg?time=1401041885690)](http://youtu.be/i6P0OuBvmqI)

Для работы с исходниками необходимо дополнительно скачать библиотеки и в файле *./src/02application.jsx* прописать к ним путь:

```js
/* *************************************************************************
 *  02application.jsx
 *  DESCRIPTION: BuilderApplication: Основной класс приложения 
 *  @@@BUILDINFO@@@ 02application.jsx 1.20 Sun May 25 2014 19:23:11 GMT+0300
 * 
 * NOTICE: 
 * 
/* *************************************************************************
 * © Вячеслав aka SlavaBuck, 10.02.2014.  slava.boyko#hotmail.com
 */

// #includepath нужно настроить на папку с библиотеками
#includepath "../../Include/"
```


----------------------------------
**Copyright:** © Вячеслав aka Buck, 2014. <slava.boyko@hotmail.com>

**License:** [Creative Commons Attribution-NonCommercial-ShareAlike 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/)

**РУС:** РАЗРЕШЕНО СВОБОДНОЕ ИСПОЛЬЗОВАНИЕ ПРОИЗВЕДЕНИЯ, ПРИ УСЛОВИИ УКАЗАНИЯ ЕГО АВТОРА, НО ТОЛЬКО В НЕКОММЕРЧЕСКИХ ЦЕЛЯХ. ТАКЖЕ ВСЕ ПРОИЗВОДНЫЕ ПРОИЗВЕДЕНИЯ, ДОЛЖНЫ РАСПРОСТРАНЯТЬСЯ ПОД ЛИЦЕНЗИЕЙ CC BY-NC-SA.

**ENG:** THE WORK (AS DEFINED BELOW) IS PROVIDED UNDER THE TERMS OF THIS CREATIVE COMMONS PUBLIC LICENSE (''CCPL'' OR ''LICENSE''). THE WORK IS PROTECTED BY COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.