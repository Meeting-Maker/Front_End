import React, {useState} from 'react';
import Button from './Button';
import Card from './Card';

const ProfilePage = ({name, email}) => {

  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);

  const onSaveEdit = (event) => {
    event.preventDefault();

    setEdit(!edit);
    alert("Your Information Has Been Saved.")

  }

  const onCancelEdit = (event) => {
    setEdit(!edit);
    alert("Your Information Has NOT Been Saved.")
  }

  return (

      <Card width="35%">
        <div className="content">
          <div className="header">
            Profile
          </div>
        </div>

            <div className="content">
              <form className="ui large form" onSubmit={onSaveEdit}>

                  <div className="field">
                    <label className="left aligned">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder={''}
                      value={editName}
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
                      placeholder={''}
                      value={editEmail}
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
                        onClick={onSaveEdit}>
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

          </Card>

  );

};

export default ProfilePage;
