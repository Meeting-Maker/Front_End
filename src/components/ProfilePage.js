import React, {useState} from 'react';
import Button from './Button';

const ProfilePage = ({name, email}) => {

  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');


  const onProfileSave = (event) => {
    event.preventDefault();

    setEdit(!edit);
    alert("Your Information Has Been Saved.")

  }

  const onCancelEdit = (event) => {
    setEdit(!edit);
    alert("Your Information Has NOT Been Saved.")
  }

  return (

      <div className="ui centered grid" style={{paddingTop: "15rem"}}>
        <div className="ui container" style={{width: "35%"}}>
          <div className="ui grey fluid card">

            <div className="content">
              <div className="header">
                Profile
              </div>
            </div>

            <div className="content">
              <form className="ui large form" onSubmit={onProfileSave}>

                  <div className="field">
                    <label className="left aligned">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={e => setEditName(e.target.value)}
                      disabled={!edit}
                    />
                  </div>

                  <div className="field">
                    <label className="left aligned">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={e => setEditEmail(e.target.value)}
                      disabled={!edit}
                    />
                  </div>

                  {
                    edit
                    ?
                    <div>
                      <Button
                        className="custom-button dark thin"
                        type="submit"
                        onClick={onProfileSave}>
                          Save
                      </Button>{' '}
                      <Button
                        className="custom-button dark thin"
                        type="button"
                        onClick={onCancelEdit}>
                          Cancel
                      </Button>
                    </div>
                    :
                    <Button
                      className="custom-button dark thin"
                      type="button"
                      onClick={e => setEdit(!edit)}>
                        Edit
                    </Button>
                  }
                  
              </form>
            </div>

          </div>
        </div>
      </div>

  );

};

export default ProfilePage;
