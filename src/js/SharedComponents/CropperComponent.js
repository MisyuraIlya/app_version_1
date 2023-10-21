import React, { useState, useRef } from 'react';
import ReactDOM from "react-dom";
import Cropper, { ReactCropperElement } from "react-cropper";

const CropperComponent = ({img, chat, appId, aspectRatio}) => {
    const [croppTool, setCroppToll] = useState(false)
    const [src, setSrc] = useState('')
    const [fileName, setFileName] = useState('')
    const [preview, setPreview]= useState('')
    const [cropped, setCropped] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const cropperRef = useRef<ReactCropperElement>(null);

    const cropChange = () => {
        cropped ? setCropped(false) : null
    }

    const crop = () => {
		let preview = this.refs.cropper.getCroppedCanvas({'fillColor': '#FFFFFF'}).toDataURL('image/jpeg');
		var image = document.createElement('img');
		image.src = preview;
		var quality;
		var fileSize = this.state.fileSize;
		image.onload = () => {
			if (fileSize) {
				fileSize < 8000000 && fileSize > 6000000 ? quality = 30 : null;
				fileSize < 6000000 && fileSize > 4000000 ? quality = 70 : null;
				fileSize < 4000000 && fileSize > 1000000 ? quality = 80 : null;
				fileSize < 1000000 ? quality = 80 : null;
			} else {
				quality = 100;
			}
			var output_format = 'jpg';
			target_img = jic.compress(image,quality,output_format);
		}
		this.interval = setInterval(() => {
			if (target_img) {
				this.setState({	preview: target_img.src, cropped: true});
				clearInterval(this.interval);
				target_img = "";
			}
		}, 100);
	}

    return (
        <div className={img ? "load-image-wrapper absolute" : "load-image-wrapper"}>
            
            {chat ?
                <div className='addImg'>
                    <ul>
                        {!appId ?
                        <div>
                            <li>
                                <span class="material-symbols-outlined" style={{width:'100%',height:'100%', fontSize:'55px'}}>add_circle</span>
                            </li>
                            <li className="upload">
                                <input id="upload-file" type="file" className="upload" 
                                // onChange={this._onChange} 
                                />
                                <span>הוספת תמונה</span>
                            </li>
                            </div>
                            :
                            <li className="upload" onClick={this.galleryOrCamera}>
                                <div className="selectGalOrCam flex-container">
                                    <div className="col-lg-6">
                                        <div className="btn-cont" onClick={this.uploadImg}>
                                            <img src={globalFileServer + 'icons/photo-camera.svg'} />
                                        </div>
                                        <p>מצלמה</p>
                                    </div>
                                    <div className="btn-cont col-lg-6">
                                        <div onClick={this.openGallery}>
                                            <img src={globalFileServer + 'icons/frame-landscape.svg'} />
                                        </div>
                                        <p>אלבום</p>
                                    </div>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            :
                <div className="addImg-custom">
					<img src={globalFileServer + 'icons/img.svg'} />
					<input 
                        id="upload-file" 
                        type="file" 
                        className="upload" 
                        onChange={this._onChange} 
                    />
                </div>
            }

                {true ? ReactDOM.createPortal(
					<div className="cropp-tool-wrapper">
						<div className="cropp-tool">
							<div className="flex-container">
								<div id="cropp_view" className="col-lg-6 for-cropp">
									<Cropper
										src={"https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"}
										aspectRatio={aspectRatio}
										guides={false}
										checkCrossOrigin={false}
										ref={'cropper'}
										crop={cropChange}
									/>
								</div>
								<div className="col-lg-6">
									<div className='image-preview'>
										{/* <img src={this.state.preview} /> */}
									</div>
								</div>
							</div>
							<ul className="actions">
								<li>
									{true?
										<button onClick={() => this.save} className="button-green">שמור</button>
									:
									<button onClick={() => this._crop.bind(this, true)} className="button-green">גזור</button>
									}
								</li>
								<li><button onClick={() => this.cansel()} className="button-red">ביטול</button></li>
							</ul>
						</div>
					</div>,
					document.getElementById('modal-root')
				)
				: null}

        </div>
    );
};

export default CropperComponent;