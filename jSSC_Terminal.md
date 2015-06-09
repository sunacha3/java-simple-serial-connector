This is **serial port terminal applet** based on **jSSC** library. This terminal demonstrate some functions of **java serial port library - jSSC**.

&lt;wiki:gadget url="http://java-simple-serial-connector.googlecode.com/svn/trunk/terminal/demo.xml"  width="720" height="520"/&gt;

This applet can run like an a stand alone application. Download bins and sources here: http://code.google.com/p/java-simple-serial-connector/downloads/list

You can easy integrate this applet into you web-page. Just insert the following code (this example is recommended):
```
<script src="http://java.com/js/deployJava.js"></script>
<script>
    var attributes = {
        code:       "applet.Main",
        archive:    "jSSC-Terminal.jar, lib/jssc.jar, lib/swing-layout-1.0.4.jar",
        width:      700,
        height:     500
    };
    var parameters = {separate_jvm:"true", draggable:"true", jnlp_href:"http://java-simple-serial-connector.googlecode.com/svn/trunk/terminal/launch.jnlp"}; <!-- Applet Parameters -->
    var version = "1.5"; <!-- Required Java Version -->
    deployJava.runApplet(attributes, parameters, version);
</script>
```

Or use this code:
```
<applet width="700" height="500">
    <param name="jnlp_href" value="http://java-simple-serial-connector.googlecode.com/svn/trunk/terminal/launch.jnlp"/>
    <param name="separate_jvm" value="true"/>
    <param name="draggable" value="true"/>
</applet>
```

Also you can use jSSC-Terminal into your corporate network, for that download terminal (see link before) and place it on your server. You can use it and change code under terms of GPL3 license.