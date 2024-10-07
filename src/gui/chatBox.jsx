import { h } from 'preact';
import { useState } from 'preact/hooks';

const ChatBox = () => {
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e) => setInputValue(e.target.value);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			setMessages((prevMessages) => [...prevMessages, inputValue]);
			setInputValue('');
		}
	};

	return (
		<div id="chat-box" style={chatBoxStyle}>
			<div id="chat-log">
				{messages.map((message, index) => (
					<p key={index}>{message}</p>
				))}
			</div>
			<input
				type="text"
				placeholder="Type your message..."
				value={inputValue}
				onInput={handleInputChange}
				onKeyPress={handleKeyPress}
				style={inputStyle}
			/>
		</div>
	);
};

const chatBoxStyle = {
	position: 'absolute',
	bottom: '0',
	left: '0',
	width: 'calc(100% - 225px)', // Adjust based on your GUI width
	height: '150px',
	backgroundColor: 'rgba(0, 0, 0, 0.7)',
	border: '2px solid #5D4E3C',
	color: '#fff',
	fontFamily: 'Arial, sans-serif',
	fontSize: '14px',
	padding: '10px',
	overflowY: 'scroll'
};

const inputStyle = {
	width: 'calc(100% - 10px)',
	marginTop: '10px',
	padding: '5px',
	backgroundColor: '#5D4E3C',
	border: 'none',
	color: '#fff'
};

export { ChatBox };