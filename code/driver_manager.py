'''
 *
 * Copyright (C) 2020 Universitat Politècnica de Catalunya.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
'''

# -*- coding: utf-8 -*-

# Basic modules
import time
import logging
import logging.config
import re
# 3rd party modules
from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.common.exceptions import UnexpectedAlertPresentException, InvalidSessionIdException

# Own modules
import config
from data_manager import get_network, manage_request

logging.config.fileConfig('../logging.conf')

logger = logging.getLogger("DRIVER_MANAGER")

from selenium.webdriver.common.keys import Keys

def build_driver(plugin, cache, process):
    """ Creates the selenium driver to be used by the script and loads the corresponding plugin if needed. """

    try:
        chrome_options = webdriver.ChromeOptions()
        # Clean cache/cookies if not specified to maintain
        if not cache:
            chrome_options.add_argument('--media-cache-size=0')
            chrome_options.add_argument('--v8-cache-options=off')
            chrome_options.add_argument('--disable-gpu-program-cache')
            chrome_options.add_argument('--gpu-program-cache-size-kb=0')
            chrome_options.add_argument('--disable-gpu-shader-disk-cache')
            chrome_options.add_argument('--disk-cache-dir=/tmp')
            chrome_options.add_argument('--disable-dev-shm-usage')
            chrome_options.add_argument('--v8-cache-strategies-for-cache-storage=off')
            chrome_options.add_argument('--mem-pressure-system-reserved-kb=0')
            chrome_options.set_capability("applicationCacheEnabled", False)
            chrome_options.add_extension(config.CLEANER_PLUGIN_PATH)

        # Set Devtools Protocol to start taking network logs
        chrome_options.set_capability("loggingPrefs", {'performance': 'ALL'})
        chrome_options.add_experimental_option('w3c', False)

        # Load received plugin (except for vanilla)
        if plugin.values["name"] != "Vanilla":
            chrome_options.add_extension(plugin.values['path'])
        driver = webdriver.Chrome(options=chrome_options)
        if plugin.values["name"] != "Vanilla" and plugin.values['custom']:
            driver.get(plugin.values['url'])
            time.sleep(3)
            driver.switch_to.frame(0)
            driver.find_element_by_xpath(plugin.values['xpath_to_click']).click()
            time.sleep(20)
            driver.switch_to.window(driver.window_handles[0])
#            driver.close()
#            driver.switch_to.window(driver.window_handles[0])
        return driver
    except Exception as e:
        # logger.error(e)
        logger.error("(proc. %d) Error creating driver: %s" % (process, str(e)))
        return 0


def reset_browser(driver, process, plugin, cache):
    """ Reset the browser to the default state. """

    try:
        driver.switch_to.default_content()
        if not cache:
            driver.delete_all_cookies()
    except UnexpectedAlertPresentException:
        try:
            alert = driver.switch_to.alert
            alert.dismiss()
        except Exception as e:
            # logger.error(e)
            logger.error("(proc. %d) Error #4: %s" % (process, str(e)))
            driver.close()
            driver = build_driver(plugin, cache, process)
            while not driver:
                driver = build_driver(plugin, cache, process)
            driver.set_page_load_timeout(30)
    except InvalidSessionIdException as e:
        logger.error("(proc. %d) Error #6: %s" % (process, str(e)))
        driver = build_driver(plugin, cache, process)
        while not driver:
            driver = build_driver(plugin, cache, process)
        driver.set_page_load_timeout(30)
    except Exception as e:
        logger.error("(proc. %d) Error #5: %s" % (process, str(e)))
        driver.close()
        driver = build_driver(plugin, cache, process)
        while not driver:
            driver = build_driver(plugin, cache, process)
        driver.set_page_load_timeout(30)
    return driver
def clickonall(list,matched,driver,domain):
    for element in list['Found']:
        try:
            hashref = element.get_attribute('href')
            tagtype = element.tag_name
            if (not ('all Rights' in element.text or 'all rights' in element.text or 'All rights' in element.text or 'All Rights' in element.text) and hashref == None and (tagtype == 'span' or tagtype=='button' or tagtype=='input' or tagtype=='a')):
                if(matched=='ok' and re.search('(^|\s)+ok+(\s|$)',element.text.lower())!=None):
                        element.click()
                        list['Clicked'] = True
                        handles2 = len(driver.window_handles)
                        if handles2 != 1:
                            logger.info(
                                "{} opened multiple windows in total: {}".format(domain.values["name"], handles2))
                        while handles2 > 1:
                            driver.switch_to.window(driver.window_handles[1])
                            driver.close()
                            handles2 = len(driver.window_handles)
                            driver.switch_to.window(driver.window_handles[0])
                elif(matched=='all' and re.search('(^|\s)+all+(\s|$)',element.text.lower())!=None):
                        element.click()
                        list['Clicked'] = True
                        handles2 = len(driver.window_handles)
                        if handles2 != 1:
                            logger.info(
                                "{} opened multiple windows in total: {}".format(domain.values["name"], handles2))
                        while handles2 > 1:
                            driver.switch_to.window(driver.window_handles[1])
                            driver.close()
                            handles2 = len(driver.window_handles)
                            driver.switch_to.window(driver.window_handles[0])
                elif(matched!='all' and matched!='ok'):
                    element.click()
                    list['Clicked'] = True
                    handles2 = len(driver.window_handles)
                    if handles2 != 1:
                        logger.info(
                            "{} opened multiple windows in total: {}".format(domain.values["name"], handles2))
                    while handles2 > 1:
                        driver.switch_to.window(driver.window_handles[1])
                        driver.close()
                        handles2 = len(driver.window_handles)
                        driver.switch_to.window(driver.window_handles[0])
        except:
            pass
def find_patterns(driver,found,domain):
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"accept")]')
        clickonall(found, 'accept',driver,domain)

    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"enable")]')
        clickonall(found, 'enable',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"all")]')
        clickonall(found, 'all',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"got")]')
        clickonall(found, 'got',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"yes")]')
        clickonall(found, 'yes',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"agree")]')
        clickonall(found, 'agree',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"acept")]')
        clickonall(found, 'acept',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cookie")]')
        clickonall(found, 'cookie',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"consent")]')
        clickonall(found, 'consent',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"akzep")]')
        clickonall(found, 'akzep',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"continue")]')
        clickonall(found, 'continue',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"prosseguir")]')
        clickonall(found, 'prosseguir',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"ok")]')
        clickonall(found, 'ok',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"okay")]')
        clickonall(found, 'okay',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"confirm")]')
        clickonall(found, 'confirm',driver,domain)
    except:
        pass
    try:
        found['Found'] = driver.find_elements_by_xpath(
            '//Body//*[contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"aceit")]')
        clickonall(found, 'aceit',driver,domain)
    except:
        pass

def find_all_iframes(driver,found,domain,deep,process):
    #deep= deep + 1
    #if deep == 4:
       # logger.info('!!!!In: {} proc: {} May be FUCKED reached 2 deep'.format(domain.values['name'],process))
     #   driver.switch_to.default_content()
     #   return
    find_patterns(driver,found,domain)
    iframes = driver.find_elements_by_xpath('//iframe')
    for index, iframe in enumerate(iframes):
        # Your sweet business logic applied to iframe goes here.
        #logger.info('In: {} proc: {} It has iframes with iframe: {} and deep: {}'.format(domain.values['name'],process,iframe,deep))
        try:
            driver.switch_to.frame(index)
        except:
            pass
        #find_all_iframes(driver,found,domain,deep,process)
        find_patterns(driver, found, domain)
        try:
            driver.switch_to.parent_frame()
        except:
            pass


def visit_site(db, process, driver, domain, plugin, temp_folder, cache):
    """ Loads the website and extract its information. """

    # Load the website and wait some time inside it
    try:
        driver.get('http://' + domain.values["name"])
    except TimeoutException:
        logger.warning("Site %s timed out (proc. %d)" % (domain.values["name"], process))
        driver.close()
        driver = build_driver(plugin, cache, process)
        while not driver:
            driver = build_driver(plugin, cache, process)
        driver.set_page_load_timeout(30)
        return driver, True
    except WebDriverException as e:
        logger.warning("WebDriverException on site %s / Error: %s (proc. %d)" % (domain.values["name"], str(e),
                                                                                  process))
        driver = reset_browser(driver, process, plugin, cache)
        return driver, True
    except Exception as e:
        logger.error("%s (proc. %d)" % (str(e), process))
        driver = reset_browser(driver, process, plugin, cache)
        return driver, True
    time.sleep(10)
    found = {'Found': [], 'Clicked': False}
    handles = len(driver.window_handles)
    find_all_iframes(driver, found, domain,0,process)
    driver.switch_to.default_content()
    db.clicked(domain,found['Clicked'])
    logger.info("In {} proc: {} clicked = {}".format(domain.values["name"],process, found['Clicked']))

   # if found['Clicked']:
        #driver.execute_script("location.reload(true);")
    driver.refresh()
    time.sleep(10)
    # Get network traffic dictionary
    # logger.debug(driver.log_types)
    log_entries = driver.get_log('performance')
    # logger.debug("(proc. %d) Network data: %s" % (process, str(log_entries)))
    network_traffic = get_network(log_entries)
    # logger.debug("(proc. %d) Extracted data: %s" % (process, str(network_traffic)))

    # Process traffic dictionary
    for key in network_traffic.keys():
        manage_request(db, process, domain, network_traffic[key], plugin, temp_folder)
        for sub_key in network_traffic[key]["requests"].keys():
            manage_request(db, process, domain, network_traffic[key]["requests"][sub_key], plugin, temp_folder)

    driver = reset_browser(driver, process, plugin, cache)
    return driver, False
