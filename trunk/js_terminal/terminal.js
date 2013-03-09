/* jSSC-Bridge Terminal - serial port terminal.
 * © Alexey Sokolov (scream3r), 2013.
 *
 * This file is part of jSSC-Bridge Terminal.
 *
 * jSSC-Bridge Terminal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * jSSC-Bridge Terminal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 *
 * e-mail: scream3r.org@gmail.com
 * web-site: www.scream3r.org | http://code.google.com/p/java-simple-serial-connector/
 */
function Terminal(terminalId, ownerContainer) {
	
	var icons = {
		ERROR: 'style/cross.png',
		ATTENTION: 'style/error.png',
		QUESTION: 'style/question.png'
	}
	
	var ctsLabel = Ext.create('Ext.toolbar.TextItem', {
		text: '<b>CTS</b>',
		style: {color:'gray'}
	});
	
	var dsrLabel = Ext.create('Ext.toolbar.TextItem', {
		text: '<b>DSR</b>',
		style: {color:'gray'}
	});
	
	var rlsdLabel = Ext.create('Ext.toolbar.TextItem', {
		text: '<b>RLSD</b>',
		style: {color:'gray'}
	});
	
	var comboViewAs = Ext.create('Ext.form.ComboBox', {
		width: 120,
    	editable: false,
    	store: Ext.create('Ext.data.Store', {
    		fields: ['value', 'display'],
    		data : [
        		{'value': 'char', 'display': 'View as chars'},
        		//FIXME
        		{'value': 'hex', 'display': 'View as HEX'},
        		{'value': 'digit', 'display': 'View as digits'}
    		]
		}),
		queryMode: 'local',
		displayField: 'display',
		valueField: 'value',
		value: 'char'
	});
	
	var inputTextArea = Ext.create('Ext.form.field.TextArea', {
		region: 'center',
		margins: 5, 
		readOnly: true
	});
	
	var inputPanel = Ext.create('Ext.panel.Panel', {
		region: 'center',
    	title: 'Input',
    	padding: 10,
    	layout: 'border',
    	items: [
    		{region: 'north', xtype: 'toolbar', margins: '5 5 0 5',
    			items: [
    				comboViewAs,
					{
						xtype: 'button',
						text: 'Clear text area',
						handler: function() {
							inputTextArea.setValue('');
						}
					},
    				{xtype: 'tbfill'},
    				ctsLabel,
    				'-',
    				dsrLabel,
    				'-',
    				rlsdLabel
    			]
	    	},
	    	inputTextArea
    	]
	});
	
	var rtsButton = Ext.create('Ext.button.Button', {
		enableToggle: true,
		text: 'Set RTS',
		listeners: {
			toggle: function(obj, state) {
				if(serialPort.isOpened()){
					serialPort.setRTS(state);
				}
			}
		}
	});
	
	var dtrButton = Ext.create('Ext.button.Button', {
		enableToggle: true,
		text: 'Set DTR',
		listeners: {
			toggle: function(obj, state) {
				if(serialPort.isOpened()){
					serialPort.setDTR(state);
				}
			}
		}
	});
	
	var outTextfield = Ext.create('Ext.form.field.Text', {
		flex: 1,
		listeners: {
			specialkey: function(field, e){
				if(e.getKey() == e.ENTER){
					writeData();
				}
			}
		}
	});
	
	var itemChars = Ext.create('Ext.menu.CheckItem', {
		text: 'Send as chars',
        group: 'group_' + terminalId,
        checked: true,
        handler: function() {
        	sendButton.setText('Send as chars');
        }
	});
	
	var itemHEX = Ext.create('Ext.menu.CheckItem', {
		text: 'Send as HEX',
        group: 'group_' + terminalId,
        checked: false,
        handler: function() {
        	sendButton.setText('Send as HEX');
        }
	});
	
	var itemLineEnd = Ext.create('Ext.menu.CheckItem', {
		text: 'Send new line symbol - <b>\\n</b>',
        checked: false
	});
	
	var sendButton = Ext.create('Ext.button.Split', {
		text: 'Send as chars',
        handler: function() {
        	writeData();
        },
        menu: [
        	itemChars,
        	itemHEX,
        	'-'
        	,
        	itemLineEnd
        ]
	});
	
	var outputPanel = Ext.create('Ext.panel.Panel', {
		region: 'south',
    	title: 'Output',
    	padding: '0 10 10 10',
    	items: [
        	{
        	xtype: 'toolbar',
        	border: 0,
        	layout: 'hbox',
        	padding: 5,
        	items: [
        		outTextfield,
        		sendButton,
        		'-',
        		rtsButton,
        		dtrButton
        	]
        	}
        ]
	});
	
	var openPortButton = Ext.create('Ext.button.Button', {
		text: 'Open port',
    	handler: function(){
    		openClosePort();
    	}
	});	
	
	var settingsButton = Ext.create('Ext.button.Button', {
		text: 'Settings',
        handler: function(){
        	createSettingsWindow(terminal, serialPort, serialPortSettings);
        }
	});
	
	var terminal = Ext.create('Ext.window.Window', {
    	constrain: true,
    	ownerCt: ownerContainer,
    	maximizable: true,
    	width: 640,
    	height: 480,
    	minWidth: 420,
    	minHeight: 300,
    	layout: 'border',
    	dockedItems: [
    		{
    		xtype: 'toolbar',
    		dock: 'top',
    		items: [
        		{
        		text: '<b>jSSC-Bridge Terminal #' + terminalId + '</b>',
        		handler: function() {
        			settings = {
        				title: 'About jSSC-Bridge Terminal',
        				value: 'This is a free and open source (GPL3 license) '
               					+ 'application that demonstrate some functions of jSSC '
               					+ '(Java Simple Serial Connector) library and JavaScript jSSC-Bridge. You can use '
               					+ 'this terminal for your work and make changes in '
               					+ 'source code (under terms of GPL3 license).<br><br>'
               					//+ '<center><strong>Based on jSSC-' + jSSC. + '</strong><br><br></center>'
               					+ '<center>Author: Sokolov Alexey (scream3r)</center>',
               			closeButton: true
        			}
        			showDialog(terminal, settings);
        		}
        		},
        		{xtype: 'tbfill'},
        		openPortButton,
        		settingsButton
        	]
			}
		],	
    	items: [
    		inputPanel,
    		outputPanel
    	]
    });
	
	terminal.on('close', function(){
		if(serialPort.isOpened()){
			serialPort.closePort();
		}
	});
    
    var serialPort = new jSSC.SerialPort(getPortNames()[0]['port']);
    var serialPortSettings = {
    	portName: serialPort.getPortName(),
    	baudRate: serialPort.BAUDRATE_9600,
    	dataBits: serialPort.DATABITS_8,
    	stopBits: serialPort.STOPBITS_1,
    	parity: serialPort.PARITY_NONE
    };
    
    window['eventListener' + terminalId] = function(portName, evType, evValue) {
    	switch(evType) {
    		case serialPort.MASK_RXCHAR: {
    			try {
    				switch(comboViewAs.getValue()) {
    					case 'char': {
    						inputTextArea.setValue(inputTextArea.getValue() + serialPort.readString(evValue));
    						break;
    					}
    					case 'hex': {
    						inputTextArea.setValue(inputTextArea.getValue() + serialPort.readHexString(evValue) + ' ');
    						break;
    					}
    					case 'digit': {
    						digitsArray = serialPort.readBytes(evValue);
    						digits = '';
    						for(i = 0; i < digitsArray.length; i++){
    							digits += digitsArray[i] + ' ';
    						}
    						inputTextArea.setValue(inputTextArea.getValue() + digits);
    						break;
	    				}
	    			}
	    			inputTextArea.inputEl.dom.scrollTop = inputTextArea.inputEl.dom.scrollHeight;
	    		}
    			catch (e) {
    				settings = {
						title: 'Reading data error',
						icon: icons.ERROR,
						value: 'Error occurred while reading data',
						closeButton: true
					}
					showDialog(terminal, settings);
    			}
    			break;
    		}
    		case serialPort.MASK_CTS: {
    			ctsLabel.getEl().setStyle('color', evValue ? 'green' : 'red');
    			break;
    		}
    		case serialPort.MASK_DSR: {
    			dsrLabel.getEl().setStyle('color', evValue ? 'green' : 'red');
    			break;
    		}
    		case serialPort.MASK_RLSD: {
    			rlsdLabel.getEl().setStyle('color', evValue ? 'green' : 'red');
    			break;
    		}
    	}
    }
    
    var openClosePort = function() {
    	try {
			if(openPortButton.getText() == 'Open port'){
				serialPort = new jSSC.SerialPort(serialPortSettings.portName);
				if(serialPort.openPort()){
					if(serialPort.setParams(serialPortSettings.baudRate, serialPortSettings.dataBits, serialPortSettings.stopBits, serialPortSettings.parity)){
						serialPort.setEventsMask(serialPort.MASK_RXCHAR | serialPort.MASK_CTS | serialPort.MASK_DSR | serialPort.MASK_RLSD);
						serialPort.addEventListener('eventListener' + terminalId);
						openPortButton.setText('Close port');
						changeComponentsState(false);
					}
					else {
						serialPort.closePort();
						openPortButton.setText('Open port');
						settings = {
							title: 'Setting parameters error',
							icon: icons.ERROR,
							value: 'Serial port settings are incorrect',
							closeButton: true
						}
						showDialog(terminal, settings);
					}
				}
			}
			else {
				if(serialPort.closePort()){
					openPortButton.setText('Open port');
					changeComponentsState(true);
				}
			}
		}
		catch (e) {
			//FIXME 
			console.log(e.toString());
			
			settings = {
				title: (openPortButton.getText() == 'Open port' ? 'Port opening' : 'Port closing') + ' error',
				icon: icons.ERROR,
				value: (e instanceof jSSC.SerialPortException ? e.exceptionType : e.toString()),
				closeButton: true
			}
			showDialog(terminal, settings);
		}
    }
    
    var changeComponentsState = function(setDisabled) {
    	settingsButton.setDisabled(!setDisabled);
		inputPanel.setDisabled(setDisabled);
		outputPanel.setDisabled(setDisabled);
		rtsButton.toggle(!setDisabled);
		dtrButton.toggle(!setDisabled);
		ctsLabel.getEl().setStyle('color', setDisabled ? 'gray' : serialPort.isCTS() ? 'green' : 'red');
		dsrLabel.getEl().setStyle('color', setDisabled ? 'gray' : serialPort.isDSR() ? 'green' : 'red');
		rlsdLabel.getEl().setStyle('color', setDisabled ? 'gray' : serialPort.isRLSD() ? 'green' : 'red');
    }
    
    var writeData = function() {
    	var value = outTextfield.getValue() + (itemLineEnd.checked ? (itemChars.checked ? '\n' : ' 0A') : '');
        if(value.length > 0){
        	try {
        		if(itemChars.checked){
        			serialPort.writeString(value);
        			outTextfield.setValue('');
        		}
        		else {
        			var correctHEX = false;
        			var valueArray = value.trim().split(' ');
        			if(valueArray.length > 0){
        				correctHEX = true;
        				for(i = 0; i < valueArray.length; i++){
        					var subStr = valueArray[i].toUpperCase();
        					if(subStr.length == 2){
        						var charOne = subStr[0];
        						var charTwo = subStr[1];
        						if(((charOne >= '0' && charOne <= '9') || (charOne >= 'A' && charOne <= 'Z')) &&
        						   ((charTwo >= '0' && charTwo <= '9') || (charTwo >= 'A' && charTwo <= 'Z'))){
        							valueArray[i] = parseInt(subStr, 16);
        							if(isNaN(valueArray[i])) {
        								correctHEX = false;
        								break;
        							}
        						}
        						else {
        							correctHEX = false;
        							break;
        						}
        					}
        					else {
        						correctHEX = false;
        						break;
        					}
        				}
        			}
        			if(correctHEX){
        				serialPort.writeBytes(valueArray);
        				outTextfield.setValue('');
        			}
        			else {
        				settings = {
							title: 'Incorrect HEX string',
							icon: icons.ATTENTION,
							value: 'HEX string is incorrect, please rectify a mistake and retry operation. Example of correct HEX string: <b>FF O5 OA</b>',
							closeButton: true
						}
						showDialog(terminal, settings);
        			}
        		}
        	}
        	catch(e) {
        		settings = {
					title: 'Writing data error',
					icon: icons.ERROR,
					value: 'Error occurred while writing data',
					closeButton: true
				}
				showDialog(terminal, settings);
        	}
        }
        else {
        	//FIXME
        	//Show dialog (Output string is empty) //Attention
        }
    }
    
    terminal.title = serialPortSettings.portName + ' @ 9600-8-N-1';
    terminal.show();
    
    changeComponentsState(true);
    
}

function createSettingsWindow(terminal, serialPort, serialPortSettings) {
	
	var ports = jSSC.getPortNames();
	if(ports.length == 0){
		//Show message (where is no serial ports in your system)
		//FIXME
		console.log('where is no serial ports in your system');
		return;
	}
    
    var portName = serialPortSettings.portName;
    var baudRate = serialPortSettings.baudRate;
    var dataBits = serialPortSettings.dataBits;
    var stopBits = serialPortSettings.stopBits;
    var parity = serialPortSettings.parity;
    
    var portId = -1;
    
    for(var i = 0; i < ports.length; i++){
    	if(ports[i] == portName){
    		portId = i;
    		break;
    	}
    }
    
    if(portId == -1){
    	portId = 0;
    	baudRate = serialPort.BAUDRATE_9600;
    	dataBits = serialPort.DATABITS_8;
    	stopBits = serialPort.STOPBITS_1;
    	parity = serialPort.PARITY_NONE;
    	
    	//Show message (previously selected port not found)
    	//FIXME
    	console.log('previously selected port not found');
    }
	
	var comboPorts = Ext.create('Ext.form.ComboBox', {
		width: 120,
    	editable: false,
    	labelAlign: 'top',
    	fieldLabel: 'Port name:',
    	labelStyle: 'font-size: 11px; text-align: center',
    	store: Ext.create('Ext.data.Store', {
    		fields: ['id', 'port'],
    		data: getPortNames()
    	}),
		queryMode: 'local',
		displayField: 'port',
		valueField: 'id',
		value: portId
	})
	
	var comboRate = Ext.create('Ext.form.ComboBox', {
		width: 80,
    	editable: false,
    	labelAlign: 'top',
    	fieldLabel: 'Baud rate:',
    	labelStyle: 'font-size: 11px; text-align: center',
    	store: Ext.create('Ext.data.Store', {
    		fields: ['rate', 'display'],
    		data: [
    			{'rate': serialPort.BAUDRATE_110, 'display': 110},
				{'rate': serialPort.BAUDRATE_300, 'display': 300},
				{'rate': serialPort.BAUDRATE_600, 'display': 600},
				{'rate': serialPort.BAUDRATE_1200, 'display': 1200},
				{'rate': serialPort.BAUDRATE_4800, 'display': 4800},
				{'rate': serialPort.BAUDRATE_9600, 'display': 9600},
				{'rate': serialPort.BAUDRATE_14400, 'display': 14400},
				{'rate': serialPort.BAUDRATE_19200, 'display': 19200},
				{'rate': serialPort.BAUDRATE_38400, 'display': 38400},
				{'rate': serialPort.BAUDRATE_57600, 'display': 57600},
				{'rate': serialPort.BAUDRATE_115200, 'display': 115200}
			]
    	}),
		queryMode: 'local',
		displayField: 'display',
		valueField: 'rate',
		value: baudRate
	})
	
	var comboData = Ext.create('Ext.form.ComboBox', {
		width: 80,
    	editable: false,
    	labelAlign: 'top',
    	fieldLabel: 'Data bits:',
    	labelStyle: 'font-size: 11px; text-align: center',
    	store: Ext.create('Ext.data.Store', {
    		fields: ['data', 'display'],
    		data: [
    			{'data': serialPort.DATABITS_5, 'display': 5},
				{'data': serialPort.DATABITS_6, 'display': 6},
				{'data': serialPort.DATABITS_7, 'display': 7},
				{'data': serialPort.DATABITS_8, 'display': 8}
			]
    	}),
		queryMode: 'local',
		displayField: 'display',
		valueField: 'data',
		value: dataBits
	})
	
	var comboStop = Ext.create('Ext.form.ComboBox', {
		width: 80,
    	editable: false,
    	labelAlign: 'top',
    	fieldLabel: 'Stop bits:',
    	labelStyle: 'font-size: 11px; text-align: center',
    	store: Ext.create('Ext.data.Store', {
    		fields: ['stop', 'display'],
    		data: [
    			{'stop': serialPort.STOPBITS_1, 'display': 1},
				{'stop': serialPort.STOPBITS_1_5, 'display': 1.5},
				{'stop': serialPort.STOPBITS_2, 'display': 2}
			]
    	}),
		queryMode: 'local',
		displayField: 'display',
		valueField: 'stop',
		value: stopBits
	})
	
	var comboParity = Ext.create('Ext.form.ComboBox', {
		width: 80,
    	editable: false,
    	labelAlign: 'top',
    	fieldLabel: 'Parity:',
    	labelStyle: 'font-size: 11px; text-align: center',
    	store: Ext.create('Ext.data.Store', {
    		fields: ['parity', 'display'],
    		data: [
    			{'parity': serialPort.PARITY_NONE, 'display': 'None'},
				{'parity': serialPort.PARITY_ODD, 'display': 'Odd'},
				{'parity': serialPort.PARITY_EVEN, 'display': 'Even'},
				{'parity': serialPort.PARITY_MARK, 'display': 'Mark'},
				{'parity': serialPort.PARITY_SPACE, 'display': 'Space'}
			]
    	}),
		queryMode: 'local',
		displayField: 'display',
		valueField: 'parity',
		value: parity
	})
	
	var settings = Ext.create('Ext.window.Window', {
    	title: 'Serial port settings',
    	resizable: false,
    	constrain: true,
    	items: [
    		{
    			dockedItems: [
    				{
    					xtype: 'toolbar',
    					dock: 'bottom',
    					items: [
        					{
        						xtype: 'tbfill'
        					},
        					{
        						text: 'Save',
        						handler: function() {
        							
        							portName = comboPorts.getRawValue();
        							baudRate = comboRate.getValue();
        							dataBits = comboData.getValue();
        							stopBits = comboStop.getValue();
        							parity = comboParity.getValue();
        							
        							serialPortSettings.portName = portName;
        							serialPortSettings.baudRate = baudRate;
        							serialPortSettings.dataBits = dataBits;
        							serialPortSettings.stopBits = stopBits;
        							serialPortSettings.parity = parity;
        							
        							terminal.setTitle(portName + ' @ ' + baudRate + '-' + dataBits + '-' + comboParity.getRawValue()[0] + '-' + (stopBits == serialPort.STOPBITS_1_5 ? '1.5' : stopBits));
        							
        							settings.close();
        						}
        					},
        					{
        						text: 'Cancel',
        						handler: function(){
        							settings.close();
        						}
        					}
        				]
        			}
        		],
    			border: 0,
    			layout: {
    				type: 'hbox',
    				padding: '5 5 5 0',
    				defaultMargins: {top: 0, right: 0, bottom: 0, left: 5}
    			},
    			items: [
    				comboPorts,
    				comboRate,
    				comboData,
    				comboStop,
    				comboParity
				]
			}
		]
    });
    
    settings.on('show', function(){
    	terminal.setDisabled(true);
    });
    
    settings.on('close', function(){
    	terminal.setDisabled(false);
    });
    
    terminal.add(settings);
    settings.show();
}

function showAboutWindow(terminal) {
	
	var dialogWindow = Ext.create('Ext.window.Window', {
    	title: 'About jSSC-Bridge Terminal',
    	resizable: false,
    	constrain: true,
    	width: 400,
    	items: [
    		{
    			dockedItems: [
    				{
    					xtype: 'toolbar',
    					dock: 'bottom',
    					items: [
        					{
        						xtype: 'tbfill'
        					},
        					{
        						text: 'Close',
        						handler: function(){
        							dialogWindow.close();
        						}
        					}
        				]
        			}
        		],
    			border: 0,
    			items: [
    				{
    					border: 0,
    					padding: 5,
    					items: [
    					{
    					xtype: 'label',
    					html: 'This is a free and open source (GPL3 license) '
                              + 'application that demonstrate some functions of jSSC '
                              + '(Java Simple Serial Connector) library and JavaScript jSSC-Bridge. You can use '
                              + 'this terminal for your work and make changes in '
                              + 'source code (under terms of GPL3 license).<br><br>'
                              //+ '<center><strong>Based on jSSC-' + jSSC. + '</strong><br><br></center>'
                              + '<center>Author: Sokolov Alexey (scream3r)</center>'
                             }]
    				}
				]
			}
		]
    });
    
    dialogWindow.on('show', function(){
    	terminal.setDisabled(true);
    });
    
    dialogWindow.on('close', function(){
    	terminal.setDisabled(false);
    });
    
    terminal.add(dialogWindow);
    dialogWindow.show();
}

function showDialog(terminal, settings) {
	
	var dialogWindow = Ext.create('Ext.window.Window', {
    	title: settings.title,
    	resizable: false,
    	constrain: true,
    	width: 400,
    	items: [
    		{
    			dockedItems: [
    				{
    					xtype: 'toolbar',
    					dock: 'bottom',
    					items: [
        					{
        						xtype: 'tbfill'
        					},
        					{
        						text: 'Yes',
        						hidden: !settings.yesButton,
        						handler: function(){
        							if(settings.yesFunc != null){
        								settings.yesFunc();
        							}
        							dialogWindow.close();
        						}
        					},
        					{
        						text: 'No',
        						hidden: !settings.noButton,
        						handler: function(){
        							if(settings.noFunc != null){
        								settings.noFunc();
        							}
        							dialogWindow.close();
        						}
        					},
        					{
        						text: 'Close',
        						hidden: !settings.closeButton,
        						handler: function(){
        							if(settings.closeFunc != null){
        								settings.closeFunc();
        							}
        							dialogWindow.close();
        						}
        					}
        				]
        			}
        		],
    			border: 0,
    			padding: 0,
    			margin: 0,
    			items: [
    				{
    					xtype: 'displayfield',
    					margin: '7 10 10 10',
    					value: '<table border="0">'
    							+ '<tr>'
    							+ (settings.icon != null ? '<td width="42" align="left" valign="top"><img width="32" height="32" src="' + settings.icon + '"></td>' : '')
    							+ '<td>' + settings.value + '</td>'
    							+ '</tr></table>'
    				}
				]
			}
		]
    });
    
    dialogWindow.on('show', function(){
    	terminal.setDisabled(true);
    });
    
    dialogWindow.on('close', function(){
    	terminal.setDisabled(false);
    });
    
    terminal.add(dialogWindow);
    dialogWindow.show();
}

function getPortNames() {
	var ports = jSSC.getPortNames();
	var returnArray = new Array(ports.length);
	for(var i = 0; i < ports.length; i++){
		returnArray[i] = {'id': i, 'port': ports[i]}
	}
	return returnArray;
}