# jSSC-CE - Installation Guide for WinCE #

**Attention! This version of the library was designed for CrEme-4.12 JVM, if you plan to use a different JVM you need to make changes in the source code of library in accordance with the specification of your JVM.**

## 1. WinCE 5.0 Device Emulator ##
Because I have no real device running WinCE for work I will use **Microsoft Windows CE 5.0 Device Emulator**, you can download it for free:

http://www.microsoft.com/downloads/en/details.aspx?FamilyID=a120e012-ca31-4be9-a3bf-b9bf4f64ce72

Download it. Install it. Run it. Great! Here is WinCE 5.0:

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/1.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/1.png)

To start **Device Emulator**, I used the following keys: **/CEImage nk.cem /video 800x600x16 /serialport1 COM1 /serialport2 COM3** For more information, see the **Microsoft Windows CE 5.0 Device Emulator** help.
Ok, now we need to install JVM, I have chosen **CrE-ME 4.12** by the **NSIcom** company. Download **CrE-ME 4.12** here:

http://www.nsicom.com/Default.aspx?tabid=159

## 2. CrEme-4.12 installation ##

**Note: To run the installer you must have installed ActiveSync.**

Run the installer. Then go into the folder **C:\Program Files\Microsoft ActiveSync\NSIcom\** and copy the file **CrE-ME412\_X86\_CE50\_HPC.CAB** to the folder **C:\StorageCard\**

Now we need share **C:\StorageCard\** folder for Device Emulator:


![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/2.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/2.png)

Now we can launch **CrEme** installer from the **Storage Card** in **My Device**:

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/3.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/3.png)

Excellent JVM installed, now we need to install **jSSC-CE**. File **jSSC.dll** put into the directory **\Windows\CrEme\bin** and the file **jSSC-CE.jar** put into the directory **\Windows\CrEme\lib**


![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/4.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/4.png)

## 3. Run demo application ##

Ok, now we can run the demo application from the archive with the library. Put the files **jSSC-CE\_Terminal.jar** and **Terminal.lnk** in **Storage Card**, now run the application by **Terminal.lnk**


![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/5.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/5.png)

Starting application by the **Terminal.lnk** is required because the we need to pass **-noblock** key to JVM, because when JVM call **native methods** all other threads are stopped, it is a feature of **CrEme** JVM.

Ok, now we can verify how it work. Join 2 COM-Ports with null-modem cable and play with terminals:


![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/6.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/wince_jssc_installation/6.png)

**Everything works fine!**

The archive includes a version of **jSSC.dll** only for **x86**, but I have attached a project for **Visual Studio 2008**, and you can easy compile **jSSC.dll** for your platform. Also to compile your version of **jSSC.dll** you need **CrE-ME 4.12 Developer Support**, you can download it here:

http://www.nsicom.com/shared/CrEmeDevSup410.exe

# Good luck! #