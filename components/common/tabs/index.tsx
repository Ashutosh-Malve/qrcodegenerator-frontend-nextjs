import { useEffect, useRef, useState } from 'react';

type TabProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: TabProps) => {
  const [state, setState] = useState({
    activeTabIndex: 0,
    tabBackground: { top: 0, height: 0, width: 0, left: 0 },
  });

  const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const currentTab = tabsRef.current[state.activeTabIndex];
      setState((prevState) => ({
        ...prevState,
        tabBackground: {
          top: currentTab?.offsetTop ?? 0,
          height: currentTab?.clientHeight ?? 0,
          width: currentTab?.clientWidth ?? 0,
          left: currentTab?.offsetLeft ?? 0,
        },
      }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [state.activeTabIndex]);

  return (
    <div
      className={
        'mx-auto flex max-w-7xl flex-col-reverse bg-primary pb-24 align-middle font-spline-sans text-6xl font-medium text-secondary md:flex-row md:pt-12'
      }
    >
      <main className={'md:mx-auto'}>{children}</main>
    </div>
  );
};

export default Layout;
