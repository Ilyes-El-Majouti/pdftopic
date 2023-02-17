<img src="https://repository-images.githubusercontent.com/518815977/51d3dd60-7078-4652-b458-ce043754c7bd">

## **PDFTOPIC *By Ilyes-El-Majouti***

[<img src="https://img.shields.io/badge/PDFTOPIC-010101?&style=for-the-badge&logo=Npm&logoColor=white"/>](https://www.npmjs.com/package/pdftopic)


### **Documentation en français**


### **Installation de ImageMagick CLI**

### **Sur macOS**

1. Assurez-vous que [Homebrew](https://brew.sh/) est installé sur votre système.
2. Ouvrez le terminal et tapez la commande suivante: `brew install imagemagick`

### **Sur Linux**
**Debian et Ubuntu** 
1. Ouvrez le terminal et tapez la commande suivante: `sudo apt-get update`
2. Tapez la commande suivante pour installer ImageMagick: `sudo apt-get install imagemagick`

**Fedora**
1. Ouvrez le terminal et tapez la commande suivante: `sudo dnf install imagemagick`

**CentOS**
1. Ouvrez le terminal et tapez la commande suivante: `sudo yum install imagemagick`

### **On Windows**

1. Téléchargez l'installeur ImageMagick pour Windows à partir de [la page de téléchargement officielle](https://imagemagick.org/script/download.php#windows).
2. Exécutez l'installeur que vous venez de télécharger. Vous pouvez choisir de cocher ou décocher les options d'installation en fonction de vos besoins. Si vous n'êtes pas sûr de quoi choisir, vous pouvez laisser les options par défaut.
3. Dans la boîte de dialogue "Choisir les composants à installer", sélectionnez au moins "Install command-line utilities" pour installer la version CLI d'ImageMagick.
4. Dans la boîte de dialogue "Sélectionner les dossiers d'installation", choisissez l'emplacement où vous voulez installer ImageMagick sur votre ordinateur. Vous pouvez laisser l'emplacement par défaut si vous n'avez pas de préférence particulière.
5. Dans la boîte de dialogue "Installer", cliquez sur le bouton "Installer" pour commencer l'installation.
6. Une fois l'installation terminée, vous pouvez vérifier que ImageMagick CLI est installé en ouvrant un invite de commande (cmd.exe) et en tapant la commande `magick` ou `convert`. Si vous voyez une liste d'options de commande, c'est que ImageMagick CLI est installé correctement.

---

Ce package permet de convertir un PDF en n'importe quels formats d'image (png, jpg, gif, ...) en très bonne qualité. le package avec la meilleure qualité de rendu, après avoir essayé plusieurs packages les qualités de rendu était horrible du coup j'ai décidé de créer ce package qui ressoudera ce souci a plus d'une personne 😉.

Si vous voulez une version pour convertir avec express js envoyez moi un message sur github ou faite un issues pour me le faire savoir
### **Comment l'utiliser ?**
Avant tout il faut installer le package sur npm ou github avec la commande suivante
```sh
npm install pdftopic
```
Ensuite après avoir installé le package il vous suffira d'importer dans votre code Javascript la partie suivante pour cet exemple je souhaite convertir un fichier PDF en format PNG
```javascript
const { pdftobuffer } = require('pdftopic');
const fs = require('fs');

const pdf = fs.readFileSync('./ilyes.pdf', null);

pdftobuffer(pdf, 0).then((buffer) => {
    fs.writeFileSync('./ilyes.png', buffer, null);
})
```
### **Résultat après avoir exécuté le code**

Ensuite tu trouveras ton fichier converti avec ton extension pour ma part PNG

**Avant**

![preview in file pdf](./ilyes-pdf.png)

**Après**

![preview convert file](./ilyes.png)

#### **Vous retrouverez les fichiers sur le github (https://github.com/Ilyes-El-Majouti/pdftopic)**
<br>

### **Liker si vous avez aimé le code ça me ferait très plaisir 💪😉**

---
<br>

### **Documentation in English**

### **Installing ImageMagick CLI**

### **On macOS**

1. Make sure you have [Homebrew](https://brew.sh/) installed on your system.
2. Open the terminal and type the following command: `brew install imagemagick`

### **On Linux**
**Debian and Ubuntu** 
1. Open the terminal and type the following command: `sudo apt-get update`
2. Type the following command to install ImageMagick: `sudo apt-get install imagemagick`

**Fedora**
1. Open the terminal and type the following command: `sudo dnf install imagemagick`

**CentOS**
1. Open the terminal and type the following command: `sudo yum install imagemagick`

### **On Windows**

1. Download the ImageMagick installer for Windows from the [official download page](https://imagemagick.org/script/download.php#windows).
2. Run the installer that you just downloaded. You can choose to check or uncheck installation options depending on your needs. If you're not sure what to choose, you can leave the options as default.
3. In the "Choose components to install" dialog box, select at least "Install command-line utilities" to install the CLI version of ImageMagick.
4. In the "Select installation folder" dialog box, choose the location where you want to install ImageMagick on your computer. You can leave the location as default if you don't have any particular preference.
5. In the "Install" dialog box, click the "Install" button to start the installation.
6. Once the installation is complete, you can verify that ImageMagick CLI is installed by opening a command prompt (cmd.exe) and typing the command `magick` or `convert`. If you see a list of command options, then ImageMagick CLI is installed correctly.

---

This package allows you to convert a PDF to any image formats (png, jpg, gif, ...) in very good quality. the package with the best rendering quality, after trying several packages the rendering qualities were horrible so I decided to create this package which will solve this problem for more than one person 😉.

If you want a version to convert with express js send me a message on github or do an issues to let me know

### **How to use it ?**
First of all you have to install the package on npm or github with the following command
```sh
npm install pdftopic
```
Then after installing the package, you just need to import the following part into your Javascript code. For this example, I want to convert a PDF file to PNG format.
```javascript
const { pdftobuffer } = require('pdftopic');
const fs = require('fs');

const pdf = fs.readFileSync('./ilyes.pdf', null);

pdftobuffer(pdf, 0).then((buffer) => {
    fs.writeFileSync('./ilyes.png', buffer, null);
})
```
### **Result after running the code**

Then you will find your converted file with your extension for my part PNG

**Before**

![preview in file pdf](./ilyes-pdf.png)

**After**

![preview convert file](./ilyes.png)

#### **You will find the files on the github (https://github.com/Ilyes-El-Majouti/pdftopic)**
<br>

### **Like if you liked the code it would make me very happy 💪😉**

---
<br>

### **Documentación en español**

### **Instalación de ImageMagick CLI**

### **En macOS**

1. Asegúrese de tener [Homebrew](https://brew.sh/) instalado en su sistema.
2. Abra la terminal y escriba el siguiente comando: `brew install imagemagick`

### **En Linux**
**Debian y Ubuntu** 
1. Abra la terminal y escriba el siguiente comando: `sudo apt-get update`
2. Escriba el siguiente comando para instalar ImageMagick: `sudo apt-get install imagemagick`

**Fedora**
1. Abra la terminal y escriba el siguiente comando: `sudo dnf install imagemagick`

**CentOS**
1. Abra la terminal y escriba el siguiente comando: `sudo yum install imagemagick`

### **En Windows**

1. Descargue el instalador de ImageMagick para Windows desde la [página de descarga oficial](https://imagemagick.org/script/download.php#windows).
2. Ejecute el instalador que acaba de descargar. Puede elegir marcar o desmarcar las opciones de instalación según sus necesidades. Si no está seguro de qué elegir, puede dejar las opciones como predeterminadas.
3. En el cuadro de diálogo "Elegir los componentes a instalar", seleccione al menos "Instalar utilidades de línea de comandos" para instalar la versión CLI de ImageMagick.
4. En el cuadro de diálogo "Seleccionar carpeta de instalación", elija la ubicación donde desea instalar ImageMagick en su computadora. Puede dejar la ubicación como predeterminada si no tiene ninguna preferencia en particular.
5. En el cuadro de diálogo "Instalar", haga clic en el botón "Instalar" para comenzar la instalación.
6. Una vez que se complete la instalación, puede verificar que ImageMagick CLI está instalado abriendo un símbolo del sistema (cmd.exe) y escribiendo el comando `magick` o `convert`. Si ve una lista de opciones de comando, entonces ImageMagick CLI se ha instalado correctamente.

---

Este paquete te permite convertir un PDF a cualquier formato de imagen (png, jpg, gif, ...) en muy buena calidad. el paquete con la mejor calidad de renderizado, después de probar varios paquetes las calidades de renderizado eran horribles, así que decidí crear este paquete que resolverá este problema para más de una persona 😉.

Si desea una versión para convertir con express js, envíeme un mensaje en github o haga un problema para avisarme
### **Comment l'utiliser ?**
En primer lugar, debe instalar el paquete en npm o github con el siguiente comando
```sh
npm install pdftopic
```
Luego, después de instalar el paquete, solo necesita importar la siguiente parte en su código Javascript para este ejemplo. Quiero convertir un archivo PDF a formato PNG.
```javascript
const { pdftobuffer } = require('pdftopic');
const fs = require('fs');

const pdf = fs.readFileSync('./ilyes.pdf', null);

pdftobuffer(pdf, 0).then((buffer) => {
    fs.writeFileSync('./ilyes.png', buffer, null);
})
```
### **Resultado después de ejecutar el código**

Luego encontrará su archivo convertido con su extensión para mí PNG

**Antes**

![preview in file pdf](./ilyes-pdf.png)

**Después**

![preview convert file](./ilyes.png)

#### **Encontrará los archivos en github (https://github.com/Ilyes-El-Majouti/pdftopic)**
<br>

### **Like si te gusto el código me haría muy feliz 💪😉**