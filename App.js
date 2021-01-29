import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Montserrat } from '@expo-google-fonts/montserrat';

export default function App() {
  const [news, setNews] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [select, setselect] = useState({
    selectedItem: null
  })

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setselect(null)
    let response = await fetch('https://app.sm117.ru/api/v1/contract/news/')
    response = await response.json()
    setNews(response)
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  const onSubmit = (index) => {
    if (select === index) {
      setselect(null)
    } else {
      setselect(index)
    }
  }

  return (
    <View style={styles.Screen}>
      <View style={styles.Header}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true} />
        <View style={styles.NavBar}>
          <Svg style={styles.NavBar__Icon}
            width="20"
            height="20"
            viewBox="0 0 24 24">
            <Path
              d="m4 6.75c0-2.619 2.131-4.75 4.75-4.75h9.133c-.329-1.151-1.378-2-2.633-2h-11.5c-1.517 0-2.75 1.233-2.75 2.75v15.5c0 1.517 1.233 2.75 2.75 2.75h.25z"
              fill="black"
            />
            <Path
              d="m20.25 4h-11.5c-1.517 0-2.75 1.233-2.75 2.75v14.5c0 1.517 1.233 2.75 2.75 2.75h11.5c1.517 0 2.75-1.233 2.75-2.75v-14.5c0-1.517-1.233-2.75-2.75-2.75zm-2 17h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-4h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3.5h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-4h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
              fill="black"
            />
          </Svg>
          <Text style={styles.NavBar__Title}>Новости</Text>
        </View>
      </View>
      <FlatList
        style={styles.NewsItems}
        onRefresh={fetchNews}
        refreshing={isLoading}
        keyExtractor={(item) => item.id.toString()}
        data={news}
        renderItem={({ item, index }) => (
          <View style={styles.NewsItem}>
            <View>
              <Text style={styles.NewsItem__Title}>{
                item.title
                  .split('<br>').join('')
                  .split('<br />').join('')
                  .split('</br>').join('')}
              </Text>
              <Text
                numberOfLines={select === index ? 0 : 3}
                style={select === index ? {
                  maxWidth: 302,
                  fontFamily: Montserrat,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: 15,
                  lineHeight: 22,
                  color: '#191C1F',
                  marginBottom: 18,
                } : {
                    maxHeight: 66,
                    maxWidth: 302,
                    fontFamily: Montserrat,
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 15,
                    lineHeight: 22,
                    color: '#191C1F',
                    marginBottom: 18,
                  }}>{
                  item.body
                    .split('<br>').join('')
                    .split('<br />').join('')
                    .split('</br>').join('')
                    .split('<strong>').join('')
                    .split('</strong>').join('')
                    .split('(https://clck.ru/Qq4mu)').join('')
                    .split('(https://clck.ru/Qq4mu )').join('')
                    .split('<a href="').join('')
                    .split('">ТВ пакеты').join('')
                    .split('</a>').join('')
                    .split('<img src="/files/pictures/images/sell_pp.jpg" />').join('')
                    .split('https://vk.com/album-57120060_276669476').join('')
                }</Text>
            </View>
            <View style={styles.NewsItem__div__Date}>
              <Text style={styles.NewsItem__Date}>{item.date}</Text>
              <TouchableOpacity style={styles.NewsItem__More__Touch} onPress={() => onSubmit(index)}>
                {
                  select != index ? (
                    <Text style={styles.NewsItem__More}>Подробнее</Text>
                  ) : (
                      <Text style={styles.NewsItem__More}>Скрыть</Text>
                    )
                }
                <Svg
                  width="25"
                  height="12"
                  viewBox="0 0 451.847 451.847"
                  style={select === index ? {
                    transform: [{ rotate: '180deg' }]
                  } : {
                      transform: [{ rotate: '0deg' }]
                    }}
                >
                  <Path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                    fill="#FF7700" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Screen: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 36,
    paddingBottom: 124,
  },
  Header: {
    position: 'absolute',
    width: '100%',
    height: 108,
    left: 0,
    top: 0,
  },
  NavBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: 375,
    height: 56,
    left: 0,
    top: 44,
    backgroundColor: '#F4F4F4',
  },
  NavBar__Icon: {
    marginLeft: 15,
  },
  NavBar__Title: {
    marginLeft: 7,
    fontFamily: Montserrat,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0.2,
    color: '#191C1F',
  },
  NewsItems: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 108,
  },
  NewsItem: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  NewsItem__div__Date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  NewsItem__Title: {
    fontFamily: Montserrat,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,
    color: '#191C1F',
    marginBottom: 16,
  },
  NewsItem__Date: {
    fontFamily: Montserrat,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.1,
    color: '#8B959E',
  },
  NewsItem__More: {
    fontFamily: Montserrat,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.1,
    color: '#FF7700',
  },
  NewsItem__More__Touch: {
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})