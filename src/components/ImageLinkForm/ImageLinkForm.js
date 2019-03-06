import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures. Enter an image URL below and give it a try.'}
			</p>
			<div className='center'>
				<div className='center form pa3 br3 shadow-5'>
					<input className='f4 pa2 w-70 center'type="tex" onChange={onInputChange} />
					<button 
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onSubmit}>Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;