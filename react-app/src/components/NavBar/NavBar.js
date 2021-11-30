import React from "react";
import { useEffect, useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import Modal from "../Modal/Modal";
import { addNewQuestion, getFollowedQuestions } from "../../store/question";
import { getSearch, clearQuery } from "../../store/search";

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const search = useSelector(state => state.searchRes);

  const searchRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [modal, setModal] = useState(false);
  const [mainIcon, setMainIcon] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      dispatch(getSearch(query));
    }
  }, [query]);

  const showResults = () => {
    const searchRes = document.querySelector(".searchResults");
    searchRes.style.display = "flex";
  };

  const hideResults = async () => {
    const searchRes = document.querySelector(".searchResults");
    searchRes.style.display = "none";
    setQuery("");
    await dispatch(clearQuery());
  };

  const SearchBar = () => {
    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, []);

    const handleClick = e => {
      if (searchRef.current.contains(e.target)) {
        showResults();
        return;
      }
      hideResults();
      return;
    };

    return (
      <div className="searchBarQuery">
        <div className="searchResults">
          {Object.entries(search).map(question => {
            return (
              <NavLink
                className="result"
                to={`/question/${question[0]}`}
                value={question[1]}
                key={question[0]}
                onClick={e => {
                  hideResults();
                }}
              >
                {question[1]}
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  };

  const submitQuestion = async e => {
    if (!newQuestion) {
      setError("question can not be empty");
      return;
    }

    if (newQuestion.length >= 255) {
      setError("question must be shorter");
      return;
    }

    if (!sessionUser) return;
    dispatch(addNewQuestion(newQuestion, sessionUser.id));
    setError("");
    setModal(false);
    setNewQuestion("");
    history.push("/");
  };

  return (
    <nav>
      <div id={"navContainer"}>
        <NavLink to="/" exact={true} id={"logo"} onClick={e => setMainIcon("")}>
          Coina
        </NavLink>
        <NavLink
          to={`/myprofile/${sessionUser.id}`}
          exact={true}
          activeClassName="active"
          onClick={e => setMainIcon("home")}
        >
          {mainIcon === "home" ? (
            <svg
              onClick={e => setMainIcon("home")}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 17.5a2.5 2.5 0 1 0-5 0v5a.625.625 0 0 1-.533.618l-.092.007H4.5a.625.625 0 0 1-.618-.533l-.007-.092v-9.375H.75a.625.625 0 0 1-.505-.995l.063-.072L11.558.808a.625.625 0 0 1 .797-.072l.087.072 11.25 11.25c.37.37.145.989-.347 1.06l-.095.007h-3.125V22.5a.625.625 0 0 1-.533.618l-.092.007h-4.375a.625.625 0 0 1-.625-.625v-5Z"
                class="icon_svg-fill_as_stroke"
                fill="#b92b27"
              ></path>
            </svg>
          ) : (
            <svg
              onClick={e => setMainIcon("home")}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 17.5a2.5 2.5 0 1 0-5 0v5a.625.625 0 0 1-.533.618l-.092.007H4.5a.625.625 0 0 1-.618-.533l-.007-.092v-9.375H.75a.625.625 0 0 1-.505-.995l.063-.072L11.558.808a.625.625 0 0 1 .797-.072l.087.072 11.25 11.25c.37.37.145.989-.347 1.06l-.095.007h-3.125V22.5a.625.625 0 0 1-.533.618l-.092.007h-4.375a.625.625 0 0 1-.625-.625v-5Z"
                class="icon_svg-fill_as_stroke"
                fill="#666"
              ></path>
            </svg>
          )}
        </NavLink>
        {!sessionUser ? (
          <p>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </p>
        ) : null}
        <NavLink
          to="/following"
          exact={true}
          activeClassName="active"
          onClick={e => setMainIcon("users")}
        >
          {mainIcon === "users" ? (
            <svg
              onClick={e => setMainIcon("users")}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 11.375c2.276 0 4.125 1.823 4.125 4.076V22.5c0 .345-.28.625-.625.625h-7a.625.625 0 0 1-.625-.625v-7.049c0-2.253 1.849-4.076 4.125-4.076zm-7-2c1.376 0 2.638.671 3.403 1.771a.625.625 0 1 1-1.027.713A2.884 2.884 0 0 0 5 10.624c-1.533 0-2.783 1.178-2.87 2.66l-.005.166-.001 8.424h4.127c.314 0 .574.231.618.533l.007.092a.624.624 0 0 1-.533.618l-.092.007H1.5a.624.624 0 0 1-.618-.533L.875 22.5v-9.049c0-2.253 1.849-4.076 4.125-4.076zm14.001 0c2.276 0 4.125 1.823 4.125 4.076V22.5l-.007.092a.626.626 0 0 1-.618.533H17.75l-.092-.007a.626.626 0 0 1-.533-.618l.007-.092a.626.626 0 0 1 .618-.533h4.126v-8.424l-.005-.166c-.087-1.482-1.337-2.66-2.87-2.66-.963 0-1.844.468-2.377 1.235a.625.625 0 1 1-1.027-.713A4.133 4.133 0 0 1 19 9.375zM12 12.625c-1.59 0-2.875 1.267-2.875 2.826v6.424h5.75v-6.424c0-1.503-1.195-2.735-2.706-2.821zm0-10a3.86 3.86 0 0 1 2.641 1.039c.743.652 1.234 1.541 1.234 2.461v.625A3.89 3.89 0 0 1 12 10.375a3.875 3.875 0 0 1-3.867-3.624l-.008-.001v-.625c0-.919.491-1.809 1.234-2.461A3.861 3.861 0 0 1 12 2.625zm2.613 4.126H9.387a2.625 2.625 0 0 0 5.226 0zM19.192.625h.158l.082.003.073.004.048.003.111.011.033.004-.144-.015a3.875 3.875 0 0 1 3.432 2.831 3.87 3.87 0 0 1 .135 1.237l-.002 2.176.022.188.025.152.012.06.059.012c.376.096.655.549.392.947l-.056.074a2.34 2.34 0 0 1-.429.381c-.848.596-1.86.578-2.695-.443l-.042-.053a3.87 3.87 0 0 1-3.362-.512.625.625 0 1 1 .712-1.028 2.626 2.626 0 0 0 2.672.188c.639-.453.834-1.328.415-2.046-.049-.097-.196-.263-.419-.458a7.85 7.85 0 0 0-.569-.448l-.819-.549-.042-.027-1.875 1.237a.625.625 0 0 1-.839-.14l-.053-.082-.452-.823a.63.63 0 0 1-.108-.321v-.02a.627.627 0 0 1 .056-.282A3.875 3.875 0 0 1 18.355.729l.042-.009.151-.032.03-.005.353-.046.06-.004.147-.007zm-14.505 0h.093l.103.002.086.004.118.008.104.01.072.009.123.019.082.014.07.014.314.079.042.013a3.85 3.85 0 0 1 .666.275c.148.079.292.167.429.264a3.86 3.86 0 0 1 .649.578l.113.132c.102.125.195.254.28.39l.057.094.005.009a3.89 3.89 0 0 1 .186.359.667.667 0 0 1 .048.158c.05.216.042.44-.018.634-.134.503-.531.948-1.088.948-.372 0-.678-.203-1.034-.56l-.354-.392-.158-.198-.309.253c-.297.23-.612.446-.949.649l-.344.198a6.762 6.762 0 0 1-1.882.491 2.62 2.62 0 0 0 1.04 1.56 2.626 2.626 0 0 0 3.014.018.625.625 0 1 1 .712 1.028 3.876 3.876 0 0 1-6.071-3.48 3.86 3.86 0 0 1 .248-1.099l.026-.064.047-.112.04-.087.023-.049.036-.072.025-.048.057-.103.03-.052.064-.104.048-.074.062-.09.054-.074.056-.073.07-.087.054-.063.063-.071.068-.072.069-.07.069-.066.063-.058.097-.084.047-"
                fill="#b92b27"
              ></path>
            </svg>
          ) : (
            <svg
              onClick={e => setMainIcon("users")}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 11.375c2.276 0 4.125 1.823 4.125 4.076V22.5c0 .345-.28.625-.625.625h-7a.625.625 0 0 1-.625-.625v-7.049c0-2.253 1.849-4.076 4.125-4.076zm-7-2c1.376 0 2.638.671 3.403 1.771a.625.625 0 1 1-1.027.713A2.884 2.884 0 0 0 5 10.624c-1.533 0-2.783 1.178-2.87 2.66l-.005.166-.001 8.424h4.127c.314 0 .574.231.618.533l.007.092a.624.624 0 0 1-.533.618l-.092.007H1.5a.624.624 0 0 1-.618-.533L.875 22.5v-9.049c0-2.253 1.849-4.076 4.125-4.076zm14.001 0c2.276 0 4.125 1.823 4.125 4.076V22.5l-.007.092a.626.626 0 0 1-.618.533H17.75l-.092-.007a.626.626 0 0 1-.533-.618l.007-.092a.626.626 0 0 1 .618-.533h4.126v-8.424l-.005-.166c-.087-1.482-1.337-2.66-2.87-2.66-.963 0-1.844.468-2.377 1.235a.625.625 0 1 1-1.027-.713A4.133 4.133 0 0 1 19 9.375zM12 12.625c-1.59 0-2.875 1.267-2.875 2.826v6.424h5.75v-6.424c0-1.503-1.195-2.735-2.706-2.821zm0-10a3.86 3.86 0 0 1 2.641 1.039c.743.652 1.234 1.541 1.234 2.461v.625A3.89 3.89 0 0 1 12 10.375a3.875 3.875 0 0 1-3.867-3.624l-.008-.001v-.625c0-.919.491-1.809 1.234-2.461A3.861 3.861 0 0 1 12 2.625zm2.613 4.126H9.387a2.625 2.625 0 0 0 5.226 0zM19.192.625h.158l.082.003.073.004.048.003.111.011.033.004-.144-.015a3.875 3.875 0 0 1 3.432 2.831 3.87 3.87 0 0 1 .135 1.237l-.002 2.176.022.188.025.152.012.06.059.012c.376.096.655.549.392.947l-.056.074a2.34 2.34 0 0 1-.429.381c-.848.596-1.86.578-2.695-.443l-.042-.053a3.87 3.87 0 0 1-3.362-.512.625.625 0 1 1 .712-1.028 2.626 2.626 0 0 0 2.672.188c.639-.453.834-1.328.415-2.046-.049-.097-.196-.263-.419-.458a7.85 7.85 0 0 0-.569-.448l-.819-.549-.042-.027-1.875 1.237a.625.625 0 0 1-.839-.14l-.053-.082-.452-.823a.63.63 0 0 1-.108-.321v-.02a.627.627 0 0 1 .056-.282A3.875 3.875 0 0 1 18.355.729l.042-.009.151-.032.03-.005.353-.046.06-.004.147-.007zm-14.505 0h.093l.103.002.086.004.118.008.104.01.072.009.123.019.082.014.07.014.314.079.042.013a3.85 3.85 0 0 1 .666.275c.148.079.292.167.429.264a3.86 3.86 0 0 1 .649.578l.113.132c.102.125.195.254.28.39l.057.094.005.009a3.89 3.89 0 0 1 .186.359.667.667 0 0 1 .048.158c.05.216.042.44-.018.634-.134.503-.531.948-1.088.948-.372 0-.678-.203-1.034-.56l-.354-.392-.158-.198-.309.253c-.297.23-.612.446-.949.649l-.344.198a6.762 6.762 0 0 1-1.882.491 2.62 2.62 0 0 0 1.04 1.56 2.626 2.626 0 0 0 3.014.018.625.625 0 1 1 .712 1.028 3.876 3.876 0 0 1-6.071-3.48 3.86 3.86 0 0 1 .248-1.099l.026-.064.047-.112.04-.087.023-.049.036-.072.025-.048.057-.103.03-.052.064-.104.048-.074.062-.09.054-.074.056-.073.07-.087.054-.063.063-.071.068-.072.069-.07.069-.066.063-.058.097-.084.047-"
                fill="#666"
              ></path>
            </svg>
          )}
        </NavLink>
        <div className="search">
          <div className="dashboard-search">
            <div className="searchIcon">
              <svg
                className="search-logo"
                fill="none"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M15.3201 16.7344C14.0741 17.5354 12.5913 18 11 18C6.58172 18 3 14.4183 3 10C3
                  5.58172 6.58172 2 11 2C15.4183 2 19 5.58172 19 10C19 12.1038 18.1879 14.0179 16.8601 15.446L21.7071
                  20.293L20.2928 21.7072L15.3201 16.7344ZM17 10C17 13.3137 14.3137 16 11 16C7.68629 16 5 13.3137 5 10C5 6.68629
                  7.68629 4 11 4C14.3137 4 17 6.68629 17 10Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>

            <div className="searchbar" ref={searchRef}>
              <input
                type="search"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  showResults();
                }}
                style={{
                  width: "100%",
                  height: 44,
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                }}
                placeholder="Search Coina"
                type="search"
                className="SB"
              ></input>

              <SearchBar />
            </div>
          </div>
        </div>
        <button
          id={"askQuestionButtonNav"}
          onClick={() => {
            setModal(true);
          }}
        >
          Add question
        </button>
        <p>
          <LogoutButton />
        </p>
      </div>
      <Modal
        title={`Add Question`}
        show={modal}
        onClose={() => setModal(false)}
      >
        <div id={"askQuestionModal"}>
          <p id={"askQuestionName"}>{sessionUser.username}</p>
          {error ? (
            <p style={{ color: "red", textAlign: "center", margin: "0px" }}>
              {error}
            </p>
          ) : null}
          <input
            id={"askQuestionInput"}
            value={newQuestion}
            placeholder={`Start your question with "What", "How", "Why", etc.`}
            onChange={e => setNewQuestion(e.target.value)}
          ></input>
          <div id={"askQuestionModalBottom"}>
            <p id={"askQuestionModalCancel"} onClick={() => setModal(false)}>
              Cancel
            </p>
            <button
              id={"askQuestionButton"}
              onClick={() => {
                submitQuestion();
              }}
            >
              Add question
            </button>
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default NavBar;
