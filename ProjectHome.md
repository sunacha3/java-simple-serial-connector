&lt;wiki:gadget url="http://java-simple-serial-connector.googlecode.com/svn/trunk/social/social.xml" border="0" width="100%" height="128"/&gt;
jSSC (Java Simple Serial Connector) - library for working with serial ports from Java. jSSC support Win32(Win98-Win8), Win64, Linux(x86, x86-64, ARM), Solaris(x86, x86-64), Mac OS X 10.5 and higher(x86, x86-64, PPC, PPC64). Documentation and examples you can find in wiki.

### jSSC-2.8.0 published in Maven Central Repo: http://search.maven.org/#search|ga|1|jssc ###
![https://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/icons/Maven_logo.png](https://java-simple-serial-connector.googlecode.com/svn/trunk/additional_content/icons/Maven_logo.png)
<br>
<h3>jSSC-2.8.0 Changelog</h3>

<h4>Fixes:</h4>
<ul>
<li><b>Important!</b> Fixed bug with port handles potential leakage. Thanks to <b>Cristian Maglie</b> for complete bug-report</li>
</ul>
<h4>Additions:</h4>
<ul>
<li>Added method "writeString(String string, String charsetName)"</li>
<li>Added method "getNativeLibraryVersion" in "SerialNativeInterface" class</li>
<li>Enabled Java and Native libraries versions mismatch check</li>
</ul>

All new downloads will be available on GitHub: <a href='https://github.com/scream3r/java-simple-serial-connector/releases'>https://github.com/scream3r/java-simple-serial-connector/releases</a>

<h3>jSSC-2.6.0 Changelog</h3>

<h4>Note:</h4>
<ul>
<li>Linux x86 and x86-64 was builded on Ubuntu 10.04 and don't depends GLIBC-2.15 unlike jSSC-2.5.0</li>
</ul>

<h4>Additions:</h4>
<ul>
<li>Added <b>os.name - "Darwin"</b> and <b>os.arch - "universal"</b> support. It can be useful for MacOS X developers</li>
<li>Added <b>ttyO</b> to Linux RegExp for listing OMAP serial devices</li>
<li>Added <b>JSSC_IGNPAR</b> and <b>JSSC_PARMRK</b> properties for enabling <b>IGNPAR</b> and <b>PARMRK</b> flags in <code>_</code>nix termios structure</li>
</ul>

<h3>jSSC-2.5.0 Changelog</h3>

<h4>Fixes:</h4>
<ul>
<li><b>Important!</b> Fixed bug in MacOS X native readBytes() method</li>
<li><b>Important!</b> Fixed bug with garbage reading on Linux, MacOSX, Solaris, cause of incorrect using of VMIN and VTIME. Now "read" methods works correctly and are blocking like in Windows</li>
<li><b>Important!</b> Fixed error with garbage reading in Windows using jSSC after another application used serial port. To prevent this effect COMMTIMEOUTS structure zeroing added to setParams() method</li>
<li><b>Important!</b> The port handle now stored in variable of type "long" instead of "int", to prevent potential problems with type conversions on Win64</li>
<li>Fixed MacOS X 10.8 bug with native lib loading (.dylib -> .jnilib)</li>
<li>Fixed Linux error with exclusive access to serial port (TIOCEXCL). TIOCNXCL added to closePort() method for clearing exclusive access</li>
<li>Fixed Windows native lib port name concatenation error</li>
<li>Fixed native lib extraction path if user home is read only, in this situation lib will be extracted to tmp folder</li>
<li>Null port name fix. If try to invoke method openPort() for SerialPort(null) object, exception TYPE_NULL_NOT_PERMITTED will be thrown</li>
<li>Enabled TIOCEXCL support in Solaris</li>
</ul>

<h4>Additions:</h4>
<ul>
<li>Added ARM Soft & Hard float support (Tested of Raspberry Pi with Oracle JDK(6-7-8))</li>
<li>Added ttyACM, ttyAMA, rfcomm to Linux RegExp and tty.usbmodem to MacOS X RegExp</li>
<li>Added precompiled RegExp's for Linux, Solaris, MacOS X for more faster port listing</li>
<li>Added private common for Linux, Solaris, MacOS X method getUnixBasedPortNames() for listing serial ports</li>
<li>Rewrited comparator for sorting port names. Now it's a common comparator for Windows, Linux, Solaris and MacOS X</li>
<li>Added some syntax sugar to SerialPortList class, for changing search path, RegExp and comparator</li>
<li>Added timeouts for read operations and SerialPortTimeoutException class for catching timeout exceptions</li>
<li>Added JSSC_NO_TIOCEXCL JVM property for disable using of exclusive access to serial port</li>
<li>Added termios(<code>_</code>nix) and DCB(Windows) structure cheking on port opening, it helps separate real serial devices from others</li>
<li>Added "ERR<code>_</code>" constants into SerialNativeInterface</li>
<li>Added new exception TYPE_INCORRECT_SERIAL_PORT</li>
<li>Added new exception TYPE_PERMISSION_DENIED. It can be very useful for <code>_</code>nix based system if user have no permissions for using serial device</li>
</ul>

And other little modifications...<br>
<br>
If you like jSSC, please support project. You can write about jSSC in your twitter, blog, web-site, forum and etc. Also you can write me a letter with some words about your project where you use jSSC lib: <b>scream3r.org@gmail.com</b> And of course, if you want, you can make a donation. Your help is very important for me.<br>
<br>
If you have some questions or you want just say "Thank you", mail me: <b>scream3r.org@gmail.com</b><br>

With Best Regards Sokolov Alexey.