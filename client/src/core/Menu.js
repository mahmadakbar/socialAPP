import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticate, isActive } from '../auth';

const Menu = ({ history }) => (
  <div>
    <ul className='sidebar'>
      <div className='sidepotition'>
      <li className='sideitem'>
        <Link className='sidelink' style={isActive(history, '/')} to='/'>
          <i class="fas fa-home"></i>
          <span className='span1'>Home</span>
        </Link>
      </li>
      <li className='sideitem'>
        <Link
          className='sidelink'
          style={isActive(history, '/users')}
          to='/users'
        >
          <i class="fas fa-user-friends"></i>
          <span className='span2'>Users</span>
        </Link>
      </li>
      {!isAuthenticate() ? (
        <>
          <li className='sideitem'>
            <Link
              className='sidelink'
              style={isActive(history, '/signup')}
              to='/signin'
            >
              <i class="fas fa-sign-in-alt"></i>
              <span className='span3'>Login</span>
            </Link>
          </li>
          <li className='sideitem'>
            <Link
              className='sidelink'
              style={isActive(history, '/signin')}
              to='/signup'
            >
              <i class="fas fa-clipboard-list"></i>
              <span className='span4'>Register</span>
            </Link>
          </li>
        </>
      ) : (
        ''
      )}

      {isAuthenticate() ? (
        <>
          <li className='sideitem'>
            <Link
              className='sidelink profile'
              style={isActive(history, `/user/${isAuthenticate().user._id}`)}
              to={`/user/${isAuthenticate().user._id}`}
            >
              <i class="fas fa-user"></i>
              <span className='span5'>
              {isAuthenticate().user.name.split(' ').slice(0, 1).join(' ')}'s profile
              </span>
            </Link>
          </li>
          <li className='sideitem'>
            <Link
              className='sidelink'
              style={isActive(
                history,
                `/user/findpeople/${isAuthenticate().user._id}`
              )}
              to={`/user/findpeople/${isAuthenticate().user._id}`}
            >
              <i class="fas fa-search"></i>
              <span className='span6'>Find People</span>
            </Link>
          </li>
          <li className='sideitem'>
            <Link
              className='sidelink post'
              style={isActive(history, `/post/new`)}
              to={`/post/new`}
            >
              <i class="fas fa-plus-square"></i>
              <span className='span7'>Create Post</span>
            </Link>
          </li>
          <li className='sideitem'>
            <a
              className='sidelink signouut'
              style={isActive(history, '/signout', {
                cursor: 'pointer',
                color: '#fff'
              })}
              onClick={() => signout(() => history.push('/'))}
            >
              <i class="fas fa-sign-out-alt"></i>
              <span className='span8'>Sign Out</span>
            </a>
          </li>
        </>
      ) : (
        ''
      )}
    </div>
    </ul>
  </div>
);
export default withRouter(Menu);
