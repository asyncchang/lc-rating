"use client";

import { GithubBasicBadge as GithubBadge } from "@components/GithubBadge";
import SettingsPanel from "@components/SettingsPanel";
import ThemeSwitchButton from "@components/ThemeSwitchButton";
import { useTheme } from "@hooks/useTheme";
import Link from "next/dist/client/link";
import { useState } from "react";
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";

const questList = [
  {
    title: "滑動窗口",
    link: "/list/slide_window",
  },
  {
    title: "二分查找",
    link: "/list/binary_search",
  },
  {
    title: "單調棧",
    link: "/list/monotonic_stack",
  },
  {
    title: "網格圖",
    link: "/list/grid",
  },

  {
    title: "位運算",
    link: "/list/bitwise_operations",
  },
  {
    title: "圖論算法",
    link: "/list/graph",
  },
  {
    title: "動態規劃",
    link: "/list/dynamic_programming",
  },
  {
    title: "數據結構",
    link: "/list/data_structure",
  },

  {
    title: "數學",
    link: "/list/math",
  },
  {
    title: "貪心",
    link: "/list/greedy",
  },
  {
    title: "樹和二叉樹",
    link: "/list/trees",
  },
  {
    title: "字符串",
    link: "/list/string",
  },
];

export default function () {
  const { theme, toggleTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Navbar sticky="top" className="p-0">
      <Container className="">
        <Navbar.Brand>力扣競賽題目</Navbar.Brand>
        <div className="d-flex flex-fill d-md-none d-lg-none justify-content-end pe-2">
          <span
            className="btn d-flex rounded-circle p-1"
            onClick={() => {
              toggleTheme();
            }}
          >
            <ThemeSwitchButton height={24} width={24} theme={theme} />
          </span>
          <Link
            href="https://github.com/huxulm/lc-rating"
            className="btn d-flex p-1 ms-2 rounded-circle"
          >
            {/* <GithubProfile width={24} height={24} classname="p-1" /> */}
          </Link>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="me-auto">
            <Link
              href="/"
              className="nav-link"
              style={{
                width: "fit-content",
              }}
            >
              <Button id="nav-cl" className="fw-bold fs-6 p-1">
                競賽列表
              </Button>
            </Link>

            <Link
              href="/zen"
              className="nav-link"
              style={{
                width: "fit-content",
              }}
            >
              <Button id="nav-tr" className="fw-bold fs-6 p-1">
                難度練習
              </Button>
            </Link>

            <Link
              href="/search"
              className="nav-link"
              style={{
                width: "fit-content",
              }}
            >
              <Button id="nav-0x3f" className="fw-bold fs-6 p-1">
                💡0x3F
              </Button>
            </Link>

            <Link
              href="#"
              className="nav-link"
              style={{
                width: "fit-content",
              }}
            >
              <Button
                id="nav-pg"
                className="fw-bold fs-6 p-1"
                onClick={handleOpenModal}
              >
                站點設置
              </Button>
            </Link>
            <SettingsPanel show={showModal} onHide={handleCloseModal} />

            <Dropdown
              className="nav-link"
              show={showDropdown}
              onToggle={(showDropdown) => setShowDropdown(showDropdown)}
            >
              <Dropdown.Toggle id="nav-pl">📑題單</Dropdown.Toggle>

              <Dropdown.Menu>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  {questList.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      className="text-center"
                    >
                      <Button
                        className="fw-bold w-100"
                        style={{
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => setShowDropdown(false)}
                      >
                        📑{item.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Link
              href="https://huxulm.github.io/lc-rating"
              className="nav-link"
              style={{
                width: "fit-content",
              }}
            >
              <Button id="nav-tr" className="fw-bold fs-6 p-1">
                {`👉新版🎉`}
              </Button>
            </Link>
          </Nav>
          <span className="navbar-brand fs-6 fw-semibold">
            題解來自{" "}
            <Link
              href="https://space.bilibili.com/206214/"
              target="_blank"
              className="link fw-bold text-danger"
            >
              bilibili@靈茶山艾府
            </Link>{" "}
            感謝！
          </span>
          <span
            className="btn d-flex rounded-circle p-1 d-none d-lg-block d-xl-block d-sm-none"
            onClick={() => {
              toggleTheme();
            }}
          >
            <ThemeSwitchButton height={24} width={24} theme={theme} />
          </span>
          <Link
            href="https://github.com/huxulm/lc-rating"
            target="_blank"
            className="d-flex p-1 ms-2 d-none d-lg-block d-xl-block d-sm-none"
            rel="noreferrer"
          >
            {/* @ts-ignore */}
            <GithubBadge
              url="https://github.com/huxulm/lc-rating"
              theme="system"
              text=""
              icon="octocat"
            />
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}