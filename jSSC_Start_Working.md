# jSSC - start working with library #

Let's try start working with jSSC. I'll show you how do it in **NetBeans IDE**.

## 1. Downloading jSSC ##
Download last version of jSSC. http://code.google.com/p/java-simple-serial-connector/downloads/list

## 2. Unpacking ##
Unpack downloaded file:

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/1_Unpack.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/1_Unpack.png)

**Bins** folder contains binary files of jSSC. **Javadoc** folder contains documentation on English and Russian languages. And **src** folder contains jSSC source files.

## 3. Adding jSSC in NetBeans ##
Run **NetBeans IDE**. Go to **Library Manages**(**Tools->Libraries**):

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/2_NetBeansAddLib.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/2_NetBeansAddLib.png)

Add new library:

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/3_NetBeansAddLib.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/3_NetBeansAddLib.png)

On **Classpath** tab press **Add JAR/Folder…** button and select **jssc.jar** file:

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/4_NetBeansAddLib.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/4_NetBeansAddLib.png)

Then, on **Javadoc** tab select your javadoc folder (**en** for English and **ru** for Russian documentation):

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/5_NetBeansAddLib.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/5_NetBeansAddLib.png)

## 4. Creating project ##

Now, let's create a simple project. In project properties we must add jSSC-0.7.1 library:

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/6_NetBeansAddLib.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/6_NetBeansAddLib.png)

After that, we must put a **libjssc.dll** file in project folder. We can do it in **NetBeans** or in file manager:

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/7_NetBeansAddLib.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/7_NetBeansAddLib.png)

## 5. Coding ##
Nice. Now, let's write some code to make sure everything works:

```
package jssc_test;

import jssc.SerialPort;
import jssc.SerialPortException;

/**
 *
 * @author scream3r
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        SerialPort serialPort = new SerialPort("COM1");
        try {
            System.out.println("Port opened: " + serialPort.openPort());
            System.out.println("Params setted: " + serialPort.setParams(9600, 8, 1, 0));
            System.out.println("\"Hello World!!!\" successfully writen to port: " + serialPort.writeBytes("Hello World!!!".getBytes()));
            System.out.println("Port closed: " + serialPort.closePort());
        }
        catch (SerialPortException ex){
            System.out.println(ex);
        }
    }
}
```

After executing this simple program we'll receive this result:

![http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/8_NetBeansAddLib.png](http://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/manuals/start_working/8_NetBeansAddLib.png)

**That's great !!!** All work fine, and now we can start working on own projects.

# Good Luck #