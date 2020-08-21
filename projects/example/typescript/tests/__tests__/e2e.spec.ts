// import { chromium, webkit, devices, BrowserType, WebKitBrowser, ChromiumBrowser, ViewportSize } from 'playwright';

// type IBrowserType = BrowserType<WebKitBrowser> | BrowserType<ChromiumBrowser>;

// interface IBrowserItem {
//   browserType: IBrowserType;
//   browserDevice: {
//     viewport: ViewportSize;
//     userAgent: string;
//   };
//   headless: boolean;
// };

// const browserList = {
//   'iPhone SE': {
//     browserType: webkit,
//     browserDevice: devices['iPhone SE'],
//     headless: true
//   },
//   'iPhone 6': {
//     browserType: webkit,
//     browserDevice: devices['iPhone 6'],
//     headless: true
//   },
//   'iPhone 11 Pro': {
//     browserType: webkit,
//     browserDevice: devices['iPhone 11 Pro'],
//     headless: true
//   },
//   'iPhone 11 Pro landscape': {
//     browserType: webkit,
//     browserDevice: devices['iPhone 11 Pro landscape'],
//     headless: true
//   },
//   'Galaxy S5': {
//     browserType: chromium,
//     browserDevice: devices['Galaxy S5'],
//     headless: true
//   }
// };


describe('Playwright: test', () => {
  
  test('create', done => {
    done();
  });
  
  // const JEST_TIMEOUT = 1000 * 10;
  // Object.keys(browserList).forEach(name => {
  //   const { browserType, browserDevice = {}, headless } = (browserList as any)[name] as IBrowserItem;
  //   test(`Browser Rendering: Target - ${name}`, async (done) => {
  //     const browser = await browserType.launch({ headless, slowMo: 50 });
  //     const context = await browser.newContext({
  //       ...browserDevice
  //     });
  //     const fileName = `${name}-${new Date().toISOString().substr(0, 10)}`;
  //     const page = await context.newPage();
  //     await page.goto('http://localhost:8080');
  //     await page.screenshot({ path: `${__dirname}/screenshots/${fileName}.png` });
  //     await browser.close();
  //     done();
  //   }, JEST_TIMEOUT);
  // });
});
