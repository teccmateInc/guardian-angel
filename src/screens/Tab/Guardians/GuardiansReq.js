import React, {useContext, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';

//Style
import styles, {Theme} from '../../../../style';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import Header from '../../../components/Header/Header';
import List from '../../../components/List/List';
import Loader from '../../../components/Loader/Loader';

//Context Data
import {GuardianContext} from '../../Context/GuardianContext';

export default function GuardiansReq({navigation}) {
  const [viewMore, setViewMore] = useState(6);
  const [loader, setLoader] = useState(false);

  //Context Calling
  const {req} = useContext(GuardianContext);

  return (
    <View style={{flex: 1}}>
      <Header
        title="Request List"
        subtitle="Accept those for whom you will be Guardian Angel."
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginTop: 10}}>
          {req.slice(0, viewMore).map((data, index) => {
            return (
              <ReqList
                key={index}
                index={index}
                data={data}
                loader={setLoader}
              />
            );
          })}
        </View>
        <View style={styles.container}>
          {req.length > viewMore ? (
            <Button
              mode="text"
              icon="view-grid-plus-outline"
              color={Theme.colors.primary}
              style={{width: 150, marginVertical: 10}}
              onPress={() => setViewMore(viewMore + 4)}>
              View More
            </Button>
          ) : req.length <= viewMore ? (
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: Theme.colors.primary,
                marginVertical: 10,
              }}>
              No more Request to Show!{' '}
              <Icon
                name="comment-check-outline"
                size={26}
                color={Theme.colors.primary}
              />
            </Text>
          ) : null}
        </View>
      </ScrollView>
      {loader ? <Loader /> : null}
    </View>
  );
}

const ReqList = props => {
  const {data, index, loader} = props;

  const {angelDetail, acceptReq, deleteReq} = useContext(GuardianContext);

  const [reqData, setReqData] = useState({});

  angelDetail(data.reqID, setReqData);

  return (
    <List
      Type="req"
      Data={reqData}
      key={index}
      index={index}
      loader={loader}
      handleSubmit={() => acceptReq(data.reqID, data.userID)}
      handleRemove={() => deleteReq(data.reqID, data.userID, loader)}
    />
  );
};
