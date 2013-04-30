/* jSSC (Java Simple Serial Connector) - serial port communication library.
 * © Alexey Sokolov (scream3r), 2010-2013.
 *
 * This file is part of jSSC.
 *
 * jSSC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * jSSC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with jSSC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * If you use jSSC in public project you can inform me about this by e-mail,
 * of course if you want it.
 *
 * e-mail: scream3r.org@gmail.com
 * web-site: http://scream3r.org | http://code.google.com/p/java-simple-serial-connector/
 */
var jSSC = {
	
	/**
	 * Java applet loading function
	 */
    init: function() {
    	var appletStr = '<applet name="jssc_bridge" id="jssc_bridge" code="jssc.bridge.JSBridge" archive="jSSC-Bridge-2.1.jar, lib/jssc.jar" width="1" height="1">' +
    						'<param name="separate_jvm" value="true">' +
        					'<param name="mayscript" value="yes">' +
        					'<param name="scriptable" value="true">' +
        				'</applet>';
    	document.getElementById('jssc_init').innerHTML = appletStr;
    	jSSC.bridge = document.jssc_bridge;
    },
    
    /**
	 * Get jSSC library version
	 */
    getLibraryVersion: function() {
    	return jSSC.bridge.getLibraryVersion();
	},
    
    /**
	 * Get sorted array of serial ports in the system
	 * 
	 * @return String array. If there is no ports in the system string array with zero length will be returned
	 */
    getPortNames: function() {
    	return jSSC.bridge.getPortNames();
	},
	
	/**
	 *  Get a new port key for start working with jSSC-Bridge
	 */
	_getNewPortKey: function() {
    	return jSSC.bridge.getNewPortKey();
	},
		
	SerialPort: function(portName) {
		
		this._portKey = "";
		
		/**
	     * Getting port name under operation (for internal use only)
	     *
	     * @return Method returns port name under operation as a String
	     */
		this._getPortName = function() {
			return portName;
		}
	},
	
	SerialPortException: function(portName, methodName, exceptionType) {
		this.portName = portName;
		this.methodName = methodName;
		this.exceptionType = exceptionType;
		this.message = 'Port name - ' + portName + '; Method name - ' + methodName + '; Exception type - ' + exceptionType + '.';
		this.toString = function(){
			return 'SerialPortException: ' + this.message;
		}
	},
	
	SerialPortTimeoutException: function(portName, methodName, timeoutValue) {
		this.portName = portName;
		this.methodName = methodName;
		this.timeoutValue = timeoutValue;
		this.message = 'Port name - ' + portName + '; Method name - ' + methodName + '; Serial port operation timeout (' + timeoutValue + ' ms).';
		this.toString = function(){
			return 'SerialPortTimeoutException: ' + this.message;
		}
	}
}

jSSC.SerialPortException.prototype = {
	
	TYPE_PORT_ALREADY_OPENED: 'Port already opened',
    TYPE_PORT_NOT_OPENED: 'Port not opened',
    TYPE_CANT_SET_MASK: 'Can\'t set mask',
    TYPE_LISTENER_ALREADY_ADDED: 'Event listener already added',
    TYPE_LISTENER_THREAD_INTERRUPTED: 'Event listener thread interrupted',
    TYPE_CANT_REMOVE_LISTENER: 'Can\'t remove event listener, because listener not added',
    TYPE_PARAMETER_IS_NOT_CORRECT: 'Parameter is not correct',
    TYPE_NULL_NOT_PERMITTED: 'Null not permitted',
    TYPE_PORT_BUSY: 'Port busy',
    TYPE_PORT_NOT_FOUND: 'Port not found'
}

jSSC.SerialPort.prototype = {
	
	BAUDRATE_110: 110,
	BAUDRATE_300: 300,
	BAUDRATE_600: 600,
	BAUDRATE_1200: 1200,
	BAUDRATE_4800: 4800,
	BAUDRATE_9600: 9600,
	BAUDRATE_14400: 14400,
	BAUDRATE_19200: 19200,
	BAUDRATE_38400: 38400,
	BAUDRATE_57600: 57600,
	BAUDRATE_115200: 115200,
	BAUDRATE_128000: 128000,
	BAUDRATE_256000: 256000,
	
	DATABITS_5: 5,
    DATABITS_6: 6,
    DATABITS_7: 7,
    DATABITS_8: 8,
    
    STOPBITS_1: 1,
    STOPBITS_2: 2,
    STOPBITS_1_5: 3,
    
    PARITY_NONE: 0,
    PARITY_ODD: 1,
    PARITY_EVEN: 2,
    PARITY_MARK: 3,
    PARITY_SPACE: 4,
    
    PURGE_RXABORT: 0x0002,
    PURGE_RXCLEAR: 0x0008,
    PURGE_TXABORT: 0x0001,
    PURGE_TXCLEAR: 0x0004,

    MASK_RXCHAR: 1,
    MASK_RXFLAG: 2,
    MASK_TXEMPTY: 4,
    MASK_CTS: 8,
    MASK_DSR: 16,
    MASK_RLSD: 32,
    MASK_BREAK: 64,
    MASK_ERR: 128,
    MASK_RING: 256,
    
    FLOWCONTROL_NONE: 0,
    FLOWCONTROL_RTSCTS_IN: 1,
    FLOWCONTROL_RTSCTS_OUT: 2,
    FLOWCONTROL_XONXOFF_IN: 4,
    FLOWCONTROL_XONXOFF_OUT: 8,
    
    ERROR_FRAME: 0x0008,
    ERROR_OVERRUN: 0x0002,
    ERROR_PARITY: 0x0004,
    
    
    /**
     * Getting port name under operation
     *
     * @return Method returns port name under operation as a String
     */
	getPortName: function() {
		return this._getPortName();
	},
	
	/**
	 * Getting port state
	 * 
	 * @return Method returns true if port is open, otherwise false
	 */
	isOpened: function() {
		return this._executeFunction('isOpened');
	},
	
	/**
	 * Port opening
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false
	 */
	openPort: function() {
		this._portKey = jSSC._getNewPortKey();
		return this._executeFunction('openPort');
	},
	
	/**
	 * Setting the parameters of port
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false
	 */
	setParams: function(baudRate, dataBits, stopBits, parity, setRTS, setDTR) {
		arguments[4] += 0;//Convert Boolean to Number value
		arguments[5] += 0;//Convert Boolean to Number value
		return this._executeFunction('setParams', arguments);
	},
	
	/**
	 * Purge of input and output buffer. Required flags shall be sent to the input.
	 * Variables with prefix "PURGE_", for example "PURGE_RXCLEAR". Sent parameter "flags" is additive value, 
	 * so addition of flags is allowed. For example, if input or output buffer shall be purged, 
	 * parameter "PURGE_RXCLEAR | PURGE_TXCLEAR".
	 * 
	 * Note: some devices or drivers may not support this function 
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false
	 */
	purgePort: function(flags) {
		return this._executeFunction('purgePort', flags);
	},
	
	/**
	 * Set events mask. Required flags shall be sent to the input. Variables with prefix "MASK_", 
	 * shall be used as flags, for example "MASK_RXCHAR". Sent parameter "mask" is additive value, 
	 * so addition of flags is allowed. For example if messages about data receipt and CTS and DSR 
	 * status changing shall be received, it is required to set the mask - "MASK_RXCHAR | MASK_CTS | MASK_DSR"
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false
	 */
	setEventsMask: function(mask) {
		return this._executeFunction('setEventsMask', mask);
	},
	
	/**
	 * Getting events mask for the port
	 * 
	 * @return Method returns events mask as int type variable. This variable is an additive value 
	 */
	getEventsMask: function() {
		return this._executeFunction('getEventsMask');
	},
	
	/**
	 * Change RTS line state. Set "true" for switching ON and "false" for switching OFF RTS line
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false 
	 */
	setRTS: function(enabled) {
		return this._executeFunction('setRTS', enabled);
	},
	
	/**
	 * Change DTR line state. Set "true" for switching ON and "false" for switching OFF DTR line
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false
	 */
	setDTR: function(enabled) {
		return this._executeFunction('setDTR', enabled);
	},
	
	writeBytes: function(buffer) {
		return this._executeFunction('writeBytes', buffer);
	},
	
	writeByte: function(value) {
		return this._executeFunction('writeByte', value);
	},
	
	writeString: function(str) {
		return this._executeFunction('writeString', str);
	},
	
	readBytes: function(byteCount, timeout) {
		return this._executeFunction('readBytes', arguments);
	},
	
	readString: function(byteCount, timeout) {
		return this._executeFunction('readString', arguments);
	},
	
	readHexString: function(byteCount, timeout) {
		return this._executeFunction('readHexString', arguments);
	},
	
	readHexStringArray: function(byteCount, timeout) {
		return this._executeFunction('readHexStringArray', arguments);
	},
	
	/**
	 * Get count of bytes in input buffer 
	 * 
	 * @return Count of bytes in input buffer or -1 if error occured 
	 */
	getInputBufferBytesCount: function() {
		return this._executeFunction('getInputBufferBytesCount');
	},
	
	/**
	 * Get count of bytes in output buffer 
	 * 
	 * @return Count of bytes in output buffer or -1 if error occured
	 */
	getOutputBufferBytesCount: function() {
		return this._executeFunction('getOutputBufferBytesCount');
	},
	
	/**
	 * Set flow control mode. For required mode use variables with prefix "FLOWCONTROL_". 
	 * Example of hardware flow control mode(RTS/CTS): setFlowControlMode(FLOWCONTROL_RTSCTS_IN | FLOWCONTROL_RTSCTS_OUT);
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false
	 */
	setFlowControlMode: function(mask) {
		return this._executeFunction('setFlowControlMode', mask);
	},
	
	/**
	 * Get flow control mode
	 * 
	 * @return Mask of setted flow control mode
	 */
	getFlowControlMode: function() {
		return this._executeFunction('getFlowControlMode');
	},
	
	/**
	 * Send Break singnal for setted duration
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false
	 */
	sendBreak: function(duration) {
		return this._executeFunction('sendBreak', duration);
	},
	
	/**
	 * Getting lines status. Lines status is sent as 0 � OFF and 1 - ON 
	 * 
	 * @return Method returns the array containing information about lines in following order:
	 * element 0 - CTS line state
	 * element 1 - DSR line state
	 * element 2 - RING line state
	 * element 3 - RLSD line state
	 */
	getLinesStatus: function() {
		return this._executeFunction('getLinesStatus');
	},
	
	/**
	 * Get state of CTS line
	 * 
	 * @return If line is active, method returns true, otherwise false
	 */
	isCTS: function() {
		return this._executeFunction('isCTS');
	},
	
	/**
	 * Get state of DSR line
	 * 
	 * @return If line is active, method returns true, otherwise false
	 */
	isDSR: function() {
		return this._executeFunction('isDSR');
	},
	
	/**
	 * Get state of RING line
	 * 
	 * @return If line is active, method returns true, otherwise false
	 */
	isRING: function() {
		return this._executeFunction('isRING');
	},
	
	/**
	 * Get state of RLSD line
	 * 
	 * @return If line is active, method returns true, otherwise false
	 */
	isRLSD: function() {
		return this._executeFunction('isRLSD');
	},
	
	addEventListener: function(functionName) {
		this._executeFunction('addEventListener', functionName);
	},
	
	removeEventListener: function() {
		this._executeFunction('removeEventListener');
	},
	
	/**
	 * Close port. This method deletes event listener first, then closes the port
	 * 
	 * @return If the operation is successfully completed, the method returns true, otherwise false
	 */
	closePort: function () {
		return this._executeFunction('closePort');
	},
	
	getLastError: function() {
		return this._executeFunction('getLastError');
	},
	
	_executeFunction: function(func, args) {
		try {
			if(args != null){
				return jSSC.bridge[func](this.getPortName(), this._portKey, args);
			}
			else {
				return jSSC.bridge[func](this.getPortName(), this._portKey);
			}
		}
		catch (e) {
			this._convertException(e);
		}
	},
	
	_convertException: function(e) {
		var message = '';
		
		if(e instanceof Error){
			message = e.message;
		}
		else if(typeof e == 'string'){
			message = e;
		}
		if(message.indexOf('jssc.SerialPortException: ') == 0 || message.indexOf('jssc.SerialPortTimeoutException: ') == 0){
			message = message.replace('Port name - ', '').replace(' Method name - ', '');
			if(message.indexOf('jssc.SerialPortException: ') == 0){
				var exceptionArray = message.replace('jssc.SerialPortException: ', '').replace(' Exception type - ', '').split(';');
				throw new jSSC.SerialPortException(exceptionArray[0], exceptionArray[1], exceptionArray[2].substr(0, exceptionArray[2].length - 1));
			}
			else if(message.indexOf('jssc.SerialPortTimeoutException: ') == 0){
				var exceptionArray = message.replace('jssc.SerialPortTimeoutException: ', '').replace(' Serial port operation timeout (', '').replace(' ms).', '').split(';');
				throw new jSSC.SerialPortTimeoutException(exceptionArray[0], exceptionArray[1], exceptionArray[2]);
			}	
		}
		else if(message.indexOf('Error calling method on NPObject') != -1){//WebKit fix for correct Exception catch
			this._convertException(this.getLastError());
		}
		else {
			throw new jSSC.SerialPortException(this.getPortName(), 'unknown', message);
		}
	}
}