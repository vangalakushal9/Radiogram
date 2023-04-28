import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../Components/Common/TableContainer';
import DeleteModal from "../../Components/Common/DeleteModal";

// Import Scroll Bar - SimpleBar
import SimpleBar from 'simplebar-react';

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

import {
  getTaskList,
  addNewTask,
  updateTask,
  deleteTask,
} from "../../store/actions";

import {
  OrdersId,
  Project,
  CreateBy,
  DueDate,
  Status,
  Priority
} from "./CenterListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Components/Common/Loader";

const Assigned = [
  { id: 1, imgId: "anna-adame", img: "avatar-1.jpg", name: "Anna Adame" },
  { id: 2, imgId: "frank-hook", img: "avatar-3.jpg", name: "Frank Hook" },
  { id: 3, imgId: "alexis-clarke", img: "avatar-6.jpg", name: "Alexis Clarke" },
  { id: 4, imgId: "herbert-stokes", img: "avatar-2.jpg", name: "Herbert Stokes" },
  { id: 5, imgId: "michael-morris", img: "avatar-7.jpg", name: "Michael Morris" },
  { id: 6, imgId: "nancy-martino", img: "avatar-5.jpg", name: "Nancy Martino" },
  { id: 7, imgId: "thomas-taylor", img: "avatar-8.jpg", name: "Thomas Taylor" },
  { id: 8, imgId: "tonya-noble", img: "avatar-10.jpg", name: "Tonya Noble" },
];


const AllCenters = () => {
  const dispatch = useDispatch();

  const { taskList, isTaskCreated, isTaskSuccess, error } = useSelector((state) => ({
    taskList: state.Tasks.taskList,
    isTaskCreated: state.Tasks.isTaskCreated,
    isTaskSuccess: state.Tasks.isTaskSuccess,
    error: state.Tasks.error,
  }));

  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState([]);
  const [TaskList, setTaskList] = useState([]);

  // Delete Task
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTask(null);
    } else {
      setModal(true);
      setDate(defaultdate());
    }
  }, [modal]);

  // Delete Data
  const onClickDelete = (task) => {
    setTask(task);
    setDeleteModal(true);
  };

  useEffect(() => {
    setTaskList(taskList);
  }, [taskList]);

  // Delete Data
  const handleDeleteTask = () => {
    if (task) {
      dispatch(deleteTask(task._id));
      setDeleteModal(false);
    }
  };

  const toggleRightCanvas = () => {
    setIsRight(!isRight);
};

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      taskId: (task && task.taskId) || '',
      project: (task && task.project) || '',
      task: (task && task.task) || '',
      creater: (task && task.creater) || '',
      dueDate: (task && task.dueDate) || '',
      status: (task && task.status) || 'New',
      priority: (task && task.priority) || 'High',
      subItem: (task && task.subItem) || [],
    },
    validationSchema: Yup.object({
      taskId: Yup.string().required("Please Enter Task Id"),
      project: Yup.string().required("Please Enter Project Name"),
      task: Yup.string().required("Please Enter Your Task"),
      creater: Yup.string().required("Please Enter Creater Name"),
      // dueDate: Yup.string().required("Please Enter Due Date"),
      status: Yup.string().required("Please Enter Status"),
      priority: Yup.string().required("Please Enter Priority"),
      subItem: Yup.array().required("Please Enter")
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updatedTask = {
          _id: task ? task._id : 0,
          taskId: values.taskId,
          project: values.project,
          task: values.task,
          creater: values.creater,
          dueDate: date,
          status: values.status,
          priority: values.priority,
          subItem: values.subItem,
        };
        // update customer
        dispatch(updateTask(updatedTask));
        validation.resetForm();
      } else {
        const newTask = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          taskId: values["taskId"],
          project: values["project"],
          task: values["task"],
          creater: values["creater"],
          dueDate: date,
          status: values["status"],
          priority: values["priority"],
          subItem: values["subItem"],
        };
        // save new customer
        dispatch(addNewTask(newTask));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Update Data
  const handleCustomerClick = useCallback((arg) => {
    const task = arg;

    setTask({
      _id: task._id,
      taskId: task.taskId,
      project: task.project,
      task: task.task,
      creater: task.creater,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      subItem: task.subItem,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Add Data
  const handleTaskClicks = () => {
    setTask("");
    setIsEdit(false);
    toggle();
  };

  // Get Data
  useEffect(() => {
    if (!isEmpty(taskList)) setTaskList(taskList);
  }, [taskList]);

  useEffect(() => {
    if (taskList && !taskList.length) {
      dispatch(getTaskList());
    }
  }, [dispatch, taskList]);


  useEffect(() => {
    setTaskList(taskList);
  }, [taskList]);

  useEffect(() => {
    if (!isEmpty(taskList)) {
      setTaskList(taskList);
      setIsEdit(false);
    }
  }, [taskList]);

  // Node API 
  // useEffect(() => {
  //   if (isTaskCreated) {
  //     setTask(null);
  //     dispatch(getTaskList());
  //   }
  // }, [
  //   dispatch,
  //   isTaskCreated,
  // ]);

  // Checked All
  const checkedAll = () => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".taskCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
  };

  // Delete Multiple
  const deleteMultiple = () => {
    const ele = document.querySelectorAll(".taskCheckBox:checked");
    const checkall = document.getElementById("checkBoxAll");
    ele.forEach((element) => {
      dispatch(deleteTask(element.value));
    });
    checkall.checked = false;
  };
  

  const columns = useMemo(
    () => [
      // {
      //   Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
      //   Cell: (cellProps) => {
      //     return <input type="checkbox" className="taskCheckBox form-check-input" value={cellProps.row.original._id} />;
      //   },
      //   id: '#',
      // },
      {
        Header: "Registration ID",
        accessor: "taskId",
        filterable: false,
        Cell: (cellProps) => {
          return <OrdersId {...cellProps} />;
        },
      },
      {
        Header: "Imaging Center Name",
        accessor: "project",
        filterable: false,
        Cell: (cellProps) => {
          return <Project {...cellProps} />;
        },
      },
      {
        Header: "Phone Number",
        accessor: "task",
        filterable: false,
        Cell: (cellProps) => {
          return <React.Fragment>
            <div className="d-flex">
              <div className="flex-grow-1 tasks_name">{cellProps.value}</div>
              
            </div>
          </React.Fragment>;
        },
      },
      {
        Header: "Email",
        accessor: "creater",
        filterable: false,
        Cell: (cellProps) => {
          return <CreateBy {...cellProps} />;
        },
      },
      {
        Header: "Modality",
        accessor: "subItem",
        filterable: false,
        Cell: (cell) => {
          const assigned = cell.value.map((item) => item.img ? item.img : item);
          return (<React.Fragment>
            <div className="avatar-group">
              {assigned.map((item, index) => (
                <Link key={index} to="#" className="avatar-group-item">
                  <img src={process.env.REACT_APP_API_URL + "/images/users/" + item} alt="" className="rounded-circle avatar-xxs" />
                </Link>
              ))}

            </div>
          </React.Fragment>);
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: false,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Created Date",
        accessor: "dueDate",
        filterable: false,
        Cell: (cellProps) => {
          return <DueDate {...cellProps} />;
        },
      },
      {
        Header: "Is Active?",
        accessor: "isactive",
        filterable: false,
        Cell: (cellProps) => {
          return <Priority {...cellProps} />;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        filterable: false,
        Cell: (cellProps) => {
          return <React.Fragment>
            <div className="flex-shrink-0 ms-4">
                <ul className="list-inline tasks-list-menu mb-0">
                  <li className="list-inline-item">
                    <Link to="/apps-tasks-details">
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" onClick={() => { const taskData = cellProps.row.original; handleCustomerClick(taskData); }}>
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="remove-item-btn" onClick={() => { const taskData = cellProps.row.original; onClickDelete(taskData); }}>
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                </ul>
              </div>
          </React.Fragment>
        },
      },
    ],
    [handleCustomerClick]
  );

  const defaultdate = () => {
    let d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear()).toString());
  };

  const [date, setDate] = useState(defaultdate());

  const dateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setDate(joinDate);
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteTask}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1 text-muted">List of Imaging Centers</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-danger add-btn me-1" onClick={toggleRightCanvas}><i className="ri-add-line align-bottom me-1"></i> Add Imaging Centers</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-body pt-0">
              {isTaskSuccess && taskList.length ? (
                <TableContainer
                  columns={columns}
                  data={(taskList || [])}
                  isGlobalFilter={true}
                  isAddUserList={false}
                  customPageSize={8}
                  className="custom-header-css"
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  theadClass="table-light text-muted table-nowrap"
                  thClass="table-light text-muted"
                  handleTaskClick={handleTaskClicks}
                  isTaskListFilter={true}
                  SearchPlaceholder="Search"
                />
              ) : (<Loader error={error} />)
              }
              <ToastContainer closeButton={false} />
            </div>
          </div>
        </Col>
      </div>


      <Offcanvas
                isOpen={isRight}
                direction="end"
                toggle={toggleRightCanvas}
                id="offcanvasRight"
                className="border-bottom"
            >
                <OffcanvasHeader toggle={toggleRightCanvas} id="offcanvasRightLabel">
                    Add Imaging Center
                </OffcanvasHeader>
                <OffcanvasBody className="p-0 overflow-hidden">
                    {/* <SimpleBar style={{ height: "100vh" }}>
                        <div className="acitivity-timeline p-4">
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar1} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Oliver Phillips <span className="badge bg-soft-primary text-primary align-middle">New</span></h6>
                                    <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                    <small className="mb-0 text-muted">Today</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                    <div className="avatar-title bg-soft-success text-success rounded-circle">
                                        N
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Nancy Martino <span className="badge bg-soft-secondary text-secondary align-middle">In Progress</span></h6>
                                    <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                    <div className="avatar-group mb-2">
                                        <Link to="#" className="avatar-group-item" id="Christi">
                                            <img src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                        </Link>
                                        <UncontrolledTooltip placement="top" target="Christi" > Christi </UncontrolledTooltip>
                                        <UncontrolledTooltip placement="top" target="Frank" > Frank Hook </UncontrolledTooltip>
                                        <UncontrolledTooltip placement="top" target="Ruby" > Ruby </UncontrolledTooltip>
                                        <UncontrolledTooltip placement="top" target="more" > more </UncontrolledTooltip>
                                        <Link to="#" className="avatar-group-item" id="Frank">
                                            <img src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                        </Link>
                                        <UncontrolledTooltip placement="top" target="Frank" > Frank Hook </UncontrolledTooltip>

                                        <Link to="#" className="avatar-group-item" id="Ruby">
                                            <div className="avatar-xs">
                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                    R
                                                </div>
                                            </div>
                                        </Link>
                                        <UncontrolledTooltip placement="top" target="Ruby" > Ruby </UncontrolledTooltip>

                                        <Link to="#" className="avatar-group-item" id="more">
                                            <div className="avatar-xs">
                                                <div className="avatar-title rounded-circle">
                                                    2+
                                                </div>
                                            </div>
                                        </Link>
                                        <UncontrolledTooltip placement="top" target="more" > more </UncontrolledTooltip>

                                    </div>
                                    <small className="mb-0 text-muted">Yesterday</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar2} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Natasha Carey <span className="badge bg-soft-success text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">Adding a new event with attachments</p>
                                    <div className="row border border-dashed gx-2 p-2 mb-2">
                                        <Col className="col-4">
                                            <img src={img2} alt="" className="img-fluid rounded" />
                                        </Col>
                                        <Col className="col-4">
                                            <img src={img3} alt="" className="img-fluid rounded" />
                                        </Col>
                                        <Col className="col-4">
                                            <img src={img4} alt="" className="img-fluid rounded" />
                                        </Col>
                                    </div>
                                    <small className="mb-0 text-muted">25 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar6} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Bethany Johnson</h6>
                                    <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                    <small className="mb-0 text-muted">19 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-soft-danger text-danger">
                                            <i className="ri-shopping-bag-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Your order is placed <span className="badge bg-soft-danger text-danger align-middle ms-1">Out of Delivery</span></h6>
                                    <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                    <small className="mb-0 text-muted">16 Nov</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar7} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Lewis Pratt</h6>
                                    <p className="text-muted mb-2">They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. </p>
                                    <small className="mb-0 text-muted">22 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs acitivity-avatar">
                                        <div className="avatar-title rounded-circle bg-soft-info text-info">
                                            <i className="ri-line-chart-line"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Monthly sales report</h6>
                                    <p className="text-muted mb-2"><span className="text-danger">2 days left</span> notification to submit the monthly sales report. <Link to="#" className="link-warning text-decoration-underline">Reports Builder</Link></p>
                                    <small className="mb-0 text-muted">15 Oct</small>
                                </div>
                            </div>
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <img src={avatar8} alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">New ticket received <span className="badge bg-soft-success text-success align-middle">Completed</span></h6>
                                    <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                    <small className="mb-0 text-muted">26 Aug</small>
                                </div>
                            </div>
                        </div>
                    </SimpleBar> */}
                </OffcanvasBody>
                <div className="offcanvas-foorter border p-3 text-center">
                    {/* <Link to="#" className="link-success">View All Acitivity <i className="ri-arrow-right-s-line align-middle ms-1"></i></Link> */}
                </div>
            </Offcanvas>
    </React.Fragment>
  );
};

export default AllCenters;