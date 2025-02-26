document.addEventListener('DOMContentLoaded', () => {
  const faviconsContainer = document.getElementById('favicons-container');
  const loadingElement = document.getElementById('loading');
  const emptyElement = document.getElementById('empty');

  // 创建一个状态消息元素
  const statusMessage = document.createElement('div');
  statusMessage.className = 'status-message';
  document.body.appendChild(statusMessage);

  // 显示状态消息的函数
  function showStatus(message) {
    statusMessage.textContent = message;
    statusMessage.style.opacity = '1';
    setTimeout(() => {
      statusMessage.style.opacity = '0';
    }, 2000);
  }

  // 从活动标签页获取图标
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];
    const tabId = tab.id;
    const url = new URL(tab.url);
    const baseUrl = url.origin;
    
    try {
      // 注入并执行脚本来提取图标
      const results = await chrome.scripting.executeScript({
        target: { tabId },
        func: extractFavicons,
        args: [baseUrl]
      });
      
      const favicons = results[0].result;
      
      loadingElement.style.display = 'none';
      
      if (favicons.length === 0) {
        emptyElement.style.display = 'block';
      } else {
        for (const favicon of favicons) {
          createFaviconItem(favicon);
        }
      }
    } catch (error) {
      loadingElement.style.display = 'none';
      emptyElement.textContent = '提取图标时出错：' + error.message;
      emptyElement.style.display = 'block';
      console.error('Error:', error);
    }
  });

  // 在页面中创建图标项
  function createFaviconItem(favicon) {
    const item = document.createElement('div');
    item.className = 'favicon-item';
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'favicon-image';
    
    const img = document.createElement('img');
    img.src = favicon.url;
    img.alt = 'Favicon';
    img.onerror = () => {
      img.src = 'images/broken.png';
      img.alt = '加载失败';
    };
    
    imageContainer.appendChild(img);
    item.appendChild(imageContainer);
    
    const info = document.createElement('div');
    info.className = 'favicon-info';
    info.textContent = favicon.rel || '图标';
    item.appendChild(info);
    
    if (favicon.size) {
      const size = document.createElement('div');
      size.className = 'favicon-size';
      size.textContent = favicon.size;
      item.appendChild(size);
    }
    
    const actions = document.createElement('div');
    actions.className = 'favicon-actions';
    
    const copyButton = document.createElement('button');
    copyButton.textContent = '复制链接';
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(favicon.url)
        .then(() => {
          showStatus('已复制链接到剪贴板');
        })
        .catch((err) => {
          showStatus('复制失败');
          console.error('复制失败:', err);
        });
    });
    
    const downloadButton = document.createElement('button');
    downloadButton.textContent = '下载';
    downloadButton.addEventListener('click', () => {
      const filename = getFilenameFromUrl(favicon.url);
      chrome.downloads.download({
        url: favicon.url,
        filename: filename
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          showStatus('下载失败');
          console.error('下载失败:', chrome.runtime.lastError);
        } else {
          showStatus('开始下载');
        }
      });
    });
    
    actions.appendChild(copyButton);
    actions.appendChild(downloadButton);
    item.appendChild(actions);
    
    faviconsContainer.appendChild(item);
  }
  
  // 从URL中获取文件名
  function getFilenameFromUrl(url) {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const segments = pathname.split('/');
      let filename = segments[segments.length - 1];
      
      // 如果文件名为空或者没有后缀
      if (!filename || !filename.includes('.')) {
        return 'favicon.ico';
      }
      
      return filename;
    } catch (e) {
      return 'favicon.ico';
    }
  }
});

// 在页面中执行的函数，用于提取所有favicon信息
function extractFavicons(baseUrl) {
  // 获取所有link元素中的favicon
  const linkFavicons = Array.from(document.querySelectorAll('link[rel*="icon"]')).map(link => {
    const url = new URL(link.href, baseUrl).href;
    const rel = link.getAttribute('rel');
    const sizes = link.getAttribute('sizes');
    const type = link.getAttribute('type');
    
    return {
      url,
      rel,
      size: sizes || '',
      type: type || ''
    };
  });
  
  // 检查是否有默认的favicon.ico
  const defaultFavicon = {
    url: new URL('/favicon.ico', baseUrl).href,
    rel: 'default-icon',
    size: '',
    type: 'image/x-icon'
  };
  
  // 如果没有找到任何图标，添加默认的favicon.ico
  if (linkFavicons.length === 0) {
    return [defaultFavicon];
  }
  
  // 检查是否已包含默认favicon.ico，如果没有，则添加它
  const hasDefaultFavicon = linkFavicons.some(favicon => 
    favicon.url.toLowerCase().endsWith('/favicon.ico')
  );
  
  if (!hasDefaultFavicon) {
    linkFavicons.push(defaultFavicon);
  }
  
  // 按尺寸排序（如果有的话）
  return linkFavicons.sort((a, b) => {
    // 提取尺寸数字
    const sizeA = a.size ? parseInt(a.size.split('x')[0]) : 0;
    const sizeB = b.size ? parseInt(b.size.split('x')[0]) : 0;
    
    // 按尺寸降序排列
    return sizeB - sizeA;
  });
}