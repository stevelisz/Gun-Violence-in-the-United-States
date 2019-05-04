import re

import numpy
import pandas

import random


KEYS_TO_DROP = [
    'sources', 'source_url', 
    'incident_id', 'incident_url', 'incident_url_fields_missing', 'incident_characteristics',
    'state_house_district', 'congressional_district', 'state_senate_district',
    'participant_age', 'participant_age_group', 'participant_gender',
    'participant_name', 'participant_relationship', 'participant_status', 'participant_type',
    'notes',
    'address', 'location_description',
]

KEY_STATE = 'state'
KEY_CITY_OR_COUNTY = 'city_or_county'
KEY_LATITUDE = 'latitude'
KEY_LONGITUDE = 'longitude'
KEY_FIPS = 'fips'
KEY_GUN_STOLEN = 'gun_stolen'
KEY_GUN_TYPE = 'gun_type'

PATTERN_GUN_STOLEN = re.compile(r'Stolen')

STATE_ABBREV = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District of Columbia': 'DC',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY',
}


# TODO this is mega not working 100%
def get_fips_map(fips_path):
    print("Reading {}".format(fips_path))
    fips_data = pandas.read_csv(fips_path)

    lookup = {}
    for _, row in fips_data.iterrows():
        state = row['State Abbreviation']
        name = row['GU Name']
        code = "{state}{county:03d}".format(
            state=row['State FIPS Code'], 
            county=row['County FIPS Code'])
        # code = row['FIPS Entity Code'] # this is wrong
        
        state_map = lookup.setdefault(state, {})
        state_map[name] = code

    return lookup


def statename_conversion(element):
    return STATE_ABBREV[element]


def gun_stolen(element):
    if pandas.isnull(element):
        return element
    else:
        hits = PATTERN_GUN_STOLEN.findall(element)
        return numpy.nan if not hits else len(hits)


# TODO move out of top scope
fips_map = get_fips_map("./data/fips-codes.csv")


def fips_filler(row):
    try:
        row[KEY_FIPS] = fips_map[row[KEY_STATE]][row[KEY_CITY_OR_COUNTY]]
    except:
        if random.uniform(0,1) > 0.975:
            print("Bad - ", row[KEY_STATE], row[KEY_CITY_OR_COUNTY])
    return row


def read_data(file_path):
    gv_data = pandas.read_csv(file_path)

    # # TODO limited testing
    # gv_data = gv_data[0:1000]

    # save us space by gutting whus_state_abbr we don't care about
    gv_slim = gv_data.drop(columns=KEYS_TO_DROP)

    # switch state name representation
    gv_slim[KEY_STATE] = gv_slim[KEY_STATE].apply(statename_conversion)

    # clean up stolen gun information
    # we're going to return "TRUE" iff we know one is stolen, 
    # nan is unindicated, false is unknown
    gv_slim[KEY_GUN_STOLEN] = gv_slim[KEY_GUN_STOLEN].apply(gun_stolen)

    # TODO do something with gun_type, not sure yet (lots of different categories listed)
    gv_slim = gv_slim.drop(columns=[KEY_GUN_TYPE])

    # add fips identifier
    gv_slim[KEY_FIPS] = pandas.Series(numpy.full(len(gv_slim), numpy.nan))
    gv_slim = gv_slim.apply(fips_filler, axis=1)
    
    print(gv_slim.count())

    gv_slim = gv_slim.drop(columns=[KEY_CITY_OR_COUNTY, KEY_LONGITUDE, KEY_LATITUDE])

    # TODO try to not have bad fips values?
    gv_slim = gv_slim[pandas.notnull(gv_slim[KEY_FIPS])]

    return gv_slim


if __name__ == "__main__":
    gv_path = './data/gun-violence.csv'
    clean_path = './data/gun-violence-cleaned.csv'

    print("Reading {}".format(gv_path))
    cleaned_data = read_data(gv_path)

    print(cleaned_data.head(5))
    print(cleaned_data.count())

    cleaned_data.to_csv(clean_path)
    print("Done.")
