import React, { useState } from 'react';

const CreateCampaignStory = (props) => {
    const { setCampaignStory, setCurrentStep } = props;

    const [story, setStory] = useState(props.story);

    const labelButtonStep = story ? 'Lưu và tiếp tục' : 'Bỏ qua';

    const nextStep = () => {
        setCampaignStory(story.trim());
        setCurrentStep(4);
    }

    return (
        <div>
            <p>Giới thiệu câu chuyện của bạn....</p>
            <form>

                <div class="form-group row">
                    {/* <label className="col-sm-2 col-form-label">Mô tả ngắn</label> */}
                    <div className='col-sm-12'>
                        <textarea class="form-control" rows="3"
                            onChange={(event) => { setStory(event.target.value) }} >
                                {story}
                        </textarea>
                    </div>
                </div>

                <div className="form-group row">
                    <div>
                        <button type="submit" className="btn btn-primary"
                            onClick={nextStep}
                        >{labelButtonStep}</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateCampaignStory;